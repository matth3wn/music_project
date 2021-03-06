import React from "react";
import styled from "styled-components";
import SearchResults from "./container/SearchResults";

const Header = styled.h1`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  color: white;
  background-color: black;
  letter-spacing: 3px;
  padding: 5px;
  margin-block-start: 0;
  margin-block-end: 0;
`;
function App() {
  return (
    <>
      <Header>iTunes Search</Header>
      <SearchResults />
    </>
  );
}

export default App;
