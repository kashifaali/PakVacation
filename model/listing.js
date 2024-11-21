const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let newlisting = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "default_filename",
        },
        url: {
            type: String,
            default: "default_link",
        },
    },
    price: Number,
    location: String,
    country: String,
});

let listening = mongoose.model("listenings", newlisting);

module.exports = listening;