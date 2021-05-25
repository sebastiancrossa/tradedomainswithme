import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styled from "styled-components";

import { BsArrowRightShort } from "react-icons/bs";

const TradeCard = ({ domain }) => {
  const [userInfo, setUserInfo] = useState();

  // Getting the user ino for each card
  const fetchUserInfo = async () => {
    await axios
      .request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${domain.user_id}`,
        headers: {
          Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
        },
      })
      .then((res) => res.data)
      // .then((data) => console.log("data", data[0]))
      .then((user) => user[0] && setUserInfo(user[0]))
      .catch((err) => console.log("error fetching user", err));
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  console.log(userInfo && userInfo.profile_img);

  return (
    <Background>
      <Link href={`/${userInfo && userInfo.user_name}`} passHref>
        <a>
          <div className="user-info">
            <img
              src={
                userInfo
                  ? userInfo.profile_img
                  : "https://st3.depositphotos.com/1767687/16607/v/380/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
              }
              loading="lazy"
            />
            <p>@{userInfo && userInfo.user_name} wants to trade</p>
          </div>
        </a>
      </Link>

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
          <span>
            {domain.swapOffersReceived && domain.swapOffersReceived.length}
          </span>{" "}
          swap{" "}
          {domain.swapOffersReceived && domain.swapOffersReceived.length === 1
            ? "offer"
            : "offers"}
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
    color: black;

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

export default TradeCard;
