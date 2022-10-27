import styled from "styled-components";

const NewIcon = () => {
  return (
    <Container>
      <NewText>N</NewText>
    </Container>
  );
};

export default NewIcon;

const Container = styled.div`
  align-items: center;
  background: #ffe8f5;
  border-radius: 20%;
  display: flex;
  float: left;
  height: 17px;
  justify-content: center;
  margin-right: 10px;
  margin-top: 4px;
  width: 17px;
`;

const NewText = styled.span`
  color: #9000ff;
  font-family: ibmRegular;
  font-size: 12px;
  font-weight: 900;
`;
