class SyntheticResponse extends Response {
  #redirected; 
  #type;
  #url;
  constructor(body, init) {
    super(body, init);
    this.#redirected = init.redirected || false;
    this.#url = init.url || '';
    this.#type = init.type || 'default';

  }

  get url() {
    return this.#url;
  }

  get redirected() {
    return this.#redirected;
  }

  get type() {
    return this.#type;
  }
}


describe('Synthetic Tests', () => {
  let body, init, synthRes, normRes;  
  beforeAll(() => {
      body = [
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
      ],
    
      init = {
        status: 201,
        statusText: 'This is a test',
        headers: new Headers({'content-type': 'application/json'}), 
        redirected: true,
        type: 'synthetic',
        url: 'jest/test'
      }
  })

  beforeEach(() => {
    synthRes = new SyntheticResponse(JSON.stringify(body), init);
    normRes = new Response(JSON.stringify(body), init); 
  })

  describe('Should be able to parse correctly', () => {

    it('Should parse to json', async () => {
      const real = await normRes.json();
      const fake = await synthRes.json();
      expect(fake).toEqual(real);
    })
    it('Should parse to text', async () => {
      const real = await normRes.text();
      const fake = await synthRes.text();
      expect(fake).toEqual(real);
    })
  })

  describe('Other Methods should work correctly', () => {

    it('Should clone correctly', async () => {
      console.log(synthRes.clone(), true); 
      expect(true).toEqual(false);
    })
  })

  describe('Should assign correct properties', () => {
    it('Should have a correct url prop', () => {
      expect(synthRes.url).toEqual(init.url);
    })

    it('Should have a correct redirect prop', () => {
      expect(synthRes.redirected).toEqual(init.redirected);
    })

    it('Should have a correct type prop', () => {
      expect(synthRes.type).toEqual(init.type);
    })
  })

  describe('Synthetic Response Should mirror Regular Response', () => {

    it('should have the same bodyUsed', () => {
      expect(synthRes.bodyUsed).toEqual(normRes.bodyUsed);
    })

    it('should have the same headers', () => {
      // Testing for equality of keys of Headers object
      expect(synthRes.headers).toEqual(normRes.headers);

      // Testing that res header is of type 'Headers' 
      expect(synthRes.headers instanceof Headers).toEqual(true);
      
      const synthKeys = []
      const realKeys = []

      for (const key of synthRes.headers.keys()) {
        synthKeys.push(key);
      }

      for (const key of normRes.headers.keys()) {
        realKeys.push(key);
      }
    
      // testing that the individual keys are the same
      expect(synthKeys).toEqual(realKeys);
    })

    it('should have the same status', () => {
      expect(synthRes.status).toEqual(normRes.status);
    })
    
    it('should have the same statusText', () => {
      expect(synthRes.statusText).toEqual(normRes.statusText);
    })
  })

})