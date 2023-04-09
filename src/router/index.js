const Router = require('express').Router();
const path = require('path');
const Controller = require('../Controller');

Router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../View/main.html'));
})
.post('/create', Controller.createDb)
.post('/food', Controller.setTodaysFood)
.get('/food', Controller.getTodaysFood)
.delete('/food', Controller.delete)
.get('/manifest', Controller.manifest)
.get('/img/:imgPath', Controller.imageFinder)
.get('/serviceWorker', Controller.sw)

module.exports = Router;