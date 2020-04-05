const express = require ('express'); //express the server
const cors = require ('cors'); //users that are allowed to mnublate (touch) my server
require('dotenv').config ; // env file has vars so we can access this file
const PORT = process.env.PORT || 3000; //var port get it`s value from .env, if not accessed give it value 3000
const server = express ();
server.use(cors());

server.listen(PORT, ()=>{
  console.log('listening from port ', PORT);// read server data when accssed from port 3000
});
server.get('/', (req, res)=> {
  res.status(200).send('finally!');
});
