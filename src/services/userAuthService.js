const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Error} = require('mongoose');

const {User} = require('../models/userModel');

const registration = async ({email, password, nickname}) => {
    const user = User({
        email,
        password: await bcrypt.hash(password, 10),
        nickname,
    });
    await user.save();
};

const signIn = async ({email, password}) => {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('Invalid username or password');
    }

    if (!(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid username or password');
    }

    const token = jwt.sign({
        email: user.email,
    }, 'secret');

    console.log(token);

    return token;
};

const resetInfo = async (userNickname, email) => {
    const user = await User.findOneAndUpdate({email}, {nickname: userNickname});
    console.log(user);
}

module.exports = {
    registration,
    signIn,
    resetInfo
};
