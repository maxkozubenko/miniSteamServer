const express = require('express');
const router = express.Router();

const {
    registration,
    signIn,
    resetInfo
} = require('../services/userAuthService');

router.post('/register', async (req, res) => {
    const {
      email,
      password,
      nickname,
    } = req.body;
  
    if (!email || !password || !nickname) {
      return res.status(400).json({message: 'string'});
    }
  
    try {
      await registration({email, password, nickname});
      res.status(200).json({message: 'Success'});
    } catch (err) {
      res.status(500).json({message: 'string'});
    }
  });

router.post('/login', async (req, res) => {
   const {
       email,
       password,
   }  = req.body;

   if (!email || !password) {
    return res.status(200).json({message: 'Something Wrong with data'});
   }
   
    try {
      const jwtToken = await signIn({email, password});
      res.status(200).json({message: 'Success', jwt_token: jwtToken});
    } catch (err) {
      res.status(200).json({message: 'Wrong password or email'});
    }
});

router.patch('/update', async (req, res) => {
  const {
    nickname,
    email,
  } = req.body;

  if (!nickname || !email) {
    return res.status(400).json({message: 'Something Wrong with data'});
  }
  await resetInfo(nickname, email);

  res.json({message: 'User`s profile was changed'});
})

module.exports = router;