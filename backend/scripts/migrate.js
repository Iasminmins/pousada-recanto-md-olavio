// scripts/migrate.js - Script para migração e inicialização do banco

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Configuração do banco
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
};

// SQL para criar o banco de dados
const createDatabaseSQL = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`;

// SQLs para criar tabelas
const createTablesSQL = [
  // Tabela de usuários
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff') DEFAULT 'staff',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

  // Tabela de quartos
  `CREATE TABLE IF NOT EXISTS rooms (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    max_guests INT DEFAULT 2,
    amenities JSON,
    images JSON,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

  // Tabela de reservas
  `CREATE TABLE IF NOT EXISTS reservations (
    id VARCHAR(20) PRIMARY KEY,
    guest_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20),
    room_id VARCHAR(20) NOT NULL,
    room_name VARCHAR(100) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INT NOT NULL DEFAULT 1,
    special_requests TEXT,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_check_dates (check_in, check_out),
    INDEX idx_status (status),
    INDEX idx_guest_email (contact_email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

  // Tabela de mensagens
  `CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    reply_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_unread (is_read),
    INDEX idx_date (created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

  // Tabela de histórico
  `CREATE TABLE IF NOT EXISTS reservation_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id VARCHAR(20) NOT NULL,
    action VARCHAR(50) NOT NULL,
    old_status VARCHAR(20),
    new_status VARCHAR(20),
    user_id INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_reservation (reservation_id),
    INDEX idx_date (created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

  // Tabela de configurações
  `CREATE TABLE IF NOT EXISTS pousada_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(200),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
];

// Dados iniciais
const initialData = {
  // Usuário administrador
  users: [
    {
      name: 'Administrador',
      email: 'admin@recantomdolavio.com',
      password: 'admin123', // Será hasheado
      role: 'admin'
    }
  ],

  // Quartos da pousada
  rooms: [
    {
      id: 'room-001',
      name: 'Suíte Premium',
      description: 'Suíte espaçosa com vista privilegiada, cama king size, banheira de hidromassagem e varanda privativa.',
      price: 550.00,
      max_guests: 2,
      amenities: ['Ar condicionado', 'TV LED 42"', 'Frigobar', 'Banheira hidromassagem', 'Varanda privativa', 'WiFi gratuito'],
      images: ['/images/suite-premium-1.jpg', '/images/suite-premium-2.jpg']
    },
    {
      id: 'room-002',
      name: 'Chalé Cancun',
      description: 'Chalé aconchegante ideal para famílias, com dois quartos, sala de estar e cozinha equipada.',
      price: 750.00,
      max_guests: 6,
      amenities: ['Dois quartos', 'Sala de estar', 'Cozinha equipada', 'Ar condicionado', 'TV LED', 'WiFi gratuito', 'Área gourmet'],
      images: ['/images/chale-familia-1.jpg', '/images/chale-familia-2.jpg']
    },
    {
      id: 'room-003',
      name: 'Suíte Standard',
      description: 'Acomodação confortável com tudo que você precisa para uma estadia relaxante.',
      price: 350.00,
      max_guests: 2,
      amenities: ['Ar condicionado', 'TV LED', 'Frigobar', 'WiFi gratuito', 'Varanda'],
      images: ['/images/suite-standard-1.jpg', '/images/suite-standard-2.jpg']
    },
    {
      id: 'room-004',
      name: 'Chalé Romântico',
      description: 'Chalé intimista perfeito para casais, com decoração romântica e área privativa.',
      price: 650.00,
      max_guests: 2,
      amenities: ['Cama king size', 'Banheira', 'Lareira', 'Varanda privativa', 'Decoração romântica', 'WiFi gratuito'],
      images: ['/images/chale-romantico-1.jpg', '/images/chale-romantico-2.jpg']
    }
  ],

  // Configurações da pousada
  settings: [
    { key: 'pousada_name', value: 'Recanto MD Olavio', description: 'Nome da pousada' },
    { key: 'contact_email', value: 'recantomdolavio@gmail.com', description: 'Email de contato principal' },
    { key: 'contact_phone', value: '21 971864896', description: 'Telefone de contato' },
    { key: 'address', value: 'R. Trinta e Dois - Agro Brasil', description: 'Endereço da pousada' },
    { key: 'check_in_time', value: '14:00', description: 'Horário padrão de check-in' },
    { key: 'check_out_time', value: '12:00', description: 'Horário padrão de check-out' },
    { key: 'cancellation_policy', value: '7', description: 'Dias para cancelamento gratuito' },
    { key: 'whatsapp_number', value: 's552197186-4896', description: 'Número do WhatsApp para contato' }
  ]
};

// Função principal de migração
async function migrate() {
  let connection;
  
  try {
    console.log('🚀 Iniciando migração do banco de dados...');
    
    // Conectar sem especificar o banco (para criar o banco)
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado ao MySQL');
    
    // Criar banco de dados
    await connection.execute(createDatabaseSQL);
    console.log('✅ Banco de dados criado/verificado');
    
    // Selecionar o banco
    await connection.execute(`USE ${process.env.DB_NAME}`);
    console.log('✅ Banco selecionado');
    
    // Criar tabelas
    console.log('📊 Criando tabelas...');
    for (const sql of createTablesSQL) {
      await connection.execute(sql);
    }
    console.log('✅ Todas as tabelas criadas');
    
    // Inserir dados iniciais
    await insertInitialData(connection);
    console.log('✅ Dados iniciais inseridos');
    
    // Criar views e procedures
    await createViewsAndProcedures(connection);
    console.log('✅ Views e procedures criadas');
    
    console.log('🎉 Migração concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Função para inserir dados iniciais
async function insertInitialData(connection) {
  try {
    // Inserir usuário administrador
    const hashedPassword = await bcrypt.hash(initialData.users[0].password, 10);
    
    await connection.execute(`
      INSERT IGNORE INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `, [
      initialData.users[0].name,
      initialData.users[0].email,
      hashedPassword,
      initialData.users[0].role
    ]);
    console.log('👤 Usuário administrador criado');
    
    // Inserir quartos
    for (const room of initialData.rooms) {
      await connection.execute(`
        INSERT IGNORE INTO rooms (id, name, description, price, max_guests, amenities, images, active)
        VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)
      `, [
        room.id,
        room.name,
        room.description,
        room.price,
        room.max_guests,
        JSON.stringify(room.amenities),
        JSON.stringify(room.images)
      ]);
    }
    console.log('🏠 Quartos inseridos');
    
    // Inserir configurações
    for (const setting of initialData.settings) {
      await connection.execute(`
        INSERT IGNORE INTO pousada_settings (setting_key, setting_value, description)
        VALUES (?, ?, ?)
      `, [setting.key, setting.value, setting.description]);
    }
    console.log('⚙️ Configurações inseridas');
    
  } catch (error) {
    console.error('Erro ao inserir dados iniciais:', error);
    throw error;
  }
}

// Função para criar views e procedures
async function createViewsAndProcedures(connection) {
  try {
    // View para estatísticas
    await connection.execute(`
      CREATE OR REPLACE VIEW reservation_stats AS
      SELECT 
        COUNT(*) as total_reservations,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed_reservations,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_reservations,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_reservations,
        SUM(CASE WHEN status = 'confirmed' THEN total_price ELSE 0 END) as total_revenue,
        AVG(CASE WHEN status = 'confirmed' THEN total_price ELSE NULL END) as average_reservation_value
      FROM reservations
    `);
    
    // View para próximas chegadas
    await connection.execute(`
      CREATE OR REPLACE VIEW upcoming_arrivals AS
      SELECT 
        r.*,
        DATEDIFF(r.check_out, r.check_in) as nights,
        DATEDIFF(r.check_in, CURDATE()) as days_until_arrival
      FROM reservations r
      WHERE r.check_in BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
      AND r.status = 'confirmed'
      ORDER BY r.check_in ASC
    `);
    
    console.log('📊 Views criadas');
    
  } catch (error) {
    console.error('Erro ao criar views:', error);
    throw error;
  }
}

// Função para verificar se a migração é necessária
async function needsMigration() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      ...dbConfig,
      database: process.env.DB_NAME
    });
    
    // Verificar se a tabela de usuários existe
    const [tables] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = ? AND table_name = 'users'
    `, [process.env.DB_NAME]);
    
    return tables[0].count === 0;
    
  } catch (error) {
    // Se houver erro (banco não existe), precisa migrar
    return true;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Função para reset do banco (desenvolvimento)
async function reset() {
  let connection;
  
  try {
    console.log('⚠️ ATENÇÃO: Resetando banco de dados...');
    
    connection = await mysql.createConnection(dbConfig);
    
    // Dropar banco se existir
    await connection.execute(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
    console.log('🗑️ Banco antigo removido');
    
    // Executar migração completa
    await migrate();
    
  } catch (error) {
    console.error('❌ Erro no reset:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Função para backup do banco
async function backup() {
  const { spawn } = require('child_process');
  const fs = require('fs');
  const path = require('path');
  
  const backupDir = './backups';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `backup_${timestamp}.sql`;
  const filepath = path.join(backupDir, filename);
  
  // Criar diretório de backup se não existir
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  console.log('💾 Iniciando backup...');
  
  const mysqldump = spawn('mysqldump', [
    `-h${process.env.DB_HOST}`,
    `-u${process.env.DB_USER}`,
    `-p${process.env.DB_PASSWORD}`,
    process.env.DB_NAME
  ]);
  
  const writeStream = fs.createWriteStream(filepath);
  mysqldump.stdout.pipe(writeStream);
  
  mysqldump.on('close', (code) => {
    if (code === 0) {
      console.log(`✅ Backup criado: ${filepath}`);
    } else {
      console.error(`❌ Erro no backup. Código: ${code}`);
    }
  });
}

// Verificar argumentos da linha de comando
const command = process.argv[2];

switch (command) {
  case 'reset':
    reset();
    break;
  case 'backup':
    backup();
    break;
  case 'check':
    needsMigration().then(needs => {
      console.log(needs ? '❗ Migração necessária' : '✅ Banco já migrado');
    });
    break;
  default:
    // Migração padrão
    needsMigration().then(needs => {
      if (needs) {
        migrate();
      } else {
        console.log('✅ Banco já está migrado. Use "npm run migrate reset" para resetar.');
      }
    });
}

module.exports = { migrate, reset, backup, needsMigration };