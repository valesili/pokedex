export class ItemPokemon {

  constructor(pokemon) {
    this.pokemon = pokemon;
  }

  async createAndGetItemPokemon() {
    const itemPokemonElement = document.createElement('div');
    itemPokemonElement.classList.add('col-6', 'col-md-4', 'col-lg-3', 'col-xl-2', 'mb-3');
    itemPokemonElement.innerHTML = await this.fetchHtmlAsText();
    this.setDataPokemonToItem(itemPokemonElement);
    return itemPokemonElement;
  }

  async fetchHtmlAsText() {
    const response = await fetch('./assets/html/item_pokemon.html');
    return response.text();
  }

  /**
   * 
   * @param { HTMLElement } itemPokemonElement 
   */
  setDataPokemonToItem(itemPokemonElement) {
    itemPokemonElement.querySelector('.img-pokemon').src = this.pokemon.img;
    itemPokemonElement.querySelector('.img-pokemon').alt = this.pokemon.name;
    itemPokemonElement.querySelector('.name-pokemon').innerText = this.pokemon.name;
    itemPokemonElement.querySelector('.type-pokemon').innerText = this.pokemon.types.join(' | ');
  }
}