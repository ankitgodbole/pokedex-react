import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import usePokemonDetails from "../hooks/usePokemonDetails";
import usePokemonList from "../hooks/usePokemonList";
import { useEffect, useState } from "react";

function PokemonDetails({pokemonName}) {
  console.log("pokemon detaisl component");
  const { id } = useParams();

  const [selectedType, setSelectedType] = useState("");

  const {
    data: pokemon,
    isLoading,
    error,
  } = usePokemonDetails(id, pokemonName);

  // similar type pokemons
  const [pokemonListState] = usePokemonList(
    selectedType ? `https://pokeapi.co/api/v2/type/${selectedType}` : "",
    true
  );

  useEffect(() => {
    if (pokemon && pokemon.types) {
      setSelectedType(pokemon.types[0]);
    }
  }, [pokemon, pokemonName]);

  if (isLoading) return <div>Loading...</div>;

  // ✅ 2. Error State
  if (error || !pokemon) {
    return (
      <div className="pokemon-error">
        <h3>{error || "Pokemon not found!"}</h3>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
          alt="not found"
          style={{ width: "120px", opacity: 0.7 }}
        />
      </div>
    );
  }

  return (
    <div className="pokemon-detials-wrapper">
      <div className="pokemon-name">
        Name: <span className="pokemon-name-span">{pokemon.name}</span>
      </div>

      <img
        className="pokemon-image"
        src={pokemon.img}
        alt={`pokemon-${pokemon.name}`}
      />

      <div className="pokemon-properties">
        <div className="pokemon-weight">Weight: {pokemon.weight} kg</div>
        <div className="pokemon-height">Height: {pokemon.height} metre</div>
        <div className="pokemon-types">
          {pokemon.types.map((t, i) => (
            <div className="types-name" key={i}>
              Type: {t}
            </div>
          ))}
        </div>
      </div>

      <div className="similar-type">
        More {selectedType} type Pokemons:
        <ul className="similar-pokemon-list">
          {pokemonListState.pokemonList.map((p) => (
            <li className="pokemon-name" key={p.pokemon.url}>
              {p.pokemon.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetails;

