const WebSocket = require('ws');
const redis = require('redis');
// const client = redis.createClient();

const wss  = new WebSocket.Server({ port: 4005 });


//send message to all clients
const broadcast = (object) => {
    wss.clients.forEach((client) => {
        //client = 1 ws connection
        client.send(JSON.stringify(object)); //convert to JSON
    });
};

const chatMessages = [];

wss.on('connection', (ws) => {
    console.log('Client has connected');
    //server to client
    broadcast({
        type: 'UPDATE_CLIENT_COUNT',
        count: wss.clients.size, 
    });

    broadcast({ 
        type: 'UPDATE_CHAT',
        chatMessages: chatMessages });
 
    

    //handle events
    ws.on('message', (data) => {
        console.log(data);
        const chatMessage = JSON.parse(data);
        chatMessages.push(chatMessage);
        broadcast({ 
            type: 'UPDATE_CHAT',
            chatMessages: chatMessages });
    });

    ws.on('close', (data) => {
        console.log('disconnected');
        broadcast({
            type: 'UPDATE_CLIENT_COUNT',
            count: wss.clients.size, 
        });
    });

    ws.on('error', (e) => {
        console.log(e);
    });

});

//express uses HTTP endpoints
//type of connection similar to HTTP but different rest calls
//webpsocket is not HTTP but websocket is its own protocol
//library ws, opens a connection and leave it open so that it stays open as long as clients are connected.

//websocket does not have endpoints that res does, it has a starting point, once it's connected theres just one path, you can pass each other string and from client to server an vice versa is JSON
//REST only clients initiate clal, but websocket clients can send whenever they want;

//websocket has event types