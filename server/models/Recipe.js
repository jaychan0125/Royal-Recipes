const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    }, 
    image: {
        type: String
    }, 
    servingSize: {
        type: Number
    },
    ingredients: {
        type: [String], 
        required: true
    },
    instructions: {
        type: [String], 
        required: true
    },

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
