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
        price: Number,
        description: String,
        img: String,
        genre: String
    }],
    friends: [{
        email: String,
        nickname: String,
        status: String,
    }],
});

module.exports = {
    User,
};