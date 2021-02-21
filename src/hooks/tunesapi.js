import { useEffect, useReducer } from "react";

const filterHelper = (arr, term) => {
  return arr.filter((o) =>
    Object.keys(o).some((k) => {
      return o[k]
        .toString()
        .toLowerCase()
        .includes(term.toString().toLowerCase());
    })
  );
};
const useItunesApi = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "GET_ALBUMS":
          return {
            ...state,
            results: action.value,
            loading: false,
          };
        case "ERROR":
          return {
            ...state,
            loading: false,
            error: true,
          };
        case "SUBMIT":
          return {
            ...state,
            submitted: !state.submitted,
            selected: null,
          };
        case "TERM":
          return {
            ...state,
            term: action.value,
          };
        case "SELECTED":
          return {
            ...state,
            selected: action.value,
          };
        case "FAVORITE":
          localStorage.setItem(
            "favorites",
            JSON.stringify([...state.favorites, action.value])
          );
          return {
            ...state,
            favorites: [...state.favorites, action.value],
          };
        case "FILTER":
          let newResults = [];
          if (state.filterResults.length === 0) {
            newResults = filterHelper(state.results, action.value);
          } else {
            newResults = filterHelper(state.filterResults, action.value);
          }
          return {
            ...state,
            filter: [...state.filter, action.value],
            filterResults: newResults,
          };
        case "REMOVE_FILTER":
          const newFilters = state.filter.filter((tag) => tag !== action.value);
          let newFilteredList = [];
          if (newFilters.length > 0) {
            newFilteredList = newFilters.map((f) =>
              filterHelper(state.results, f)
            )[0];
          }
          return {
            ...state,
            filter: newFilters,
            filterResults: newFilteredList,
          };
        case "SHOW_FAVORITE":
          return {
            ...state,
            showFavorite: !state.showFavorite,
          };
        default:
          return state;
      }
    },
    {
      results: [],
      error: "",
      term: "",
      submitted: null,
      selected: null,
      favorites: window.localStorage.getItem("favorites")
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [],
      filter: [],
      filterResults: [],
      showFavorite: false,
    }
  );

  useEffect(() => {
    if (state.submitted) {
      const parsedTerm = state.term.trim().split(" ").join("+");
      fetch(`https://itunes.apple.com/search?term=${parsedTerm}&entity=album`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((data) => {
          dispatch({ type: "GET_ALBUMS", value: data.results });
          dispatch({ type: "SUBMIT" });
        })
        .catch((err) => {
          dispatch({ type: "ERROR" });
        });
    }
  }, [state.submitted, state.term]);

  return [state, dispatch];
};

export default useItunesApi;
