import styled from "styled-components";

export const ModalContainer = styled.div`
  button {
    width: 100%;
    padding: 0.5rem;
    background-color: #43ccb5;
  }
`;

export const Container = styled.div`
  display: grid;

  justify-content: space-between;

  margin: 0 auto;

  .action-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;

    button,
    a {
      padding: 0.5rem;
      color: white;
      border-radius: 5px;
      font-weight: 600;
    }
  }

  .contact,
  .success {
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin: 0;
    }
  }

  .contact {
    background-color: #2c9cea;
  }

  .success {
    background-color: #43ccb5;
  }
`;

export const Background = styled.div`
  background-color: #f9f8f4;
  padding: 1rem;
  border-radius: 10px;

  width: 35rem;
  margin: 0 auto 0.5rem auto;

  img {
    width: 2rem;
    height: auto;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.1rem;
    font-weight: 600;
  }
`;
