// server.js - API Backend com Sistema de Numeração Melhorado
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Log de debug para verificar se o servidor está carregando as rotas
console.log('🔧 Carregando rotas da API...');

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
};

// Pool de conexões
const pool = mysql.createPool(dbConfig);

// Testar conexão do banco
pool.getConnection()
  .then(connection => {
    console.log('✅ Banco de dados conectado com sucesso');
    connection.release();
  })
  .catch(error => {
    console.error('❌ Erro ao conectar no banco:', error.message);
  });

// Configuração do nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// NOVA FUNÇÃO: Geração de ID com numeração sequencial por ano
const generateId = async () => {
  try {
    const currentYear = new Date().getFullYear();
    
    // Contar reservas do ano atual
    const [countResult] = await pool.execute(`
      SELECT COUNT(*) as count FROM reservations 
      WHERE YEAR(created_at) = ?
    `, [currentYear]);
    
    const yearlyCount = countResult[0].count + 1;
    
    // Formato: RSV + Ano + Número sequencial de 4 dígitos
    const reservationId = `RSV${currentYear}${yearlyCount.toString().padStart(4, '0')}`;
    
    console.log(`🔢 Novo ID gerado: ${reservationId} (${yearlyCount}ª reserva de ${currentYear})`);
    
    return reservationId;
  } catch (error) {
    console.error('❌ Erro ao gerar ID da reserva:', error);
    // Fallback para método alternativo em caso de erro
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RSV${timestamp}${random}`;
  }
};

// ROTA DE TESTE - Para verificar se a API está funcionando
app.get('/api/test', (req, res) => {
  console.log('📋 Rota de teste acessada');
  res.json({ 
    message: 'API funcionando!', 
    timestamp: new Date().toISOString(),
    database: process.env.DB_NAME,
    status: 'OK'
  });
});

// ROTA RAIZ DA API
app.get('/api', (req, res) => {
  res.json({
    message: 'API do Sistema de Reservas - Recanto MD Olavio',
    version: '2.0.0',
    endpoints: [
      'GET /api/test - Teste da API',
      'GET /api/rooms - Listar quartos',
      'POST /api/reservations - Criar reserva',
      'GET /api/reservations - Listar reservas',
      'PUT /api/reservations/:id - Atualizar reserva',
      'PATCH /api/reservations/:id/status - Atualizar status',
      'DELETE /api/reservations/:id - Excluir reserva',
      'POST /api/auth/login - Login',
      'POST /api/messages - Enviar mensagem',
      'GET /api/messages - Listar mensagens'
    ],
    features: [
      '🔢 Sistema de numeração sequencial por ano',
      '✅ Numeração amigável: RSV20250001, RSV20250002...',
      '🔄 Reinicia a cada ano automaticamente'
    ]
  });
});

// ROTAS DE QUARTOS

// Listar quartos disponíveis
app.get('/api/rooms', async (req, res) => {
  console.log('🏠 Rota /api/rooms acessada');
  console.log('📊 Query params:', req.query);
  
  try {
    const { checkIn, checkOut } = req.query;
    
    let query = 'SELECT * FROM rooms WHERE active = TRUE';
    let params = [];

    if (checkIn && checkOut) {
      console.log('📅 Verificando disponibilidade para:', checkIn, 'até', checkOut);
      query += ` AND id NOT IN (
        SELECT room_id FROM reservations 
        WHERE status != 'cancelled'
        AND (
          (check_in BETWEEN ? AND ?) OR
          (check_out BETWEEN ? AND ?) OR
          (check_in <= ? AND check_out >= ?)
        )
      )`;
      params = [checkIn, checkOut, checkIn, checkOut, checkIn, checkOut];
    }

    console.log('🔍 Executando query:', query);
    const [rooms] = await pool.execute(query, params);
    
    console.log(`✅ Encontrados ${rooms.length} quartos`);
    res.json({
      rooms: rooms
    });

  } catch (error) {
    console.error('❌ Erro ao buscar quartos:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// ROTAS DE AUTENTICAÇÃO

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// ROTAS DE RESERVAS

// Criar nova reserva com nova numeração
app.post('/api/reservations', async (req, res) => {
  console.log('📝 Nova reserva sendo criada:', req.body);
  
  try {
    const {
      guestName,
      contactEmail,
      contactPhone,
      roomId,
      roomName,
      checkIn,
      checkOut,
      adults,
      children,
      specialRequests,
      totalPrice
    } = req.body;

    // NOVA NUMERAÇÃO: Gerar ID sequencial por ano
    const reservationId = await generateId();
    const guests = parseInt(adults) + parseInt(children || 0);
    
    console.log(`🆔 ID da nova reserva: ${reservationId}`);
    
    // Verificar disponibilidade do quarto
    const [conflicts] = await pool.execute(`
      SELECT id FROM reservations 
      WHERE room_id = ? 
      AND status != 'cancelled'
      AND (
        (check_in BETWEEN ? AND ?) OR
        (check_out BETWEEN ? AND ?) OR
        (check_in <= ? AND check_out >= ?)
      )
    `, [roomId, checkIn, checkOut, checkIn, checkOut, checkIn, checkOut]);

    if (conflicts.length > 0) {
      return res.status(409).json({ 
        error: 'Quarto não disponível para as datas selecionadas' 
      });
    }

    // Inserir reserva
    await pool.execute(`
      INSERT INTO reservations (
        id, guest_name, contact_email, contact_phone,
        room_id, room_name, check_in, check_out,
        guests, special_requests, total_price, status,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `, [
      reservationId, guestName, contactEmail, contactPhone,
      roomId, roomName, checkIn, checkOut,
      guests, specialRequests, totalPrice
    ]);

    console.log(`✅ Reserva ${reservationId} criada com sucesso`);

    // Enviar email de confirmação com nova numeração
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: contactEmail,
        subject: `✅ Confirmação de Reserva #${reservationId} - Recanto MD Olavio`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8B4513;">🏨 Obrigado por escolher o Recanto MD Olavio!</h2>
            <p>Sua reserva foi recebida e está sendo processada.</p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #8B4513; margin-top: 0;">📋 Detalhes da Reserva:</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>🆔 Número da Reserva:</strong> ${reservationId}</li>
                <li><strong>👤 Hóspede:</strong> ${guestName}</li>
                <li><strong>🏠 Acomodação:</strong> ${roomName}</li>
                <li><strong>📅 Check-in:</strong> ${new Date(checkIn).toLocaleDateString('pt-BR')}</li>
                <li><strong>📅 Check-out:</strong> ${new Date(checkOut).toLocaleDateString('pt-BR')}</li>
                <li><strong>👥 Hóspedes:</strong> ${guests}</li>
                <li><strong>💰 Total:</strong> R$ ${totalPrice.toFixed(2)}</li>
              </ul>
            </div>
            
            <p><strong>🔔 Próximos passos:</strong></p>
            <p>Em breve entraremos em contato através do WhatsApp <strong>(21) 971864896</strong> para confirmar sua reserva e fornecer mais detalhes.</p>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Este é um e-mail automático. Guarde este número da reserva para referência futura.
            </p>
          </div>
        `
      });
      console.log('📧 Email de confirmação enviado');
    } catch (emailError) {
      console.error('❌ Erro ao enviar email:', emailError);
    }

    res.status(201).json({
      message: 'Reserva criada com sucesso',
      reservationId,
      details: {
        id: reservationId,
        guest: guestName,
        room: roomName,
        checkIn,
        checkOut,
        total: totalPrice
      }
    });

  } catch (error) {
    console.error('❌ Erro ao criar reserva:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// Listar todas as reservas
app.get('/api/reservations', async (req, res) => {
  console.log('📋 Listando reservas...');
  
  try {
    const { status, search, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM reservations WHERE 1=1';
    let params = [];

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (guest_name LIKE ? OR id LIKE ? OR room_name LIKE ?)';
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    console.log('🔍 Query:', query);
    const [reservations] = await pool.execute(query, params);
    console.log(`✅ ${reservations.length} reservas encontradas`);

    // Calcular estatísticas
    const [stats] = await pool.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
        SUM(CASE WHEN status = 'confirmed' THEN total_price ELSE 0 END) as total_revenue
      FROM reservations
    `);

    res.json({
      reservations,
      stats: stats[0]
    });

  } catch (error) {
    console.error('❌ Erro ao buscar reservas:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// Atualizar/editar reserva completa
app.put('/api/reservations/:id', async (req, res) => {
  const reservationId = req.params.id;
  console.log(`📝 [SERVER] Recebida requisição PUT para reserva: "${reservationId}"`);
  console.log(`📝 [SERVER] Tipo do ID: ${typeof reservationId}`);
  console.log(`📝 [SERVER] Length do ID: ${reservationId.length}`);
  console.log('📊 [SERVER] Dados recebidos:', req.body);
  
  try {
    const { id } = req.params;
    const {
      guest_name,
      contact_email,
      contact_phone,
      room_name,
      check_in,
      check_out,
      adults,
      children,
      special_requests,
      total_price
    } = req.body;

    // Verificar se a reserva existe
    const [existingReservations] = await pool.execute(
      'SELECT * FROM reservations WHERE id = ?', 
      [id]
    );

    if (existingReservations.length === 0) {
      console.log('📝 [SERVER] Reserva não encontrada. Buscando todas as reservas...');
      const [allReservations] = await pool.execute('SELECT id FROM reservations LIMIT 10');
      console.log('📝 [SERVER] IDs existentes:', allReservations.map(r => r.id));
      
      return res.status(404).json({ 
        error: 'Reserva não encontrada',
        receivedId: id,
        existingIds: allReservations.map(r => r.id).slice(0, 5)
      });
    }

    // Calcular total de hóspedes
    const guests = parseInt(adults || 0) + parseInt(children || 0);

    // Atualizar a reserva
    await pool.execute(`
      UPDATE reservations SET 
        guest_name = ?,
        contact_email = ?,
        contact_phone = ?,
        room_name = ?,
        check_in = ?,
        check_out = ?,
        guests = ?,
        special_requests = ?,
        total_price = ?,
        updated_at = NOW()
      WHERE id = ?
    `, [
      guest_name,
      contact_email,
      contact_phone,
      room_name,
      check_in,
      check_out,
      guests,
      special_requests,
      total_price,
      id
    ]);

    console.log(`✅ Reserva ${id} atualizada com sucesso`);

    // Buscar a reserva atualizada para retornar
    const [updatedReservation] = await pool.execute(
      'SELECT * FROM reservations WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Reserva atualizada com sucesso',
      reservation: updatedReservation[0]
    });

  } catch (error) {
    console.error('❌ Erro ao atualizar reserva:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// Atualizar status da reserva
app.patch('/api/reservations/:id/status', async (req, res) => {
  console.log(`📝 Atualizando status da reserva ${req.params.id}`);
  
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    await pool.execute(
      'UPDATE reservations SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );

    console.log(`✅ Status da reserva ${id} atualizado para ${status}`);

    // Buscar dados da reserva para enviar email
    const [reservations] = await pool.execute(
      'SELECT * FROM reservations WHERE id = ?',
      [id]
    );

    if (reservations.length > 0) {
      const reservation = reservations[0];
      
      // Enviar email de atualização
      try {
        const statusText = {
          confirmed: 'confirmada',
          cancelled: 'cancelada',
          pending: 'pendente'
        };

        const statusEmoji = {
          confirmed: '✅',
          cancelled: '❌',
          pending: '⏳'
        };

        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: reservation.contact_email,
          subject: `${statusEmoji[status]} Reserva ${statusText[status]} #${id} - Recanto MD Olavio`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #8B4513;">${statusEmoji[status]} Atualização da sua Reserva</h2>
              <p>Sua reserva <strong>#${id}</strong> foi <strong>${statusText[status]}</strong>.</p>
              
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #8B4513; margin-top: 0;">📋 Detalhes:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li><strong>🏠 Acomodação:</strong> ${reservation.room_name}</li>
                  <li><strong>📅 Check-in:</strong> ${new Date(reservation.check_in).toLocaleDateString('pt-BR')}</li>
                  <li><strong>📅 Check-out:</strong> ${new Date(reservation.check_out).toLocaleDateString('pt-BR')}</li>
                  <li><strong>📱 Status:</strong> ${statusText[status].toUpperCase()}</li>
                </ul>
              </div>
              
              ${status === 'confirmed' ? 
                '<p><strong>🎉 Sua reserva está confirmada!</strong><br/>Aguardamos você no Recanto MD Olavio!</p>' : 
                status === 'cancelled' ? 
                '<p>Sua reserva foi cancelada. Se tiver dúvidas, entre em contato conosco.</p>' :
                '<p>Sua reserva está em análise. Em breve confirmaremos os detalhes.</p>'
              }
              
              <p style="color: #666; font-size: 12px; margin-top: 30px;">
                WhatsApp: 21 971864896 | Email: recantomdolavio@gmail.com
              </p>
            </div>
          `
        });
        console.log('📧 Email de atualização enviado');
      } catch (emailError) {
        console.error('❌ Erro ao enviar email de atualização:', emailError);
      }
    }

    res.json({ message: 'Status atualizado com sucesso' });

  } catch (error) {
    console.error('❌ Erro ao atualizar status:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// Excluir reserva
app.delete('/api/reservations/:id', async (req, res) => {
  console.log(`🗑️ Excluindo reserva ${req.params.id}`);
  
  try {
    const { id } = req.params;

    // Verificar se a reserva existe antes de excluir
    const [existingReservations] = await pool.execute(
      'SELECT * FROM reservations WHERE id = ?', 
      [id]
    );

    if (existingReservations.length === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    await pool.execute('DELETE FROM reservations WHERE id = ?', [id]);

    console.log(`✅ Reserva ${id} excluída com sucesso`);

    res.json({ message: 'Reserva excluída com sucesso' });

  } catch (error) {
    console.error('❌ Erro ao excluir reserva:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// ROTAS DE MENSAGENS

// Criar mensagem de contato
app.post('/api/messages', async (req, res) => {
  try {
    const { sender, email, subject, content } = req.body;

    await pool.execute(`
      INSERT INTO contact_messages (sender, email, subject, content, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `, [sender, email, subject, content]);

    res.status(201).json({ message: 'Mensagem enviada com sucesso' });

  } catch (error) {
    console.error('Erro ao criar mensagem:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Listar mensagens
app.get('/api/messages', async (req, res) => {
  console.log('📧 Listando mensagens...');
  
  try {
    const [messages] = await pool.execute(`
      SELECT * FROM contact_messages 
      ORDER BY created_at DESC
    `);

    console.log(`✅ ${messages.length} mensagens encontradas`);

    res.json({
      messages
    });

  } catch (error) {
    console.error('❌ Erro ao buscar mensagens:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// Marcar mensagem como lida
app.patch('/api/messages/:id/read', async (req, res) => {
  console.log(`📧 Marcando mensagem ${req.params.id} como lida`);
  
  try {
    const { id } = req.params;

    // Verificar se a mensagem existe
    const [existingMessages] = await pool.execute(
      'SELECT * FROM contact_messages WHERE id = ?', 
      [id]
    );

    if (existingMessages.length === 0) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }

    await pool.execute(
      'UPDATE contact_messages SET is_read = TRUE WHERE id = ?',
      [id]
    );

    console.log(`✅ Mensagem ${id} marcada como lida`);

    res.json({ message: 'Mensagem marcada como lida' });

  } catch (error) {
    console.error('❌ Erro ao marcar mensagem como lida:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Rota 404
app.use('*', (req, res) => {
  console.log(`❓ Rota não encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    error: 'Rota não encontrada',
    method: req.method,
    url: req.originalUrl 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/api`);
  console.log(`🏠 Quartos: http://localhost:${PORT}/api/rooms`);
  console.log(`📝 Reservas: http://localhost:${PORT}/api/reservations`);
  console.log(`🧪 Teste: http://localhost:${PORT}/api/test`);
  console.log('✅ Todas as rotas carregadas com sucesso!');
  console.log('🔢 NOVO: Sistema de numeração RSV20250001, RSV20250002...');
});

module.exports = app;