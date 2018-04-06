class Auth{

  //replicates logout from satellizer
  static logout(){
    localStorage.removeItem('token');
  }

  //replicates setToken from satellizer
  static setToken(token){
    localStorage.setItem('token', token);
  }

  //replicates getToken from satellizer
  static getToken(){
    return localStorage.getItem('token');
  }

  //replicates getPayLoad from sattelizer returns payload with sub, exp, iat
  static getPayload(){
    //check for a token
    const token = localStorage.getItem('token');
    if(!token) return false;
    //check for valid JWT token
    const parts = token.split('.'); //3 parts header, payload, secret
    if(parts.length < 3) return false;
    //check it has expiry
    return JSON.parse(atob(parts[1]));
  }
  //in JS, atob() (A to B) decrytps using the JWT algorithm, without secret, as secret is not encrypting the payload. btoa does the opposite and encrypts
  //JWT takes header + payload + secret and encrypts it that is why, never put user info in payload as not encrypted on its own!!
  //atob feturns a JSON string so need parse to change to object

  //will replicate satellizer isAuthenticated function (see sattelizer docs)
  //returns true if we have token, that is valid, with expiry and not expired
  //check docs: https://github.com/sahat/satellizer
  static isAuthenticated(){
    const payload = this.getPayload(); //see above
    if (!payload || !payload.exp) return false;
    payload.exp; //if true, valid token
    //check that it hans't expired
    const now = Math.round(Date.now() / 1000);

    return now < payload.exp;
  }

}

export default Auth;
