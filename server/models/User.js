
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// import model from Recipe.js
const Recipe = require("./Recipe");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedRecipes to be an array of data that references the Recipe model
    savedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {

const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Recipe = require('./Recipe')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // address: {                    //if we eventually ge to implementing delivery
  //   type: String,
  //   required: true, 
  //   trim: true
  // },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  recipes: [{                      //recipes the user saves
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  }],      
  orders: [Order.schema],          //for the grocery-list /order 
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {

    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `recipeCount` with the number of saved recipes we have
userSchema.virtual("recipeCount").get(function () {
  return this.savedRecipes.length;
});

const User = model("User", userSchema);
=======
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);


module.exports = User;
