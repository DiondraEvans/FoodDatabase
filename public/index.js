console.log("js file connected");


let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async () => {
    // send a request to Express 
    // result is the response from the server
    // get element
    // let nameElement = document.getElementById('name-input')
    // // get value of element
    // let nameString = nameElement.value;

    let nameString = document.getElementById('name-input').value;
    let colorString = document.getElementById('color-input').value;
    let ageNumber = +document.getElementById('age-input').value;
    let readyBool = document.getElementById('ready-bool').value === "true" ? true : false;


    //model the layout to send to the server to enter into the post route
    const fruit = {
        nameString,
        colorString,
        ageNumber,
        readyBool
    }
    console.log(JSON.stringify(fruit));

    fetch('http://localhost:5000/create_fruit', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fruit)
    
    })

})