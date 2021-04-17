import Link from "next/link";
import styled from "styled-components";

import { BsArrowRightShort } from "react-icons/bs";

const OfferCard = () => {
  return (
    <Background>
      <div className="user-info">
        <img
          src="https://avatars.githubusercontent.com/u/20131547?v=4"
          alt="User profile image"
        />
        <p>Sebastian Crossa wants to trade</p>
      </div>

      <div className="domain">
        <p>potentialfor.business</p>
      </div>

      <div class="trade-info">
        <p>
          <span>8</span> swap offers
        </p>

        <Link href="/trade/potentialfor.business" passHref>
          <a>
            <button>
              <p>Check out offers</p>
              <BsArrowRightShort size={25} />
            </button>
          </a>
        </Link>
      </div>
    </Background>
  );
};

const Background = styled.div`
  border-radius: 5px;

  img {
    width: 2rem;
    height: auto;
    border-radius: 50%;
    margin-right: 0.5rem;
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
    background-color: #f9f8f4;
    padding: 2rem;

    margin-bottom: 1rem;

    text-align: center;
    font-size: 1.2rem;

    border-radius: 5px;
  }

  .trade-info {
    display: grid;
    grid-template-columns: 0.8fr 1fr;
    grid-gap: 0.5rem;

    align-items: center;

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.6rem;

      text-align: center;
    }

    span {
      width: 2rem;
      height: auto;
      margin-right: 0.3rem;
      background-color: #f9f8f4;
      font-weight: 600;
      padding: 0.3rem 0.7rem;
      border-radius: 10rem;
    }
  }

  .icon {
    padding: 0.5rem;
    background: white;
    width: fit-content;
    margin: 0 auto;
    border-radius: 50rem;
  }
`;

export default OfferCard;
