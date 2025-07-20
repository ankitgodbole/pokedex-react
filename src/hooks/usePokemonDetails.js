import { useEffect, useState } from "react";
import axios from "axios";

function usePokemonDetails(id, pokemonName) {
   

  const [pokemonDetails, setPokemonDetails] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  async function fetchPokemonDetails() {
     
  if (!id && !pokemonName) {
    console.log("❌ No ID or Name provided");
    return;
  }
    try {
      const url = pokemonName
        ? `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        : `https://pokeapi.co/api/v2/pokemon/${id}`;

       
      const response = await axios.get(url);

        
      setPokemonDetails((prev) => ({ ...prev, isLoading: true }));

      const types = response.data.types.map((t) => t.type.name);

      setPokemonDetails({
        data: {
          name: response.data.name,
          img:
            response.data.sprites.other?.dream_world?.front_default ||
            response.data.sprites.front_shiny,
          weight: response.data.weight,
          height: response.data.height,
          types: types,
        },
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setPokemonDetails({
        data: null,
        isLoading: false,
        error: "Pokemon not found ",
      });
      console.log("Error fetching Pokémon details:", err);
    }
  }

  useEffect(() => {
    fetchPokemonDetails();
  }, [id, pokemonName]);

  return pokemonDetails; // { data, isLoading, error }
}

export default usePokemonDetails;
