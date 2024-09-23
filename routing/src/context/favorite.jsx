import { useState } from "react";
import { createContext } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  function addFavorite(favorite) {
    const favoriteProductIdx = favorites.findIndex(
      (product) => product.id === favorite.id
    );
    if (favoriteProductIdx === -1) {
      let newFavorites = [...favorites, favorite];

      setFavorites(newFavorites);
      setFavoritesToLocalStorage(newFavorites);
      return true;
    } else {
      favorites.splice(favoriteProductIdx, 1);
      let newFavorites = [...favorites];
      setFavoritesToLocalStorage(newFavorites);
      setFavorites(newFavorites);
      return false;
    }
  }

  function setFavoritesToLocalStorage(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function getFavoritesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }

  function isFavorite(product) {
    return favorites.some((favorite) => favorite.id === product.id);
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
