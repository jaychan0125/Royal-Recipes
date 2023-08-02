const mongoose = require("mongoose");

mongoose.connect(
<<<<<<< Updated upstream
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-set-up'
=======
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/meal-log"
>>>>>>> Stashed changes
);

module.exports = mongoose.connection;
