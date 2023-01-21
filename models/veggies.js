const mongoose = require('mongoose');

const VeggieSchema = new mongoose.Schema({
    type: { type: String, required: true},
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    age: Number,
    readyToEat: Boolean
});

//make an instance of the fruitSchema
const MyVeggies = mongoose.model('MyVeggies', VeggieSchema);

module.exports = MyVeggies;
//required has to be true or false