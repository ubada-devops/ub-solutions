import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Real-time State Database
let tasks = [
  { id: 'TSK-101', name: 'Patient Record Headless Scraper Node', client: 'CardioCare Diagnostics', tier: '₹4,999', stage: 'Production', description: 'Real-time scraper targeting clinical data pipelines.', assignedDev: 'UB_DEV_14', prsCount: 4, health: 'Stable', jestPassed: true, typeScriptPassed: true },
  { id: 'TSK-102', name: 'Skydo AD Cat-1 Remittance Webhook Bridge', client: 'Apex Fintech Ltd', tier: '₹4,999', stage: 'Development', description: 'Automated FIRA certificate generation callback listener.', assignedDev: 'UB_DEV_04', prsCount: 2, health: 'Stable', jestPassed: true, typeScriptPassed: true }
];

let escrows = [
  { id: 'ESC-901', client: 'CardioCare Diagnostics', project: 'Patient Scraper Engine', amount: 48500, status: 'Escrowed', txHash: '0x8f3a1290b4112e87c', timestamp: '2026-07-20 10:15' },
  { id: 'ESC-902', client: 'Apex Fintech Ltd', project: 'Skydo Wire Automation', amount: 92000, status: 'Released', txHash: '0x3c990214a112ef09a', timestamp: '2026-07-19 14:22' }
];

let changeRequests = [
  { id: 'CR-101', clientName: 'CardioCare Diagnostics', type: 'UI Adjustment', description: 'Add real-time filter by location in patient appointment grid on clinical staging portal.', priority: 'Medium', status: 'In Progress', timestamp: '2026-07-20 01:12' },
  { id: 'CR-102', clientName: 'Apex Fintech Ltd', type: 'API Modification', description: 'Provide payload backup encryption keys inside response headers of Skydo verification callbacks.', priority: 'High', status: 'Open', timestamp: '2026-07-20 02:22' }
];

let chatMessages = [
  { id: 'MSG-001', channel: 'general', sender: 'UB_DEV_14', senderRole: 'DEV', text: 'Headless browser cluster deployed to staging. Proxy rotation verified clean.', timestamp: '10:42 AM', type: 'text' },
  { id: 'MSG-002', channel: 'general', sender: 'CardioCare Diagnostics', senderRole: 'CLIENT', text: 'Verified staging preview. Please optimize response latency for bulk patient data export.', timestamp: '10:45 AM', type: 'text' }
];

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'HEALTHY', serverTime: new Date().toISOString(), activeSockets: wss.clients.size });
});

app.get('/api/tasks', (req, res) => res.json(tasks));
app.post('/api/tasks', (req, res) => {
  const newTask = { id: `TSK-${Math.floor(100 + Math.random() * 900)}`, ...req.body };
  tasks.unshift(newTask);
  broadcast({ type: 'TASK_CREATED', payload: newTask });
  res.status(201).json(newTask);
});

app.get('/api/escrow', (req, res) => res.json(escrows));
app.post('/api/escrow', (req, res) => {
  const newEscrow = { id: `ESC-${Math.floor(100 + Math.random() * 900)}`, ...req.body };
  escrows.unshift(newEscrow);
  broadcast({ type: 'ESCROW_UPDATED', payload: newEscrow });
  res.status(201).json(newEscrow);
});

app.get('/api/change-requests', (req, res) => res.json(changeRequests));
app.post('/api/change-requests', (req, res) => {
  const newTicket = { id: `CR-${Math.floor(100 + Math.random() * 900)}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), ...req.body };
  changeRequests.unshift(newTicket);
  broadcast({ type: 'CHANGE_REQUEST_CREATED', payload: newTicket });
  res.status(201).json(newTicket);
});

app.get('/api/chat', (req, res) => res.json(chatMessages));
app.post('/api/chat', (req, res) => {
  const newMsg = { id: `MSG-${Date.now()}`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), ...req.body };
  chatMessages.push(newMsg);
  if (chatMessages.length > 100) chatMessages.shift();
  broadcast({ type: 'NEW_CHAT_MESSAGE', payload: newMsg });
  res.status(201).json(newMsg);
});

// Create HTTP and WebSocket Server
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

function broadcast(data) {
  const payload = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('[WebSocket] Client connected to live ASGI socket pool');
  ws.send(JSON.stringify({ type: 'CONNECTED', payload: { activeSockets: wss.clients.size } }));

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message.toString());
      if (parsed.type === 'SEND_MESSAGE') {
        const msg = { id: `MSG-${Date.now()}`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), ...parsed.payload };
        chatMessages.push(msg);
        broadcast({ type: 'NEW_CHAT_MESSAGE', payload: msg });
      } else if (parsed.type === 'TYPING_STATUS') {
        broadcast({ type: 'TYPING_STATUS', payload: parsed.payload });
      } else if (parsed.type === 'DELETE_MESSAGE') {
        chatMessages = chatMessages.filter(m => m.id !== parsed.payload.id);
        broadcast({ type: 'DELETE_MESSAGE', payload: parsed.payload });
      }
    } catch (err) {
      console.error('[WebSocket] Parsing error:', err);
    }
  });
});

server.listen(PORT, () => {
  console.log(`[UB Solutions Backend Server] Listening on http://localhost:${PORT} and ws://localhost:${PORT}/ws`);
});
