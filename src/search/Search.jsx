
 
import './Search.css';
 
function Search({updateSearchTerm}){

   
    return (
      <div className="search-wrapper">
        <input
          onChange={(e) => updateSearchTerm(e.target.value)}
          id="pokemon-name-search"
          type="search"
          placeholder="Search Pokemon"
        />
 
      </div>
    );
}

export default Search;