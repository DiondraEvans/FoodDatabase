const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    age: Number,
    readyToEat: Boolean
});

//make an instance of the fruitSchema
const MyFruit = mongoose.model('MyFruit', fruitSchema);

module.exports = MyFruit;