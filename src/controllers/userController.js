const express = require('express');
const router = express.Router();

const {
    getUserGames,
} = require('../services/userService');

router.get('user/games', async (req, res) => {
    const {
        email
    } = req.user;

    try {
        const userGames = getUserGames(email);
        res.status(200).json(userGames);
    } catch {
        res.status(400).json('The user is not found');
    }
});

module.exports = router;