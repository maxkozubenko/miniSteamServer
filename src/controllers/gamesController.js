const express = require('express');
const router = express.Router();

const {
    addGame,
    getGames,
    getGamesByTags,
    getGame,
} = require('../services/gameService');

router.get('/games', async (req, res) => {
    try {
        const games = await getGames();
        res.json(games);
    } catch (err) {
        res.status(400).json({message: 'Error'});
    }
});

router.get('/game/get', async (req, res) => {
    const {
        gameName
    } = req.query;

    try {
        const game = await getGame(gameName);
        if (game !== null) {
            res.json(game);
        } else {
            res.json({});
        }
    } catch (err) {
        res.status(400).json({message: 'Error'});
    }
});

router.post('/games/add', async (req, res) => {
    const {
        name,
        price,
        description,
        img,
        genre
    } = req.body;

    if (!name || !price || !description || !genre) {
        return res.status(400).json({message: 'string'});
    }

    try {
        await addGame(name, price, description, img, genre);
        res.status(200).json({message: 'Success'});
    } catch (err) {
        res.status(400).json({message: 'Error'});
    }
})

router.get('/games/filter', async (req, res) => {
    const {
        price,
        indie,
        action, 
        adventure
    } = req.query;

    if (indie === 'true') {
        indieText = 'indie';
    } else {
        indieText = '';
    }

    if (action === 'true') {
        actionText = 'action';
    } else {
        actionText = '';
    }

    if (adventure === 'true') {
        adventureText = 'adventure';
    } else {
        adventureText = '';
    }
    
    try {
        const gamesFiltered = await getGamesByTags(price, indieText, actionText, adventureText);
        res.status(200).json(gamesFiltered);
    } catch {
        res.status(400).send('Error');
    }

});

module.exports = router;