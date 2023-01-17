//require all documents first
const express = require ('express');
const mongoose = require('mongoose');
require('dotenv').config()
//have a create route, create data in mongoDB
const Fruit = require('./models/fruit');
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
//you cannpot go to this directory because you are sending information to the database with this route not getting information
app.post('/create_fruit', async (req, res) =>{
    //what ever information we get from the body will be saved to individual variables.
    //destructuring
    const {nameString: name, colorString: color, ageNumber: age, readyBool: readyToEat} = req.body;

    //create an object to act as a JSON document to send to the database. we will save it to the returnedValue
    //your going to create an object to send to the database based off of the object you posted to the route. the route will send the object to mongoose aka: fruit.js and verify that it can be sent to the database. so making
    //sure that the await fruit.create variable is the same as the one you required on your server.js is important
    let returnedValue = await Fruit.create({
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




//A route that shows us our data
app.get('/get_data', (req, res) => {
    // Get data from MongoDB,
    // res.json(data)
    res.setHeader('Content-Type', 'application/json');

    console.log("request received at /get_data");
    console.log(process.env.mongoPassword);
    res.json({data: "Response from server"})
})





app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});