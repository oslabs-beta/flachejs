import generateKey from '../src/helpers/generateKey'; 

describe('generateKey', () => {

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
  
  test('generate unique key - GET method', () => {
    const key = generateKey('https://swapi.dev/api/people', defaultOptions);
    // check length of unique key
    expect(key).toMatch('GET/https://swapi.dev/api/people');
    // check if key has 'GET'
    // expect(key.slice(0,4)).toMatch('GET');
  })
})