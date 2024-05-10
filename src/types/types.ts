import { Dispatch, SetStateAction } from "react";

export interface SearchProps {
  searchTerm: string;
  setSearchTerm: CallableFunction;
  searchPlaceholderText: string;
  setSearchPlaceholderText: CallableFunction;
  searchHelperText: string;
  setSearchHelperText: CallableFunction;
  setTags: CallableFunction;
  tags: any[];
  setSelected: Dispatch<SetStateAction<readonly number[]>>;
  selected: readonly number[];
  favProduct: boolean;
  setFavProduct: Dispatch<SetStateAction<boolean>>;
  mycoolrows: Dispatch<any>;
  setMycoolrows: CallableFunction;
}

export interface TableRowProps {
  index: number;
  sku: string | number;
  name: string;
  onSpecial: boolean;
  isFavourite: boolean;
  price: number;
  historicalIcon: string;
  historicalLow: number;
  productPackage: string;
  ratio: string;
  store: string;
  productURL: string;
}

export interface FilterProps {
  setTags: CallableFunction;
  tags: string[];
}

export interface HeadCell {
  id: keyof TableRowProps;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";
