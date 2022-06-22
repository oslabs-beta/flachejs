import generateKey from '../src/helpers/generateKey'; 

describe('Testing for generateKey function', () => {

  const defaultOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer-when-downgrade',
    body: null,
  };
  
  test('Generate a unique key using HTTP GET method and default options', () => {
    const key = generateKey('https://swapi.dev/api/people', defaultOptions);
    expect(key).toMatch('GET/https://swapi.dev/api/people');
  })

  test('Generate a unique key using HTTP GET method without default options', () => {
    const key = generateKey('https://swapi.dev/api/people', {method: 'GET'});
    expect(key).toMatch('GET/https://swapi.dev/api/people');
  })

  test('Generate unique key using HTTP POST method', () => {
    const key = generateKey('https://swapi.dev/api/people', {method: 'POST', body: {username: 'user', password: 'jio@#fiw924!$#'}});
    expect(key.slice(0,6)).toMatch('POST/');
    expect(key.length).toBe(66);
  })

  test('Hashing of body should return the same number of characters regardless of how large the body is', () => {
    const key1 = generateKey('https://swapi.dev/api/people', {method: 'POST', body: {username: 'user', password: 'jio@#fiw924!$#'}});
    const key2 = generateKey('https://swapi.dev/api/people', {method: 'POST', body: {username: 'user', password: 'jio@#fiw924!$#', prop1: 'asdfasdf'}});
    const key3 = generateKey('https://swapi.dev/api/people', {method: 'POST', body: {username: 'user', password: 'jio@#fiw924!$#', prop1: { prop2: 'asdfasdf'}}});
    const key4 = generateKey('https://swapi.dev/api/people', {method: 'POST', body: {username: 'user', password: 'jio@#fiw924!$#', prop1: [{ prop2: 'asdfasdf'}, { prop3: ['hello', 'hi']}]}});
    expect(key1.length).toBe(66);
    expect(key2.length).toBe(66);
    expect(key3.length).toBe(66);
    expect(key4.length).toBe(66);
  })

  test('Must throw Error if using POST method without a body', () => {
    expect(() => {generateKey('https://swapi.dev/api/people', {method: 'POST'})}).toThrow(Error);
    expect(() => {generateKey('https://swapi.dev/api/people', {method: 'POST'})}).toThrow('Must include a body with POST request');
  })

})