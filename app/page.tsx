"use client";

import React, { useState, useEffect } from "react";
import Card from "@/app/components/Card";
import Button from "@/app/components/Button";
import { getAllPokemonList, getPokemonDetail } from "@/app/services/pokeapi";
import { IPokemon } from "@/app/interfaces/IPokemon";
import "./style.scss";

const sortOptions = [
  { value: "name", label: "Sort Name" },
  { value: "id", label: "Sort ID" },
];

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fullPokemonList, setFullPokemonList] = useState<IPokemon[]>([]);
  const [paginatedPokemonList, setPaginatedPokemonList] = useState<IPokemon[]>(
    [],
  );

  const limit = 12;
  const offset = (currentPage - 1) * limit;
  const isFirstPage = currentPage === 1;
  const totalPages = Math.ceil(fullPokemonList.length / limit);
  const isLastPage = currentPage === totalPages;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      const data = await getAllPokemonList();
      setFullPokemonList(data.results);
      setLoading(false);
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);

      const sortedList = sortPokemonList(fullPokemonList, sort);
      const currentPagePokemon = sortedList.slice(offset, offset + limit);
      const detailedPokemonList: IPokemon[] = [];
      for (const pokemon of currentPagePokemon) {
        const details = await getPokemonDetail(pokemon?.url);
        detailedPokemonList.push({
          ...pokemon,
          id: details?.id,
          image: details?.sprites?.front_default,
        });
      }

      setPaginatedPokemonList(detailedPokemonList);
      setLoading(false);
    };

    if (fullPokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [fullPokemonList, sort, currentPage, offset]);

  const sortPokemonList = (list: IPokemon[], sortBy: string): IPokemon[] => {
    return [...list].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "id") {
        return a.id - b.id;
      }
      return 0;
    });
  };

  const handleSortChange = (sortValue: string) => {
    setSort(sortValue);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="homePage-container h-screen w-screen p-10">
      <div className="mb-8 grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
        <h3 className="text-center font-medium md:text-left">
          All the Pokemon!
        </h3>
        <div className="flex items-center justify-center gap-6 md:justify-end">
          {sortOptions.map((option) => (
            <label key={option.value}>
              <input
                className="mr-2 scale-150 accent-[#024E74]"
                type="radio"
                value={option.value}
                checked={sort === option.value}
                onChange={() => handleSortChange(option.value)}
              />{" "}
              {option.label}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-6 md:justify-between">
        {loading ? (
          <p>Loading...</p>
        ) : (
          paginatedPokemonList.map((pokemon) => (
            <Card
              key={pokemon.name}
              name={pokemon.name}
              image={pokemon?.image}
            />
          ))
        )}
      </div>
      <div className="absolute left-0 right-0 flex justify-between p-10 md:bottom-0">
        <Button
          label={`Previous ${isFirstPage ? 0 : limit}`}
          onClick={handlePreviousPage}
          disabled={isFirstPage}
        />
        <Button
          label={`Next ${isLastPage ? 0 : limit}`}
          onClick={handleNextPage}
          disabled={isLastPage}
        />
      </div>
    </div>
  );
};

export default Home;
