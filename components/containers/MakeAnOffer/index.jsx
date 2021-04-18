import styled from "styled-components";

const MakeAnOffer = () => {
  return (
    <Background>
      <h3>Are you interested in this domain? Offer one of your own:</h3>
      <input type="text" placeholder="example.com" />
      <button>Offer this domain</button>
    </Background>
  );
};

const Background = styled.div`
  background-color: wheat;
  text-align: center;
  max-width: 35rem;

  background-color: #f9f8f4;

  margin: 0 auto 2rem auto;
  padding: 1rem;

  border-radius: 5px;

  h3 {
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    width: 100%;
    border: none;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;

    text-align: center;
  }

  button {
    width: 100%;
    padding: 0.5rem;
  }
`;

export default MakeAnOffer;
