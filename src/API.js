class API {
    static baseURL = 'http://localhost:3080'; //local
    //PROD:
    static call(method = 'GET', route = '', data = null, header=null, options = null) {
      let headers = {
        'Content-Type': 'application/json',
        Accept: '*/*',
      };

      if(header){
        headers = {...headers, ...header}
      }

      if (options) {
        Object.assign(headers, options);
      }
      let body = null;
      if (data) {
        body = JSON.stringify(data);
      }
  
      return fetch(`${this.baseURL}/${route}`, {
        method,
        headers,
        body,
      })
        .then(res => {
          if (!(res.status >= 200 && res.status < 300)) {
            const contentType = res.headers.get('content-type');
            if (contentType.startsWith('application/json;')) {
              return res.json().then(err => {
                throw new Error(err);
              });
            } else if (contentType.startsWith('text/plain;')) {
              return res.text().then(text => {
                throw new Error(text);
              });
            }
          }
          return res;
        })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
          return res;
        })
    }
  
    static verifyUser(jwt) {
      return API.call('POST', 'api/verify',null, {'jwt-token': jwt});
    }
  }
  export default API;