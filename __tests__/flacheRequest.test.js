import flacheRequest from '../src/helpers/flacheRequest';
import localforage from 'localforage';
jest.mock('localforage')

describe('Testing for getFetchRequest function', () => {

  // const defaultOptions = {
  //   method: 'GET',
  //     mode: 'cors',
  //     cache: 'default',
  //     credentials: 'same-origin', 
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     redirect: 'follow',
  //   referrerPolicy: 'no-referrer-when-downgrade',
  //     body: null,
  //   }
  
  test('temporary', () => {
    expect(1).toBe(1);
  })
  

})