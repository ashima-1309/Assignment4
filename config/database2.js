// database2.js

const mongoose = require('mongoose');

// MongoDB connection URL (replace <username>, <password>, and <dbname> with your actual credentials and database name)
const uri = 'mongodb+srv://ashirajwanshi3013:12345@cluster0.sve0sy7.mongodb.net/mongodb?retryWrites=true&w=majority';

// Options to pass to MongoDB driver
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// // Connect to MongoDB
// mongoose.connect(uri, options)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err.message);
//   });

// Export the mongoose object to be used in other files
module.exports = { uri, options};
