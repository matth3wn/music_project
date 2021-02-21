import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px;
`;
function Filter({ dispatch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term) {
      dispatch({ type: "FILTER", value: term });
      setTerm("");
    }
  };
  return (
    <Wrapper onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit">Set Filter</button>
    </Wrapper>
  );
}

export default Filter;
