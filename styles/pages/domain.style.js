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

  .remove-btn {
    background-color: #ec6559;
    border: 2px solid #ec6559;
  }

  .buttons {
    display: grid;
    grid-auto-columns: auto;
    grid-gap: 0.5rem;
  }

  .close-btn {
    background: none;
    border: 2px solid #5c45ff;
    color: #5c45ff;
  }

  button {
    width: 100%;
    padding: 0.5rem;
  }
`;

export const StyledContainer = styled(Container)`
  img {
    width: 2rem;
    height: auto;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .tag {
    width: fit-content;
    margin: 0 auto 0.5rem auto;

    font-size: 1rem;
    font-weight: 600;

    border-radius: 50rem;
    padding: 0.2rem 1rem;
  }

  .verified {
    background-color: #d9f6e3;
    color: #4da769;
  }

  .unverified {
    background-color: #fbf1eb;
    color: #f1a16f;
  }

  .heading-info {
    margin: 6rem 0 3rem 0;
    text-align: center;
  }

  .domain {
    font-size: 2.5rem;
  }

  .close {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;

    color: #ec6559;
    border: 2px solid #ec6559;
    background: none;
  }

  .user-content {
    display: flex;
    align-items: center;
  }
`;
