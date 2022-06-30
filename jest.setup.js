module.exports = function () {
/**
 * This allows us to mock the Response object with the actually object from Node
 * Also added the headers Object for testing. 
 */
  const realRes = require('node-fetch');
  global.Response = realRes.Response;
  global.Headers = realRes.Headers;

  /**
   * This will allow us to ignore console logs from outside our test our code
   * Note: must pass true as the last argument to have the log show up. 
   */

  const consoleLog = global.console.log;
  global.console.log = (...args) => {
    const test = args[args.length - 1];
    if (test !== true) return
    consoleLog(...args)
  }
}