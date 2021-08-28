const {User} = require('../models/userModel');

const getUserGames = async (userEmail) => {
    const user = await User.find({userEmail});
    return user.games;
}

module.exports = {
    getUserGames,
}