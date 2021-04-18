import styled from "styled-components";

const SwappedCard = () => {
  return (
    <Background>
      <div className="user-info">
        <img
          src="https://avatars.githubusercontent.com/u/20131547?v=4"
          alt="User profile image"
        />
        <p>Sebastian Crossa swapped</p>
      </div>

      <div>
        <div className="domain">
          <div className="tag verified">Verified</div>
          <p>potentialfor.business</p>
        </div>
        <p id="unaligned-circle">for</p>
        <div className="domain">
          <div className="tag verified">Verified</div>
          <p>nwtn.io</p>
        </div>
      </div>

      <div className="swapped-user">
        <p>with</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://avatars.githubusercontent.com/u/20131547?v=4"
            alt="User profile image"
          />
          <p>Jonathan Chávez</p>
        </div>
      </div>
    </Background>
  );
};

const Background = styled.div`
  /* TODO: all this info is pretty similar to what is being done on the TradeCard component, so abstract these styles in the future */
  img {
    width: 2rem;
    height: auto;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  #unaligned-circle {
    position: relative;
    z-index: 2;

    background-color: white;
    border-radius: 50rem;
    padding: 0.5rem;
    width: fit-content;

    margin: -2rem auto -0.6rem auto;
    z-index: 1;
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

  .swapped-user {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    font-size: 1.1rem;
    font-weight: 600;

    p {
      margin-right: 1rem;
    }
  }

  .user-info {
    display: flex;
    align-items: center;

    font-size: 1.1rem;
    font-weight: 600;

    margin: 0 auto 0.5rem auto;

    margin-bottom: 0.5rem;
  }

  .domain {
    position: relative;
    z-index: -1;

    background-color: #f9f8f4;
    padding: 2rem;

    margin-bottom: 1rem;

    text-align: center;
    font-size: 1.2rem;

    border-radius: 5px;
  }
`;

export default SwappedCard;
