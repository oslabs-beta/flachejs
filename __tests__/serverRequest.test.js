import getFetchRequest from '../src/helpers/serverRequest';

describe('Testing for getFetchRequest function', () => {

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
  
  test('temporary', () => {
    expect(1).toBe(1);
  })
  
})