const express = require('express');
const router = express.Router();
const User = require('./User');

//Create
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
});

//Read all
router.get('/', async (req, res) => {
    const users = await User.find().sort({createdAt: -1});
    return res.json(users);
});

//Update
router.put('/:id', async (req, res) => {
    try {
        const updated = await
        User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(updated);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
});

//Delete
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.json({message: 'User deleted'});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}); 

module.exports = router;