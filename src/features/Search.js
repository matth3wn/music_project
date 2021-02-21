import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px;
  flex-direction: column;
`;

const SlowOptions = styled.div`
  margin-top: 10px;
`

function Search({ dispatch }) {
  const [toggle, setToggle] = useState(false);
  const [delay, setDelay] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (toggle) {
      setTimeout(() => {
        dispatch({ type: "SUBMIT" });
      }, delay * 1000);
    } else {
      dispatch({ type: "SUBMIT" });
    }
  };
  return (
    <Wrapper onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          autoComplete="off"
          id="keyword"
          onChange={(e) => dispatch({ type: "TERM", value: e.target.value })}
        />
        <button type="primary">Search</button>
      </div>
      <SlowOptions>
        Time in Seconds
        <input
          type="number"
          min="1"
          max="10"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />
        <input
          type="checkbox"
          value={toggle}
          name="slow"
          onChange={() => setToggle(!toggle)}
        />
        <label htmlFor="slow">Slow Search</label>
      </SlowOptions>
    </Wrapper>
  );
}
export default Search;
