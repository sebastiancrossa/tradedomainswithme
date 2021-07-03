import styled from "styled-components";
import { Container } from "..";

export const ModalContainer = styled.div`
  input {
    padding: 0.5rem;
    width: 100%;
    border: none;
    border-bottom: 2px solid #f9f8f4;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;

    text-align: center;
  }

  button {
    width: 100%;
    padding: 0.5rem;

    transition: all 0.15s ease-in;

    &:disabled {
      background-color: #0c0066;
    }
  }
`;

export const StyledContainer = styled(Container)`
  .code {
    background-color: #f9f8f4;
    padding: 0 0.3rem;
    margin-left: 0.3rem;
    font-weight: bold;
  }

  .unverified-domains {
    display: flex;
    text-align: center;
    flex-wrap: wrap;

    button {
      padding: 0.5rem;
      width: 100%;
      margin-top: 0.5rem;
    }
  }

  .unverified-domain {
    margin: 0 1rem 1rem 0;

    padding: 1rem;
    border-radius: 5px;
    background-color: #f9f8f4;
    width: fit-content;
  }

  .user-container {
    margin: 6rem 0 2rem 0;
    text-align: center;

    a {
      font-size: 1.2rem;
      color: black;
    }

    img {
      width: 8rem;
      height: auto;
      border-radius: 50rem;

      margin-bottom: 1rem;
    }
  }

  section {
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 1rem;
    }
  }

  .add-btn,
  .signout-btn {
    width: 30rem;
    margin: 0 auto 1rem auto;
    display: block;
  }

  .signout-btn {
    margin-bottom: 3rem;
    background-color: #ec6559;
  }

  .user-stats {
    margin: 0 auto 1rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    max-width: 30rem;

    @media only screen and (max-width: 375px) {
      grid-template-columns: 1fr;
    }
  }

  .traded,
  .open {
    background-color: #f9f8f4;
    padding: 1rem;

    border-radius: 5px;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
  }

  /* ! Abstract this styling, given that it's more than repeated */
  .offers-list,
  .swapped-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 3rem;

    @media only screen and (max-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }

    @media only screen and (max-width: 425px) {
      grid-template-columns: 1fr;
    }
  }
`;
