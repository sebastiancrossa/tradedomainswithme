import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

import { Background } from "./tradeCard.style";
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
      .then((user) => {
        let selectedUser = user[0];

        if (selectedUser) {
          // check if the img has a response status of anything but 4xx
          // if it does, delete it from object
          const imgReq = new Request(selectedUser.profile_img);
          fetch(imgReq)
            .then(
              (res) => res.status === 404 && delete selectedUser.profile_img
            )
            .finally(() => setUserInfo(selectedUser));
        }
      })
      .catch((err) => console.log("error fetching user", err));
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const placeholderImg =
    "https://st3.depositphotos.com/1767687/16607/v/380/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg";

  return (
    <Background>
      <Link href={`/${userInfo && userInfo.user_name}`} passHref>
        <a>
          <div className="user-info">
            <img
              src={
                userInfo && userInfo.profile_img
                  ? userInfo.profile_img
                  : placeholderImg
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

      <div className="trade-info">
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

export default TradeCard;
