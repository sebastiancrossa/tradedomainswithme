import styled from "styled-components";

// ? Hard coded at the moment, but plan on making this an isolated component
const Banner = () => {
  return (
    <a href="https://www.producthunt.com/posts/tradedomainswith-me">
      <Background>
        <p>This product is live on Product Hunt! Come check us out :)</p>
        <p>&rarr;</p>
      </Background>
    </a>
  );
};

const Background = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 5px;

  color: #f1a16f;
  font-weight: bold;

  background-color: #fbf1eb;
  border: 2px solid #f1a16f;
`;

export default Banner;
