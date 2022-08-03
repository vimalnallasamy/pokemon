import React, { useState, useEffect } from "react";

// In app imports
import "./PokemonSearch.scss";
import SearchInput from "../../components/SearchInput/SearchInput";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { PokemonService } from "../../services/PokemonService.js";
import AppConstants from "../../constants/app.constants";

function PokemonSearch() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  /**
   *
   * @param {*} event :: event fetch the pokemon
   * @desc :: function to fetch the pokemon details
   */
  const fetchPokemonByName = async (event) => {
    if (event) {
      if (errorMsg) {
        setErrorMsg("");
      }
      const isAlreadyPokemonPresent = selectedPokemon.find(
        (pokemon) => pokemon.name === event.value
      );
      if (!isAlreadyPokemonPresent) {
        const pokemonDetailsResp = await PokemonService.getpokemonDetail(
          event.value
        );
        setSelectedPokemon([pokemonDetailsResp, ...selectedPokemon]);
        PokemonService.setDataToStorage([
          pokemonDetailsResp,
          ...selectedPokemon,
        ]);
      } else {
        setErrorMsg(AppConstants.Errors.pokemonExistError);
      }
    }
  };

  /**
   *
   * @param {*} id  :: Id to delete the pokemon card
   * @desc :: function to delete the pokemon card
   */
  const onCloseHandler = async (id) => {
    const updatedPokemons = selectedPokemon.filter(
      (pokemon) => pokemon.id !== id
    );
    setSelectedPokemon(updatedPokemons);
    PokemonService.setDataToStorage(updatedPokemons);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      const pokemonDataFromStorage = await PokemonService.getDataFromStorage();
      if (pokemonDataFromStorage) {
        setSelectedPokemon(pokemonDataFromStorage);
      }
      let pokemonData = await PokemonService.getPokemonList();
      pokemonData = pokemonData.map((pokemon) => {
        return { value: pokemon.name, label: pokemon.name };
      });
      setPokemonData(pokemonData);
    };
    fetchPokemonData();
  }, []);

  return (
    <div className="app">
      {/* START :: Search Container */}
      <section className="pokemon-search-container">
        <img
          className="pokemon-img"
          src={process.env.PUBLIC_URL + "/assets/pokeball.svg"}
          alt=""
        />
        <div className="header-text">{AppConstants.PokemonSearch.headerText}</div>
        <div className="search-input-wrapper">
          <div className="search-item-wrapper">
            <SearchInput
              options={pokemonData}
              onSearch={fetchPokemonByName}
              placeholder={AppConstants.PokemonSearch.label}
              searchBtnText={AppConstants.PokemonSearch.searchBtn}
            />
            {errorMsg && <div className="error-msg">{`* ${errorMsg}`}</div>}
          </div>
        </div>
      </section>
      {/* END :: Search Container */}

      {/* START :: Display Container */}
      <section className="pokemon-display-container">
        {selectedPokemon &&
          selectedPokemon.map((pokemon) => {
            return (
              pokemon && (
                <div key={pokemon.id} className="pokemon-item">
                  <PokemonCard
                    {...pokemon}
                    onClose={onCloseHandler}
                  ></PokemonCard>
                </div>
              )
            );
          })}
      </section>
      {/* END :: Display Container */}
    </div>
  );
}

export default PokemonSearch;
