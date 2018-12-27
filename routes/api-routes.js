/**
 * api-routes.js
 * @desc - This handles the application programming interface (API) routes for DynamoDB.
 */
const express = require('express');
const router = express.Router();

const version = '0.0.1';


router.get('/messages', (req, res) => {
    res.send('getting messages');
});

router.get('/message/:id', (req, res) => {
    res.send('getting message id');
});

router.put('/message', (req, res) => {
    res.send('putting message');
});
