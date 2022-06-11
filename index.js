const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
require('dotenv').config();
const quotesRoute = require('./routes/mindQuotes');

const app = express();
const PORT = process.env.PORT || 5700

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a logger
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({all:true})
            )
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ], 
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
    ]
});

// Routes
app.use('/api/quotes', quotesRoute);

// mongoose connection
mongoose.connect(process.env.MONGO_URL,
{useNewUrlParser: true}
).then(() => {
    logger.log('info', 'Connected to Mongo');
}).catch(error => {
    logger.log('error', 'Something Happened');
});

app.get('/', (req, res) => {
    res.send('Test!')
})

app.listen(PORT, logger.log("info", `Server is running on ${PORT}`))
