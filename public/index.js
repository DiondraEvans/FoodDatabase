console.log("js file connected");


let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async () => {
    
    // send a request to Express 
    // result is the response from the server
    // get element
    // let nameElement = document.getElementById('name-input')
    // // get value of element
    // let nameString = nameElement.value;
    let foodType = document.getElementById('food-type').value 
    let nameString = document.getElementById('name-input').value;
    let colorString = document.getElementById('color-input').value;
    let ageNumber = +document.getElementById('age-input').value;
    let readyBool = document.getElementById('ready-bool').value === "true" ? true : false;
    if (foodType == "fruit"){
        console.log(foodType)
        const fruit = {
            foodType,
            nameString,
            colorString,
            ageNumber,
            readyBool
        }
        console.log(JSON.stringify(fruit));
        //when i wrote await before fetch, i was able to have my status turn purple meaning the data was ready to 
        //be used and saved to the variable response. Then adding .status, allowed me to add a conditional statement based
        //on the status code
           let response =  await fetch('http://localhost:5000/create_fruit', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fruit)
        
        })
        let uploadStatusTag = document.getElementById('upload-status');
        console.log(response.status);
        if (response.status === 200) {
            console.log(response);
            console.log("upload complete!!!");
            uploadStatusTag.textContent = "Upload Completed";
            uploadStatusTag.style.color = "lightGreen";
    
        } else{
            console.log(response);
            console.log("upload failed");
            console.log;
            uploadStatusTag.textContent = "Upload Failed";
            uploadStatusTag.style.color = "red";
    
        }
    }

    else if( foodType == "veggie"){
        console.log(foodType)
        const veggie = {
            foodType,
            nameString,
            colorString,
            ageNumber,
            readyBool
        }
        console.log(JSON.stringify(veggie));
    
        let response = await fetch('http://localhost:5000/create_veggie', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(veggie)
        })
        let uploadStatusTag = document.getElementById('upload-status');
        console.log(response.status);
        if (response.status === 200) {
            console.log(response);
            console.log("upload complete!!!");
            uploadStatusTag.textContent = "Upload Completed";
            uploadStatusTag.style.color = "lightGreen";
    
        } else{
            console.log(response);
            console.log("upload failed");
            console.log;
            uploadStatusTag.textContent = "Upload Failed";
            uploadStatusTag.style.color = "red";
    
        }
    }
    // uploading a status message
})


//deleting connection to server


let deleteButton = document.getElementById("delete")
deleteButton.addEventListener('click', async() => {
    let response = await fetch('http://localhost:5000/delete_nameless_data',{
        method: "delete",
    });
    console.log(response)
    let parsedData = await response.json()
    console.log(parsedData);
})



let displayPageButton = document.getElementById('display-page-button');

displayPageButton.addEventListener('click', () => {
    // change HTML files (from index to display_food.html)
    window.location.href = "./display_food/index.html"
})