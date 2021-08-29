const { json } = require('express');
const express = require('express');
const router = express.Router();

const {
    getUserGames,
    addUserGame,
    getFriends,
    addFriend,
    getAllUsers,
    confirmFriend,
    rejectFriend
} = require('../services/userService');

router.get('/user/games', async (req, res) => {
    const {
        email
    } = req.user;

    try {
        const userGames = await getUserGames(email);
        res.status(200).json(userGames);
    } catch {
        res.status(400).json('The user is not found');
    }
});

router.post('/user/games/add', async (req, res) => {
    const {
        gameId
    } = req.body;

    const {
        email
    } = req.user;

    try {
        await addUserGame(email, gameId);
        res.status(200).json({message: 'Game added to user'});
    } catch {
        res.status(400).json({message: 'Game not added to user'});
    }
});

router.get('/user/friends', async (req, res) => {
    const {
        email
    } = req.user;

    console.log(email);

    try {
        const friends = await getFriends(email);
        res.json(friends);
    } catch {
        res.json({message: 'Error, can not get friends'});
    }
});

router.post('/user/add/friend', async (req, res) => {
    const {
        email
    } = req.user;

    const {
        emailFriend
    } = req.body;

    try {
        await addFriend(email, emailFriend);
        res.status(200).json({message: 'Success friend was added'});
    } catch {
        res.status(400).json({message: 'Error, can not add friend'});
    }
});

router.get('/users/get', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch {
        res.status(400).json({message: 'Error, can not get friends'});
    }
});

router.patch('/user/confirm/friend', async (req, res) => {
    const {
        email
    } = req.user;

    const {
        emailFriend
    } = req.body;

    try {
        await confirmFriend(email, emailFriend);
        res.status(200).json({message: 'Friend confirm friendship'});
    } catch {
        res.status(200).json({message: 'Friend does not confirm friendship'});
    }
});

router.patch('/user/reject/friend', async (req, res) => {
    const {
        email
    } = req.user;

    const {
        emailFriend
    } = req.body;

    console.log('HERE');

    try {
        await rejectFriend(email, emailFriend);
        res.status(200).json({message: 'Friend reject friendship'});
    } catch {
        res.status(400).json({message: 'Error rejecting'});
    }
});


module.exports = router;