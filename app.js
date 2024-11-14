const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const albumRoutes = require('./routes/albumRoutes')
const artistRoutes = require('./routes/artistRoutes')
const favouriteListRoutes = require('./routes/favouriteListRoutes')
const trackRoutes = require('./routes/trackRoutes')
const authRoutes = require('./routes/authRoutes')

app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/albums', albumRoutes)
app.use('/api/artists', artistRoutes)
app.use('/api/favourite', favouriteListRoutes)
app.use('/api/tracks', trackRoutes)
app.use('/api/auth', authRoutes)

module.exports = app;
