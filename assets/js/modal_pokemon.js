export class ModalPokemon {
  constructor(pokemon) {
    this.pokemon = pokemon;
    this.modalEl;
  }

  async fetchHtmlAsText() {
    const response = await fetch('./assets/html/modal_pokemon.html');
    return response.text();
  }

  async show() {
    document.body.classList.add('modal-open');

    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalPokemon';
    this.modalEl.innerHTML = await this.fetchHtmlAsText();
    this.modalEl.querySelector('#closeModal').addEventListener('click', () => this.hide());
    this.modalEl.querySelector('#backdrop').addEventListener('click', () => this.hide());
    this.setDataPokemonToItem(this.modalEl);

    document.body.insertAdjacentElement('beforeend', this.modalEl);
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
    itemPokemonElement.querySelector('#abilities-pokemon').innerText = this.pokemon.abilities.join(' | ');
    itemPokemonElement.querySelector('#weight-pokemon').innerText = this.pokemon.weight / 10 + ' Kg';
    itemPokemonElement.querySelector('#height-pokemon').innerText = this.pokemon.height / 10 + ' m';
  }

  hide() {
    this.modalEl.classList.add('closing');
    setTimeout(() => {
      document.body.classList.remove('modal-open');
      this.modalEl.remove();
    }, 500)
  }
}