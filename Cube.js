const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/cubesCollection';
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to data base!')
});

const cubeSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    imageURL: String,
    difficultyLevel: Number
});

const Cube = mongoose.model('Cube', cubeSchema);
 module.exports = Cube;
