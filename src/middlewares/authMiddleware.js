const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  console.log(authorization)

  if (!authorization) {
    const authErr = 'Please, provide "authorization" header';
    return res.status(401).json({message: `${authErr}`});
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return res.status(401).json({message: 'Please, include token to request'});
  }

  try {
    const tokenPayload = jwt.verify(token, 'secret');
    req.user = {
      email: tokenPayload.email,
    };
    next();
  } catch (err) {
    res.status(401).json({message: err.message});
  }
};

module.exports = {
  authMiddleware,
};
