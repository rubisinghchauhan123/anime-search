import React, { useState, useEffect } from "react";
import './SearchPage.css';
import axios from "axios";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] = useState([]);
  const [message, setMessage] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const fetchCharacters = async (searchQuery = "") => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/characters`, {
        params: {
          page: 1,
          limit: 15,
          q: searchQuery,
          order_by: "favorites",
          sort: "desc",
        },
      });
      if (response.data.data.length === 0) {
        setMessage("No results found");
        setTotalResults(0);
      } else {
        setMessage("");
        setCharacters(response.data.data);
        setTotalResults(response.data.pagination.items.total);
      }
    } catch (error) {
      setMessage("Error fetching data");
      setTotalResults(0);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCharacters(query);
  };

  return (
    <div className="anime-form">
      <h1>Anime Character Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a character"
        />
        <button type="submit">Search</button>
      </form>
      {message && <p>{message}</p>}
      <p>Total Results: {totalResults}</p> {}
      <div>
        {characters.map((character) => (
          <div key={character.mal_id}>
            <h2>{character.name}</h2>
            <img src={character.images.jpg.image_url} alt={character.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
