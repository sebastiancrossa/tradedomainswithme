import styled from "styled-components";

const Footer = () => {
  return (
    <Background>
      <p>
        Built by Sebastian Crossa (
        <a href="https://twitter.com/SebastianCrossa">@sebastiancrossa</a>)
      </p>
    </Background>
  );
};

const Background = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

export default Footer;
