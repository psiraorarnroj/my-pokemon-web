"use client";

import React, { useState, useEffect } from "react";
import Card from "@/app/components/Card";
import Button from "@/app/components/Button";
import { getAllPokemonList, getPokemonDetail } from "@/app/services/pokeapi";
import { IPokemonList, IPokemon } from "@/app/interfaces/IPokemon";
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

      const detailedPokemonList = await Promise.all(
        data?.results?.map(async (pokemon) => {
          const details = await getPokemonDetail(pokemon?.url);
          return {
            ...pokemon,
            id: details?.id,
            image: details?.sprites?.front_default,
          };
        }),
      );

      setFullPokemonList(detailedPokemonList);
      setLoading(false);
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const sortedList = sortPokemonList(fullPokemonList, sort);
    const paginatedList = sortedList.slice(offset, offset + limit);
    setPaginatedPokemonList(paginatedList);
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

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="homePage-container h-screen w-screen p-10">
      <div className="mb-8 grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
        <h3 className="text-center md:text-left">All the Pokemon!</h3>
        <div className="flex items-center justify-center gap-6 md:justify-end">
          {sortOptions.map((option) => (
            <label key={option.value}>
              <input
                className="mr-2"
                type="radio"
                value={option.value}
                checked={sort === option.value}
                onChange={() => setSort(option.value)}
              />{" "}
              {option.label}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-6 lg:justify-between">
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
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-10">
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
