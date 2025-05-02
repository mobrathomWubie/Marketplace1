const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    console.log(`Received: ${message}`);
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.send('Connected to WebSocket server!');
});

console.log('WebSocket server started on port 5000');