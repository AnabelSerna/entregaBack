require('dotenv').config();
const express = require('express');
const connectDB = require('./database/connection');
const mocksRouter = require('./routes/mocks.router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/api/mocks', mocksRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});