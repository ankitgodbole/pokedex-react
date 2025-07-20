import { Link } from "react-router-dom";
import "../pokemonList/PokemonList.css"; // or keep styles in PokemonList.css

const Pokemon = ({ name, img_url, id }) => {
  return (
    <Link to={`/pokemon/${id}`} className="pokemon-card">
      <img src={img_url} alt={name} />
      <div className="pokemon-name">{name}</div>
    </Link>
  );
};

export default Pokemon;
