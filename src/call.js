const express = require('express');
const app = express();
const call = require ('./call-module.js')

app.use(express.json())
app.get('/', (req, res) => {
  let valid = true
  console.log(req.query)
  if(!req.query.phone){
    res.send('El parametro "phone" es requerido.')
    valid=false
  }
  if(!req.query.dialer){
    res.send('El parametro "dialer" es requerido.')
    valid=false
  }
  if(!req.query.provider){
    res.send('El parametro "phone" es requerido.')
    valid=false
  }
  if(valid){
    call.dial(req.query.phone, req.query.dialer, req.query.provider)
    res.send('Iniciando llamada...')
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
