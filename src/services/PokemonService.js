import axios from "axios";

export class PokemonService {

  static PokemonData = null;

  /**
   * Function to fetch the pokemon data from service and assign it to pokemonData Static variable.
   */
  static async fetchPokemonData() {
    try {
      let pokemonCoountResp = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154");
      PokemonService.PokemonData = pokemonCoountResp.data;
      return PokemonService.PokemonData;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Function to fetch the single pokemon data from service
   * @param name - pokemon name
   */
  static async fetchPokemonDataByName(name) {
    try {
      let pokemonCoountResp = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return pokemonCoountResp.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Function to get the list of Pokemon data
   * @returns Pokemon list array
   */
  static async getPokemonList() {
    let PokemonList = [];
    try {
      if (!PokemonService.PokemonData) {
        await PokemonService.fetchPokemonData();
      }
      if (PokemonService.PokemonData && PokemonService.PokemonData.results)

        PokemonService.PokemonData.results.forEach(pokemon => {
          let pokeData = {
            name: pokemon.name,
            url: pokemon.url,
          };
          PokemonList.push(pokeData);
        });
      console.log("getPokemonList returns", PokemonList);
    } catch (err) {
      console.log(err);
    }

    return JSON.parse(JSON.stringify(PokemonList));
  }

  /**
   * Function to get a specific pokemon detail
   * @param name - pokemon name
   * @returns pokemon detail
   */
  static async getpokemonDetail(name) {
    let pokemonDetail = null;
    try {
      const pokemonDetail = await PokemonService.fetchPokemonDataByName(name);
      return JSON.parse(JSON.stringify(pokemonDetail));
    } catch (err) {
      console.log(err);
    }
    return pokemonDetail;
  }
}