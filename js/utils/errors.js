export const verifyNameLength = (name) =>{
    if(name.length < 3){
        throw new Error('The Pokémon name must have at least 3 characters.');
    }else if(name.length > 13){
        throw new Error('The Pokémon name must not be longer than 13 characters. ');
    };
};

export const verifyPokemonCaptured = (pokemons, pokemonName) =>{
    let pokemonCaptured = pokemons.some((element=> element.name === pokemonName));
    if (pokemonCaptured){
        throw new Error(`${pokemonName} have already been captured`);
    };
};

export const verifyArrayEmpty = (array) => {
    if(array.length === 0) {
        throw new Error('There is no Pokémon captured');
    }
};

export const verifyResponseStatus = (status) => {
    if(status === 404){
        throw new Error ('Pokemon not found');
    }
};