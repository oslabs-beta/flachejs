import flacheRequest from '../src/helpers/flacheRequest';
import clientCache from '../src/flache';
import fetchMock from 'jest-fetch-mock';
// import localforage from 'localforage';
// jest.mock('localforage')

describe('Testing for getFetchRequest function', () => {
  
  test('temporary', () => {
    expect(1).toBe(1);
  })
  
  // const url = 'https://swapi.dev/api/people';
  // let cache;

  // beforeAll(() => {
  //   cache = new clientCache();
  //   fetchMock.enableMocks(); 
  // });

  // beforeEach(() => {
  //   fetchMock.resetMocks();
  //   cache.store.clear();
  //   cache.flacheRequest(url);
  // });
  
})