import buildMakeCall from './call.js'

const makeCall = buildMakeCall({makeDialer})

export default makeCall

function makeDialer() {
  console.log('esto es dialer')
}
