const mongoose = require('mongoose');

const Game = mongoose.model('Game', {
    name: {
        type: String,
        require: true,
        unique: true,
    },
    price: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: false
    },
    genre: {
        type:String,
        require: true
    }
});

module.exports = {
    Game,
};