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
`;

function AlbumList({ data, dispatch, star }) {
  return (
    <Wrapper>
      {data?.map((i, j) => {
        return (
          <Album key={j} data={i} dispatch={dispatch} star>
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
