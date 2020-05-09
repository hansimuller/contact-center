var client = require('ari-client');

const url = 'http://159.65.110.167:8088/asterisk';
const username = 'hmuller';
const password = 'esternon';

client.connect(url, username, password)
  .then(function (ari) {
    listenChannel(ari)
    listChannels(ari)
    listBridges(ari)
  })
  .catch(function (err) {});

function listChannels(ari){
  ari.channels.list()
    .then(function (channels){console.log(channels)})
    .catch(function (err){console.log(err)})
}

function listenChannel(ari){
  var channel = ari.Channel();
  channel.on('StasisStart', function (event, channel) {});
  channel.on('ChannelDtmfReceived', function (event, channel) {});
  channel.originate({endpoint: 'PJSIP/hmm-01', app: 'hello-world', appArgs: 'dialed'})
    .then(function (channel) {
      var playback = ari.Playback();
      channel.play({media: 'sound:hello-world'}, playback)
      .then(function (playback) {})
      .catch(function (err) {});
    })
    .catch(function (err) {});
}

function listBridges(ari){
ari.bridges.list()
  .then(function (bridges){console.log(bridges)})
  .catch(function (err){console.log(err)})
}
