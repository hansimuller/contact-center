var client = require('ari-client');
const util = require('util');
const express = require('express');
const app = express();
const call = require ('./call-module.js')



client.connect('http://159.65.110.167:8088/asterisk', 'hmuller', 'esternon', client_loaded);

function client_loaded (err, ari) {
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
      llamar(req.query.phone, req.query.dialer, req.query.provider);
    }
  });
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });

  if (err) {
    throw err; // program will crash if it fails to connect
  }

  function llamar(interno, tech, app){
    //PJSIP/hmm-01 hello-world
    console.log(interno, tech, app)
    ari.channels.originate({endpoint: tech+'/'+interno, app: app},
    function (err, channel){
      if(err){
        console.log(err)
      }else{
        console.log(channel)
      }
    })
  }

  ari.on('StasisStart', channel_joined);

  function channel_joined (event, incoming) {
    incoming.on('ChannelDtmfReceived', dtmf_received);

    incoming.answer(function (err) {
      play(incoming, 'sound:hello-world');
    });
  }

  function dtmf_received (event, channel) {
    var digit = event.digit;
    switch (digit) {
      case '#':
        play(channel, 'sound:vm-goodbye', function (err) {
          channel.hangup(function (err) {
            process.exit(0);
          });
        });
        break;
      case '*':
        play(channel, 'sound:tt-monkeys');
        break;
      default:
        play(channel, util.format('sound:digits/%s', digit));
    }
  }

  function play (channel, sound, callback) {
    var playback = ari.Playback();

    playback.on('PlaybackFinished', function (event, playback) {
      if (callback) {
        callback(null);
      }
    });

    channel.play({media: sound}, playback, function (err, playback) {});
  }

  ari.start('hello-world');
}
