import React, { useState } from "react";
import { ApiOptions, ApiUrl } from "../api/Api";
import { AsyncPaginate } from "react-select-async-paginate";
import './Search.css'

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState("");

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${ApiUrl}?minPopulation=100000&namePrefix=${inputValue}`,
      ApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="async">
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
