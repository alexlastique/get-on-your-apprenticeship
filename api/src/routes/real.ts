import express from 'express';
const realRouter = express.Router();

realRouter.get('/students', async function (req, res, next) {
    try {
        const response = await fetch('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

realRouter.get('/randomstudent', async function (req, res, next) {
    try {
        const response = await fetch('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
        // prendre un personnage aleatoire dans l'api si hogwartsStudent=true
        const data = await response.json();
        var randomIndex = Math.floor(Math.random() * data.length);
        while (!data[randomIndex].hogwartsStudent) {
            randomIndex = Math.floor(Math.random() * data.length);
        }
        res.json(data[randomIndex]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default realRouter;
