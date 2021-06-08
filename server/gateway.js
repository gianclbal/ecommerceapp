const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const server = require('http');
const port = process.env.PORT || 3004;

const apiProxy = httpProxy.createProxyServer();
const appServer = server.createServer(app);

const wsProxy = httpProxy.createProxyServer({
  target: 'http://localhost:4005',
  ws: true,
});

apiProxy.on('error', (err, req, res) => {
  console.log(err);
  res.status(500).send('Proxy down :(');
});

app.all('/messanger*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:5000' });
});


app.all('/websocket*', (req, res) => {
  console.log('incoming ws');
  apiProxy.web(req, res, { target: 'http://localhost:4005/websocket' });
});

appServer.on('upgrade', (req, socket, head) => {
  console.log('upgrade ws here');
  console.log(req);
  wsProxy.ws(req, socket, head);
});


app.all('/websocket*', (req, res) => {
  console.log('incoming ws');
  apiProxy.web(req, res, { target: 'http://localhost:4005/websocket' });
});

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.all("/registerNewUser", (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3001',
  });
});

app.all("/Login", (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3001/',
  });
});
  
app.all('/api/addToCart', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3003',
  })
});

app.all('/api/viewCart', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3003',
  })
});

app.all('/api/deleteFromCart', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3003',
  })
});

app.all('/api/createListing', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3003',
  })
});

app.all('/api/viewListings', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3003',
  })
});

app.all('/api/deleteListing', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3003',
  })
});

app.all('/api/makeAuction', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3003',
  })
});

app.all('/api/getAuctions', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3003',
  })
});
app.all('/api/makeInquiry', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3003',
  })
});

app.all('/api/getInquiries', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3003',
  })
});



app.all("*", (req, res) => {
  // front end server / react
  apiProxy.web(req, res, {
    target: 'http://localhost:3001',
  });
});

// app.all("*", (req, res) => {
//   // front end server / react
//   apiProxy.web(req, res, {
//     target: 'http://localhost:4000',
//   });
// });

app.listen(port, () => console.log(`Gateway on port ${port}!`))