export const updateLocalStorage = (pokemons) => {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
};  

export const getAllPokemonsFromLocalStorage = () => {
    return localStorage.getItem('pokemons') ? JSON.parse(localStorage.getItem('pokemons')) : [];
};

export const deleteAllPokemonsFromLocalStorage = () =>{
    localStorage.clear();
};