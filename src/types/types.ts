import { Dispatch, SetStateAction } from "react";

export interface SearchProps {
  searchTerm: string;
  setSearchTerm: CallableFunction;
  searchedItem: string;
  setSearchedItem: CallableFunction;
  searchPlaceholderText: string;
  setSearchPlaceholderText: CallableFunction;
  searchHelperText: string;
  setSearchHelperText: CallableFunction;
  setTags: CallableFunction;
  tags: string[];
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
  onSpecialTooltip: string;
  onSpecialMultipleIcon: string;
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
  searchedItem: string;
}

export interface HeadCell {
  id: keyof TableRowProps;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";

export interface EnhancedTableProps {
  selected: readonly number[];
  setSelected: Dispatch<SetStateAction<readonly number[]>>;
  favProduct: boolean;
  setFavProduct: Dispatch<SetStateAction<boolean>>;
  mycoolrows: Dispatch<any>;
  setMycoolrows: Dispatch<any>;
  setTags: CallableFunction;
  tags: string[];
  addToListItemsCountdown: string[];
  addToListItemsPaknSave: string[];
  addToListItemsNewWorld: string[];
  setAddToListItemsCountdown: CallableFunction;
  setAddToListItemsPaknSave: CallableFunction;
  setAddToListItemsNewWorld: CallableFunction;
  numSelected: number;
  hideSearchComponent?: boolean;
}

export interface CheckboxListProps {
  addToListItemsCountdown: string[];
  addToListItemsPaknSave: string[];
  addToListItemsNewWorld: string[];
  setAddToListItemsCountdown: CallableFunction;
  setAddToListItemsPaknSave: CallableFunction;
  setAddToListItemsNewWorld: CallableFunction;
  setHideSearchComponent: React.Dispatch<SetStateAction<boolean>>;
}
export interface EnhancedTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableRowProps
  ) => void;

  order: Order;
  orderBy: string;
  numSelected: number;
}
