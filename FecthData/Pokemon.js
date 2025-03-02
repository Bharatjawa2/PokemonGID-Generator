// fetch = Function used for making HTTP requests to fetch resources.
//         (Json style data, images, files) 
//          Simplifies asynchoronous data fetching in JavaScript and used for interacting with
//          APIs to retrieve and send data asynchronously over the web. 
//          fetch(url, {options})
//          Methods : 'GET', 'PUT', 'POST', 'DELETE'

// Fetch is a Promise based so it either going to resolve or reject

// HTTP response status codes 
// Information Responses : 100-199
// Successfull Responses : 200-299
// Redirection messages : 300-399
// Client error Responses : 400-499
// Server error Responses : 500-599 

// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//     .then(response=>{
        
//         if(!response.ok){
//             throw new Error("Could not fetch Resources");
//         }
//         return response.json();
//     })
//         .then(data=>console.log(data))
//     .catch(error=>console.log(error));


// async function FetchData(){
//     try {
//         const response=await fetch("https://pokeapi.co/api/v2/pokemon/typhlosion");
//         if(!response.ok){
//             throw new Error("Could not fetch Resources.")
//         }
//         const data=await response.json();
//         console.log(data.name);
//     } catch (error) {
//         console.log(error);
//     }
// }
// FetchData();

async function FetchData() {
    try {
        const name = document.getElementById("PokemonName").value.trim().toLowerCase();
        const errorMessage = document.getElementById("ErrorMessage");
        const card = document.getElementById("PokemonCard");

        if (!name) {
            errorMessage.textContent = "Please enter a Pokémon name.";
            errorMessage.style.display = "block";
            card.style.display = "none";
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
            throw new Error(`"${name}" Pokémon not found.`);
        }

        const data = await response.json();

        // Populate Data
        document.getElementById("PokemonSprite").src = data.sprites.front_default;
        document.getElementById("PokemonTitle").textContent = name.toUpperCase();
        document.getElementById("PokemonID").textContent = data.id;
        document.getElementById("PokemonWeight").textContent = data.weight / 10; // Convert to kg
        document.getElementById("PokemonHeight").textContent = data.height / 10; // Convert to m
        card.style.display = "block";

        // Hide Error Message if Successful
        errorMessage.style.display = "none";

    } catch (error) {
        // Display Error Message
        document.getElementById("ErrorMessage").textContent = error.message;
        document.getElementById("ErrorMessage").style.display = "block";
        document.getElementById("PokemonCard").style.display = "none"; // Hide card if error
    }
}

// Add Enter Key Event Listener
document.getElementById("PokemonName").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        FetchData();
    }
});

// Add Click Event to Button
document.getElementById("fetchButton").addEventListener("click", FetchData);
