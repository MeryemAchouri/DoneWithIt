const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/users/login', (r
    eq, res) => {
  const { email, password } = req.body;
  const users = router.db.get('users').value();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ error: 'Invalid email or password' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
