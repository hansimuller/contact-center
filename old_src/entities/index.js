import buildMakeCall from './call.js'

const makeCall = buildMakeCall({makeDialer})

export default makeCall

function makeDialer(dialer) {
  console.log('esto es dialer')
}
