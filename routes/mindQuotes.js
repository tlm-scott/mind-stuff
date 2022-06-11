const express = require('express');
const router = express.Router();
const { Quote, validateQuote } = require('../models/quotes');

//POST a new quote
router.post('/', async (req, res) => {
    const error = await validateQuote(req.body);
    if(error.message) res.status(400).send(error.message);
    mindquote = new Quote({
        quote: req.body.quoteReq,
        author: req.body.authorName,
        genre: req.body.genre
    });

    mindquote.save().then(mindquote => {
        res.send(mindquote);
    }).catch(error => {
        res.status(500).send('Quote was not found');
    });
});

// Get Quotes
router.get('/', (req, res) => {
    Quote.find().then(quotes => res.send(quotes)).catch((error) => {
        res.status(500).send("Something Happened");
    });
});

// Get quote id
router.get('/:quoteId', async (req, res) => {
   const quote = await Quote.findById(req.params.quoteId);
   if(!quote) res.status(404).send("Quote not found");
   res.send(quote);
});

// Update quote
router.put('/:quoteId', async (req, res) => {
    const updateQuote = await Quote.findByIdAndUpdate(req.params.quoteId, {
        quote: req.body.quoteReq,
        author: req.body.authorName,
        genre: req.body.genre
    }, { new: true }
    );
    if(!updateQuote) res.status(404).send('Quote not found');
    res.send(updateQuote);
});

// Delete quote
router.delete('/:quoteId', async (req, res) => {
    const quote = await Quote.findByIdAndRemove(req.params.quoteId);
    if(!quote) res.status(404).send('Quote not found');
    res.send(quote);
});


module.exports = router;