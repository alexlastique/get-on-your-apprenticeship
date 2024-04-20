import express from 'express';
exports.handler = async function (event, context) {
    var realRouter = {};

    if (event.queryStringParameters.param === 'students') {
        console.log(event.queryStringParameters.param);
        const response = await fetch('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
        const data = await response.json();
        realRouter = data;
    };
    if (event.queryStringParameters.param === 'randomstudent') {
        const response = await fetch('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
        // prendre un personnage aleatoire dans l'api si hogwartsStudent=true
        const data = await response.json();
        var randomIndex = Math.floor(Math.random() * data.length);
        while (!data[randomIndex].hogwartsStudent) {
            randomIndex = Math.floor(Math.random() * data.length);
        }
        realRouter = data[randomIndex];
    };

    return {
        statusCode: 200,
        body: JSON.stringify(realRouter)
    }
}