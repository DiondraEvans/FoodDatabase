console.log("Display Page");

let containerElement = document.getElementById('container')
let vegcontainerElement = document.getElementById('container-veggies')

const getData = async () => {
    let data = await fetch("/get_food_data");
    data.json().then((parsedData) => {
        console.log(parsedData); // array of objects
        // map through and put in HTML
        // push each individual one,  or push an array of HTML 
        parsedData.forEach((object) => {
            // if not ready to eat- red text
            let pTag = document.createElement("p"); // <p></p>
            pTag.textContent = object.name; // <p>apple</p>
            if(object.type == "fruit"){
                containerElement.appendChild(pTag);
            }
           
            else if(object.type == "veggie"){
                vegcontainerElement.appendChild(pTag);
            }
           

            
        })
    })
}

getData()
// if(object.type == "fruit"){
//     containerElement.appendChild(pTag);
// }

// else if(object.type == "veggie"){
//     vegcontainerElement.appendChild(pTag);
// }
