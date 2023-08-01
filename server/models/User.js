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

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
