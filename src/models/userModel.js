const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    nickname: {
        type: String,
        require: true,
        unique: true,
    },
    games: [{
        name: String,
    }],
    friends: [{
        nickname: String,
    }],
});

module.exports = {
    User,
};