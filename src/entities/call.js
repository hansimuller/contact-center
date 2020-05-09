export default function buildMakeCall({ makeDialer }) {
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
