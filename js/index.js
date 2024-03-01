import {formatName} from './utils/formatName.js';
import {verifyArrayEmpty, verifyNameLength, verifyPokemonCaptured, verifyResponseStatus} from './utils/errors.js';
import { displayMessage, displayPokemonScreen, resetGameboy, addPokemonListHTML, removeAllHTML, deletePokemonHTML, displayLoadingMessageOnScreen, hideLoadingMessageOnScreen, listAllPokemonsHTML } from './views/views.js';
import { Pokemon } from './models/Pokemon.js';
import {updateLocalStorage, getAllPokemonsFromLocalStorage, deleteAllPokemonsFromLocalStorage} from './storage/local.js'

let pokemon;

let pokemons = getAllPokemonsFromLocalStorage();

listAllPokemonsHTML(pokemons);

const getPokemonData = async (pokemonName) => {
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    verifyResponseStatus(response.status);
    const data = await response.json();
    return data;
  }catch (error){
    displayMessage(error.message);
    console.error(error.message);
  }
}

const onSendClick = async () => {
    try{
        const pokemonName = formatName(document.querySelector('#pokemon-name').value);
        verifyNameLength(pokemonName);
        displayLoadingMessageOnScreen();
        let data = await getPokemonData(pokemonName);
        if(data){
          const hp = data.stats[0].base_stat; 
          const attack = data.stats[1].base_stat;
          const deffense = data.stats[2].base_stat;
          const imgPokemon = data.sprites.front_default; 
          pokemon = new Pokemon(pokemonName, hp, attack, deffense, imgPokemon);
          displayPokemonScreen(pokemon);
        }
    }catch(error){
        console.error(error);
        displayMessage(error.message);
    }finally{
      hideLoadingMessageOnScreen();
    }
};

const onCaptureClick = () =>{
  try{
    verifyPokemonCaptured(pokemons, pokemon.name);
    pokemons.push(pokemon);
    updateLocalStorage(pokemons);
    addPokemonListHTML(pokemon, onDeletePokemonClick);
    resetGameboy();
  }catch (error){
    displayMessage(error.message);
    console.error(error);
  }
};

const deletePokemonArray = (pokemonToDelete) =>{
  pokemons = pokemons.filter(pokemon => pokemon !== pokemonToDelete);
  console.log(`${pokemonToDelete.name} deleted successfully!! New array: ${JSON.stringify(pokemons)}`);
};

const getPokemonByName = (pokemonName) =>{
  return pokemons.find(element => element.name === pokemonName);
};

const onDeletePokemonClick = (event) =>{
  const pokemonName = event.target.parentNode.querySelector('h4').textContent;
  let pokemonToDelete = getPokemonByName(pokemonName);
  deletePokemonArray(pokemonToDelete);
  updateLocalStorage(pokemons);
  deletePokemonHTML((event.target.parentNode).parentNode);
  displayMessage(`${pokemonName} deleted successfully!`);
};

const onDeleteAllClick = () =>{
  try{
    verifyArrayEmpty(pokemons);
    removeAllHTML();
    pokemons = [];
    deleteAllPokemonsFromLocalStorage();
  }catch(error){
    displayMessage(error.message);
  }
};

document.querySelector('#enter-btn').addEventListener('click', onSendClick);
document.querySelector('#reset-btn').addEventListener('click', resetGameboy);
document.querySelector('#capture-btn').addEventListener('click', onCaptureClick);
document.querySelector('#delete-all-btn').addEventListener('click', onDeleteAllClick);
document.querySelector('#pokemonList').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-pokemon-btn')) {
      onDeletePokemonClick(event);
  };
});
