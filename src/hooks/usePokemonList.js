import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url, type) {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    prev: "",
    next: "",
    pokedexUrl: url, // default for pagination
  });

  async function downloadsPokemons() {
    if (!url && !pokemonListState.pokedexUrl) return;

    try {
      setPokemonListState((prev) => ({
        ...prev,
        isLoading: true,
      }));

      // ✅ TYPE MODE (For Pokémon Details Page)
      if (type) {
        const response = await axios.get(url); // directly use url, no pokedexUrl
        setPokemonListState((prev) => ({
          ...prev,
          pokemonList: response.data.pokemon,
          isLoading: false,
        }));
        return;
      }

      // ✅ PAGINATION MODE (For Pokémon List Page)
      const response = await axios.get(pokemonListState.pokedexUrl);

      setPokemonListState((prev) => ({
        ...prev,
        next: response.data.next,
        prev: response.data.previous,
      }));

      const pokemonResults = response.data.results;
      const pokemonData = await Promise.all(
        pokemonResults.map((pokemon) => axios.get(pokemon.url))
      );

      const res = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          img:
            pokemon.sprites.other?.dream_world?.front_default ||
            pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });

      setPokemonListState((prev) => ({
        ...prev,
        pokemonList: res,
        isLoading: false,
      }));
    } catch (error) {
      console.log("Error fetching pokemons:", error);
    }
  }

  useEffect(() => {
    if (type) {
      downloadsPokemons(); // ✅ for details page, run when url changes
    } else {
      downloadsPokemons(); // ✅ for list page, run when pokedexUrl changes
    }
  }, [type ? url : pokemonListState.pokedexUrl, type]);

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
