import React from "react";
import styled from "styled-components";
import useItunesApi from "../hooks/tunesapi";
import Search from "../features/Search";
import AlbumList from "../features/AlbumList";
import Album from "../components/Album";
import Filter from "../features/Filter";
import FilterTag from "../components/FilterTag";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;

const DetailView = styled.div`
  display: block;
  padding: 2px;
`;

const ImageContainer = styled.div`
  margin-left: 2%;
  margin-right: 2%;
`;

const Back = styled.button`
  margin-top: 10px;
  cursor: pointer;
`;

function SearchResults() {
  const [
    {
      results,
      error,
      selected,
      filter,
      filterResults,
      favorites,
      showFavorite,
    },
    dispatch,
  ] = useItunesApi();

  return (
    <Wrapper>
      <Search dispatch={dispatch} />
      <Filter dispatch={dispatch} />
      <button onClick={() => dispatch({ type: "SHOW_FAVORITE" })}>
        Show/Hide Favorites ☆
      </button>
      {showFavorite ? (
        <AlbumList data={favorites} dispatch={dispatch} star={false} favorite />
      ) : null}
      <hr />
      {filter?.map((name) => (
        <FilterTag key={name} name={name} dispatch={dispatch} />
      ))}
      <hr />
      {!selected ? (
        <AlbumList
          data={filter.length > 0 ? filterResults : results}
          dispatch={dispatch}
          star
        />
      ) : (
        <div>
          <Back onClick={() => dispatch({ type: "SELECTED", value: null })}>
            {showFavorite ? "Hide" : "Back to Results"}
          </Back>
          <Album data={selected} dispatch={dispatch} star={!showFavorite}>
            <ImageContainer>
              <img src={selected.artworkUrl100} alt={selected.collectionName} />
            </ImageContainer>
            <DetailView>
              <h3>{`Artist: ${selected.artistName}`}</h3>
              <div>{`Price: ${selected.collectionPrice}`}</div>
              <div>{`Genre: ${selected.primaryGenreName}`}</div>
            </DetailView>
          </Album>
        </div>
      )}
      {error ? <div>Oh no there was an error...</div> : null}
    </Wrapper>
  );
}

export default SearchResults;
