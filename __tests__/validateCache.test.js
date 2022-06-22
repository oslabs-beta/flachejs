import validateCache from '../src/helpers/validateCache';
import generateKey from '../src/helpers/generateKey'; 
import clientCache from '../src/flache';
// require('jest-fetch-mock').enableMocks()
import fetchMock from 'jest-fetch-mock';
require('fake-indexeddb/auto');

describe('Testing for validateCache function', () => {

  test('temporary', () => {
    expect(1).toBe(1);
  })

})