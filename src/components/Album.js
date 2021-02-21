import React from "react";
import styled from "styled-components";

const Wrapper = styled.li`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 10px;
`;

const Star = styled.span`
  padding: 5px;
  cursor: pointer;
`;
function Album({ data, children, dispatch = null, star}) {
  return (
    <Wrapper>
      <i>{data.collectionName}</i>
      {children}

      {star ? <Star onClick={() => dispatch({ type: "FAVORITE", value: data })}>☆</Star> : null}
    </Wrapper>
  );
}
export default Album;
