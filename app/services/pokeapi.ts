import axios from "axios";
import { IPokemonList, IPokemonDetail } from "@/app/interfaces/IPokemon";

const api = axios.create({
  baseURL: "https://pokeapi.co",
});

export const getPokemonList = async (
  limit: number,
  offset: number,
): Promise<IPokemonList> => {
  try {
    const response = await api.get(
      `api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { count: 0, next: null, previous: null, results: [] };
  }
};

export const getAllPokemonList = async (): Promise<IPokemonList> => {
  try {
    const response = await api.get(`api/v2/pokemon?limit=100000&offset=0`);
    return response.data;
  } catch (error) {
    console.error(error);
    return { count: 0, next: null, previous: null, results: [] };
  }
};

export const getPokemonDetail = async (
  url: string,
): Promise<IPokemonDetail> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      id: 0,
      name: "",
      sprites: {
        back_default: "",
        back_female: "",
        back_shiny: "",
        front_default: "",
        front_female: "",
        front_shiny: "",
      },
    };
  }
};
