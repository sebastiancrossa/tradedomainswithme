import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styled from "styled-components";

import { BsArrowRightShort } from "react-icons/bs";

const OfferCard = ({ domain }) => {
  const [userInfo, setUserInfo] = useState();

  // Getting the user ino for each card
  const fetchUserInfo = async () => {
    await axios
      .request({
        method: "GET",
        url: `http://localhost:5000/api/users/${domain.user_id}`,
        headers: { "Content-Type": "application/json" },
        data: {
          secret: "q+pXtJSG#JDN37HsE@,",
        },
      })
      .then((res) => res.data)
      .then((user) => setUserInfo(user[0]))
      .catch((err) => console.log(err));
  };

  // console.log(userInfo);
  console.log(userInfo);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Background>
      <div className="user-info">
        <img src={userInfo && userInfo.profile_img} alt="User profile image" />
        <p>@{userInfo && userInfo.user_name} wants to trade</p>
      </div>

      <div className="domain">
        {domain.isVerified ? (
          <div className="tag verified">Verified</div>
        ) : (
          <div className="tag unverified">Unverified</div>
        )}

        <p>{domain && domain.name}</p>
      </div>

      <div class="trade-info">
        <p>
          <span>{domain && domain.swapOffersReceived.length}</span> swap offers
        </p>

        <Link href={`/trade/${domain && domain.name}`} passHref>
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
      width: 100%;

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
