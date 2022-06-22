import generateKey from '../src/helpers/generateKey'; 
import clientCache from '../src/flache';
import validateCache from '../src/helpers/validateCache';
import fetchMock from 'jest-fetch-mock';
// require('fake-indexeddb/auto');

describe('Testing for validateCache function', () => {

  const key = generateKey('https://swapi.dev/api/people', {method: 'GET'});
  const obj = {ttl: Date.now() + 5000};
  const url = 'https://swapi.dev/api/people';
  let cache;

  beforeAll(() => {
    cache = new clientCache();
    fetchMock.enableMocks(); 
  });

  beforeEach(() => {
    fetchMock.resetMocks();
    cache.store.clear();
  });

  test('validateCache should return data before ttl has expired - tested without store', () => {
    return validateCache(key, obj)
      .then(data => {
        // console.log(data);
        expect(data).not.toBe(null);
        expect(data.ttl).toBeGreaterThanOrEqual(Date.now());
      });
  })

  jest.setTimeout(10000);
  test('validateCache should return data before ttl has expired - tested with store', async () => {
    await cache.flacheRequest(url)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return cache.validateCache(key, obj)
    .then(data => {
      expect(data).not.toBe(null);
    });
  })

  jest.setTimeout(10000);
  test('validateCache should remove item and return null after ttl has expired', async () => {
    await cache.flacheRequest(url)
    await new Promise((resolve) => setTimeout(resolve, 6000));
    return cache.validateCache(key, obj)
    .then(data => {
      expect(data).toBe(null);
    });
  })

});