//require all documents first
const express = require ('express');
const mongoose = require('mongoose');
require('dotenv').config()
//have a create route, create data in mongoDB
const Fruit = require('./models/fruit');
const Veggie = require('./models/veggies')
//create express app
const app = express();
// write down all app.use
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

let connectionString = `mongodb+srv://${process.env.mongoUsername}:${process.env.mongoPassword}@mongosetupcluster.anqqbl8.mongodb.net/FoodDatabase?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
//connect expresss to Mongo
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});



// before I can ask and send data into the collection, I need to create a model
//you cannot go to this directory because you are sending information to the database with this route not getting information. It's a post not get
app.post('/create_fruit', async (req, res) =>{
    //what ever information we get from the body will be saved to individual variables.
    //destructuring
    const {foodType: type, nameString: name, colorString: color, ageNumber: age, readyBool: readyToEat} = req.body;

    //create an object to act as a JSON document to send to the database. we will save it to the returnedValue
    //your going to create an object to send to the database based off of the object you posted to the route. the route will send the object to mongoose aka: fruit.js and verify that it can be sent to the database. so making
    //sure that the await fruit.create variable is the same as the one you required on your server.js is important
    let returnedValue = await Fruit.create({
        type,
        name,
        color,
        age,
        readyToEat
    })
    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    //sending the returned value from the object we created
    res.send(returnedValue);
})
//deleting bad data
app.delete("/delete_nameless_data", async (req, res) => {
  let response = await Fruit.deleteMany({name:""})
  console.log(response)
  res.send({data: `deleted ${response.deleteCount} items.`})
})

//adding veggies
 app.post('/create_veggie', async (req, res) =>{
    const { foodType: type, nameString: name, colorString: color, ageNumber: age, readyBool: readyToEat} = req.body;
    let returnedValue = await Veggie.create({
        type,
        name,
        color,
        age,
        readyToEat
    })
    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    //sending the returned value from the object we created
    res.send(returnedValue)
 })
//display food should have every object we have listed in our database


//A route that shows us our data
app.get('/get_food_data', async (req, res) => {
    // get data from database
    //used an array method to combine both arrays
    let fruitResponse = await Fruit.find({});
    let veggieResponse = await Veggie.find({})
    let both = fruitResponse.concat(veggieResponse)
    console.log(both);
    // send it back to front end
    res.json(both)

})
app.get('/veggie/:veggieName', async (req, res) => {
    let veggiename = req.params.veggieName
    let response = await Veggie.find({name:veggiename})
    res.json(response)
})
//added a route to find a specific fruit and display it's data
app.get('/fruit/:fruitName', async (req, res) => {
    let fruitname = req.params.fruitName
    let response = await Fruit.find({name:fruitname})
    res.json(response)
})
//http://localhost:5000/veggie/seaweed






app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});