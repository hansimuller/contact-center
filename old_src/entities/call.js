const buildMakeCall = function ({ makeDialer }) {
      return function makeCall({
        phone,
        dialer,
        provider
      } = {}) {

      const validDialer = makeDialer(dialer);

      return Object.freeze({
        getPhone: () => phone,
        getDialer: () => validDialer,
        getProvider: () => provider
      })

      }
}

module.export buildMakeCall
