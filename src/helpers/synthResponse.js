export class SyntheticResponse extends Response {
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

export function constructResponse(entry) {
  const init = {
    ...entry.response,
    headers: new Headers(entry.response.headers),
  }
  /**
   * The only properties that acan actually be set via our options are as follow: 
   * Status
   * Status Text
   * Headers
   * 
   * Our 'synthetic reposne' overwirtes the getter functions for the url, redirect, and the type to mimic
   * the native api as much as possible. Unclear if this could cause serious bugs or not yet. 
   * 
   * We should consider what if any of the other properties may interfere with the normal workflow
   * a developer might expect, and also how this will impact any other native functions
   * that interface with the response obj. 
   * 
   * For example - if a user is redirected, but the header is set to manual, the response will not
   * be automatically redirected and the user will have to specify a control flow to handle this. 
   *
   * Additionally - in testing I've noticed that the clone method does not work properly either. 
   */

  const outputResponse = new SyntheticResponse(JSON.stringify(entry.data.data), init)
 
  return outputResponse;
}

