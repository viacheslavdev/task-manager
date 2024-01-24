
const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

server.use(cors(corsOptions));
server.use(middlewares);
server.use(router);

const port = 5001;
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});

