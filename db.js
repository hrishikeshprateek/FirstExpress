const db = require('mongoose');
const mongodbURI = 'mongodb://localhost:27017/project';

db.set('debug', true);
// Establish the Mongoose connection
db.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Export the Mongoose connection for use in other files
module.exports = db;
