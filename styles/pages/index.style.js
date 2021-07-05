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
  .text-container {
    h1 {
      font-size: 1.6rem;
    }

    background-color: #f9f8f4;
    text-align: center;

    margin: 1rem 0 2rem 0;

    padding: 2rem;
    border-radius: 10px;
  }

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
