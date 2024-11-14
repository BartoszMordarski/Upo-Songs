const express = require('express');
const authService = require('./authService');

const registerUser = async (req, res) => {
    try {
        await authService.registerUser(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        await authService.loginUser(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};
