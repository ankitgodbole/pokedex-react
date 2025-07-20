  
import "./PokemonList.css";
import Pokemon from "../pokemon/Pokemon.jsx";
import usePokemonList from "../hooks/usePokemonList.js";


const PokemonList = () => {
  console.log("pokemon List xomponent")
  // const [pokedexUrl, setPokedexUrl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );
  // const [prev, setPrev] = useState();
  // const [next, setNext] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // const [pokemonList, setPokemonList] = useState([]);


  const [pokemonListState, setPokemonListState] = usePokemonList(
    "https://pokeapi.co/api/v2/pokemon", false
  );

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-list">Pokemon List</div>

      {/* ✅ This must have className="pokemon" */}
      <div className="pokemon">
        {
        pokemonListState.isLoading
          ? "Loading Content...."
          : pokemonListState.pokemonList.map((pokemon) => (
              <Pokemon
                name={pokemon.name}
                img_url={pokemon.img}
                key={pokemon.id}
                id={pokemon.id}
              />
            ))
            }
      </div>

      <div className="btn">
        <button
          disabled={!pokemonListState.prev}
          onClick={() =>
            setPokemonListState((prevState)=>({
              ...prevState,
              pokedexUrl: prevState.prev,
            }))
          }
          className="prev-list"
        >
          prev
        </button>
        <button
          disabled={!pokemonListState.next}
          onClick={() =>
            setPokemonListState((prevState)=>({
              ...prevState,
              pokedexUrl: prevState.next,
            }))
          }
          className="next-list"
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
