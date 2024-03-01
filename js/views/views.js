

const screenTextElement = document.querySelector('#message'); 
const imgElement = document.querySelector('#pokemon-img'); 
const hpElement = document.querySelector('#hp'); 
const attackElement = document.querySelector('#attack'); 
const defenseElement = document.querySelector('#defense'); 
const captureBtn = document.querySelector('#capture-btn'); 
const ul = document.querySelector('#pokemonList');
const loadingMessage = document.querySelector('#loading-message');


const pickRandomCardColor = () =>{
    const cardColors =  ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"];
    const randomIndex = Math.floor(Math.random() * cardColors.length);
    return cardColors[randomIndex];
}

export const listAllPokemonsHTML = (pokemons) =>{
    pokemons.forEach(pokemon => {
        addPokemonListHTML(pokemon);
    });
}

export const displayLoadingMessageOnScreen = () => {
    resetGameboy();
    loadingMessage.style.display = 'flex';
}

export const hideLoadingMessageOnScreen = () => {
    loadingMessage.style.display = 'none';
}

export const displayMessage = (message) => {
    resetGameboy();
    screenTextElement.innerHTML = `${message}`;
};

export const removeAllHTML = () => {
    ul.innerHTML = '';
};

export const deletePokemonHTML = (li)=>{
    ul.removeChild(li);
};

export const displayPokemonScreen = (pokemonData) => {
    screenTextElement.innerHTML = `${pokemonData.name}`
    imgElement.src = `${pokemonData.imgPokemon}`;
    hpElement.textContent = `HP: ${pokemonData.hp}`;
    attackElement.textContent = `Attack: ${pokemonData.attack}`;
    defenseElement.textContent = `Defense: ${pokemonData.defense}`;
    captureBtn.style.display = 'flex';

};

export const resetGameboy = () =>{
    let input = document.querySelector('#pokemon-name');
    input.value = '';
    screenTextElement.textContent = '';
    hpElement.textContent = '';
    attackElement.textContent = '';
    defenseElement.textContent = '';
    captureBtn.style.display = 'none';
    imgElement.src = '';
};

export const addPokemonListHTML = (pokemonData) =>{
    const ul = document.querySelector('#pokemonList');
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="pokemon-title">
        <h4>${pokemonData.name}</h4>
        <button id="delete-pokemon-btn" class="delete-pokemon-btn">X</button>
    </div>
    <div class="img-container"> <img src="${pokemonData.imgPokemon}"> </img> </div>
    <div class="pokemon-stats">
    <p id="hp">HP: ${pokemonData.hp}</p>
    <p id="attack">A: ${pokemonData.attack}</p>
    <p id="defense">D: ${pokemonData.defense}</p>
    </div>
`;
    li.style.backgroundColor = pickRandomCardColor();
    ul.appendChild(li);
};
