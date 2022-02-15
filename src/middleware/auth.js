/* The header consists of metadata including the type of token and the hashing algorithm used to sign the token. 
The payload contains the claims data that the token is encoding. */

import pkg from 'jsonwebtoken'; // import jwt
const { jwt } = pkg;
require('dotenv').config();  // import .env

// verifytoken 
const verifyToken = ((req, res, next) => {
  // get auth token data
  const tokenHeader = req.headers.authorization.split(' ')[1]; // get token data
  if (!tokenHeader) {
    return res.sendStatus(403);
  };
  jwt.verify(tokenHeader, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }
  }); // verify the token
  next();
});

// export default verifyToken;
export default verifyToken;
