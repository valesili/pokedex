import { ItemPokemon } from './item_pokemons.js';

export class ApiPokemons {
  constructor() {
    this.filteredPokemons;
  }

  async getPokemons() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

      if (response.status === 200) {
        let pokemons = (await response.json()).results;

        pokemons = pokemons.map(i => { return { name: i.name } });

        console.log(pokemons);

        this.pokemons = await Promise.all(pokemons.map(async pokemon => await this.getDataPokemon(pokemon)));

        this.pokemons.forEach(pokemon => this.showPokemon(pokemon));

        this.setFilterPokemonsEvent();
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async getDataPokemon(pokemon) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);

      if (response.status === 200) {
        const dataPokemon = (await response.json());
        pokemon.img = dataPokemon.sprites.front_default;
        pokemon.types = dataPokemon.types.map(item => item.type.name);
        return pokemon;
      }
      else alert('No se obtuvo información');
    }
    catch (e) {
      console.log(e);
    }
  }

  async showPokemon(pokemon) {
    const pokemonListEl = document.getElementById('pokemonList');

    const itemPokemon = new ItemPokemon(pokemon);
    const cardPokemon = await itemPokemon.createAndGetItemPokemon();

    pokemonListEl.insertAdjacentElement('beforeend', cardPokemon);
  };

  setFilterPokemonsEvent() {
    const self = this;

    document.getElementById('searchPokemon').addEventListener('input', (e) => {
      const textoBusqueda = e.target.value;
      self.filterPokemons(textoBusqueda);
    });
  }

  filterPokemons(texto) {
    document.getElementById('pokemonList').innerHTML = null;
    if (texto != '') {
      this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().indexOf(texto.toLowerCase()) > -1);
      this.filteredPokemons.forEach(p => this.showPokemon(p));
    }
    else this.pokemons.forEach(p => this.showPokemon(p));
  }
}