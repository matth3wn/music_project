import React from "react";
import styled from "styled-components";
import Album from "../components/Album";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  cursor: pointer;
`;

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  list-style-type: none;
  margin-block-end: 0em;
  justify-content: space-around;
  align-items: center;
  padding-inline-start: 0px;

  ${({ favorite }) =>
    favorite &&
    `
    z-index: 10;
    position: absolute;
    height: 100vh;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #666666;
    color: white;
  `}
`;

function AlbumList({ data, dispatch, star, favorite }) {
  return (
    <Wrapper favorite={favorite}>
      {data?.map((i, j) => {
        return (
          <Album key={j} data={i} dispatch={dispatch} star={star}>
            <ImageContainer
              onClick={() => dispatch({ type: "SELECTED", value: i })}
            >
              <img src={i.artworkUrl100} alt={i.collectionName} />
            </ImageContainer>
          </Album>
        );
      })}
    </Wrapper>
  );
}

export default AlbumList;
