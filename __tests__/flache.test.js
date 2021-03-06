import clientCache from '../src/flache';
import fetchMock from 'jest-fetch-mock';

// setting indexeddb method up for mocking. 
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

  test('Cache should have a store', async () => {
    expect(Object.hasOwn(cache, 'store')).toEqual(true); 
  })

  test('Cache should have details', async () => {
    expect(Object.hasOwn(cache, 'details')).toEqual(true); 
  })

  test('Cache should have a default ttl of 5000ms', async () => {
    expect(Object.hasOwn(cache, 'ttl')).toEqual(true); 
    expect(cache.ttl).toEqual(5000); 
  })

  test('Cache ttl should be configurable', async () => {
    const newCache = new clientCache({ ttl: 10000 });
    expect(Object.hasOwn(newCache, 'ttl')).toEqual(true); 
    expect(newCache.ttl).toEqual(10000); 
  })

  test('Cache should have details', async () => {
    expect(Object.hasOwn(cache, 'details')).toEqual(true); 
  })

  test('Cache should have appropriate functions available', async () => {
    expect(typeof cache.flacheRequest).toEqual('function'); 
    expect(typeof cache.validateCache).toEqual('function'); 
    expect(typeof cache.getFetchRequest).toEqual('function'); 
    expect(typeof cache.generateKey).toEqual('function'); 
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

  test('Additional Options should be passable to flacheRequests', async () => {
    fetchMock.mockResponse(JSON.stringify(mockResults));

    const requestOptions = [{ method: 'POST' }, { method: 'POST', cors: 'same-origin' }, { method: 'GET', cache: 'no-cache' },
    { credentials: 'include' }, { method: 'POST', body: JSON.stringify({ user: 'Jake', pw: 'hope this works' }) }]; 

    for (const option of requestOptions) {
      const response = await cache.flacheRequest('programmers', option);
      expect(response).toEqual(mockResults);
      // clear the cache incase any requests will cached; 
      await cache.store.clear()
    }
  })

  test('Should pass failed attempts to the user appropriately', async () => {
    const failedResponses = [['An error occured', { status: 500 }], ['An error occured', { status: 503 }],
      ['An error occured', { status: 410 }], ['An error occured', { status: 404 }]];
    
    fetchMock.mockResponses(failedResponses);

    for (let i = 0; i < failedResponses.length; i++) {
      // this is a proposed implementation - final output to be determined
      expect(() => cache.flacheRequest('programmers')).toThrowError('request not ok');
    }
  })
})