import React from "react";
import styled from "styled-components";

const Tag = styled.button`
  padding: 5px;
  width: 200px;
  height: auto;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
`;
function FilterTag({ name, dispatch, children }) {
  return (
    <Tag onClick={() => dispatch({ type: "REMOVE_FILTER", value: name })}>
      {name}
      {children}
    </Tag>
  );
}

export default FilterTag;
