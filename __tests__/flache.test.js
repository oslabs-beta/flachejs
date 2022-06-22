import clientCache from '../src/flache';
import fetchMock from 'jest-fetch-mock';

// setting indexeddv method up for mocking. 
require('fake-indexeddb/auto');

describe('Mock Store Tests', () => {
  let cache;
  let mockResults;
  beforeAll(() => {
    cache = new clientCache();
    fetchMock.enableMocks(); 
    mockResults = [
      {
        name: 'Jasmair',
        occupation: 'Programmer',
        company: 'Amazon'
      },
      {
        name: 'Verni',
        occupation: 'Programmer',
        company: 'Google'
      },
      {
        name: 'Iraj',
        occupation: 'Programmer',
        company: 'Meta'
      }
    ]
  })

  beforeEach(() => {
    fetchMock.resetMocks();
    cache.store.clear(); 
  })

  test('Fetch requests should be stored to cache', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResults));
    expect(await cache.store.getItem('GET/programmers')).toBe(null);
    await cache.flacheRequest('programmers');
    expect(await cache.store.getItem('GET/programmers').then(res => res.data)).toEqual(mockResults); 
  })

  test('Second request should pull from cache instead of API call', async () => {
    fetchMock.mockResponseOnce(() => new Promise((resolve) => {
      setTimeout(() => resolve(JSON.stringify(mockResults)), 2000);
    }))

    const withoutCacheStart = performance.now();
    await cache.flacheRequest('programmers');
    const withoutCacheFinish = performance.now();

    const withCacheStart = performance.now();
    await cache.flacheRequest('programmers');
    const withCacheFinish = performance.now();

    const timeWithoutCache = withoutCacheFinish - withoutCacheStart;
    const timeWithCache = withCacheFinish - withCacheStart;
    
    expect(timeWithoutCache > timeWithCache).toEqual(true);
  })

  test('Data from cache should be the same as from API call', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResults));

    expect(await cache.store.keys().then(keys => keys.length)).toEqual(0);
    const firstRequest = await cache.flacheRequest('programmers');
    const secondRequest = await cache.flacheRequest('programmers');
    expect(firstRequest).toEqual(secondRequest);
    expect(await cache.store.keys().then(keys => keys.length)).toEqual(1);
  })
})