const mongoose = require('mongoose');
const yup = require('yup');

// Quote Schema

const QuoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 800
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String
    }
});

const validateQuote = quote => {
    const schema = yup.object().shape({
        quoteReq: yup.string().required().min(5).max(800),
        authorName: yup.string().required(),
        genre: yup.string()
    });
    return schema.validate(quote).then(quote => quote).catch((error) => {
        return {
            message: error.message
        }
   });
}

exports.Quote = new mongoose.model('Quote', QuoteSchema);
exports.validateQuote = validateQuote;