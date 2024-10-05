export interface IPokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}

export interface IPokemon {
  id: number;
  name: string;
  url: string;
  image?: string;
}

export interface IPokemonDetail {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
  };
}