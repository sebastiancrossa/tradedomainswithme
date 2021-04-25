import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import styled from "styled-components";
import { BiCheck } from "react-icons/bi";
import { AiOutlineTwitter } from "react-icons/ai";

const OfferCard = ({ isMe, userImg, userName, domainId }) => {
  const [domainInfo, setDomainInfo] = useState();
  console.log(domainId);

  const fetchInfo = async () => {
    await axios
      .request({
        method: "GET",
        url: `http://localhost:5000/api/domains/`,
        data: {
          secret: "q+pXtJSG#JDN37HsE@,",
        },
      })
      .then((res) => res.data)
      .then((domains) => {
        console.log(domains);
        return domains.filter((domain) => domain._id === domainId);
      })
      .then((domain) => setDomainInfo(domain[0]))
      .catch((err) => console.log(err));
  };

  const handleDomainSwap = async () => {};

  useEffect(() => {
    fetchInfo();
  }, []);

  console.log("domainInfo", domainInfo);

  return (
    <Container>
      <Background>
        <div className="user-info">
          <Link href={`/${userName}`}>
            <a>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                }}
              >
                <img src={userImg} alt="User profile image" />
                <p>{userName} wants to swap this domain for:</p>
              </div>
            </a>
          </Link>
          <Link href={`/trade/${domainInfo && domainInfo.name}`}>
            <a>
              <p>
                <span
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    marginLeft: "0.5rem",
                    cursor: "pointer",
                    color: "black",
                  }}
                >
                  {domainInfo && domainInfo.name}
                </span>
              </p>
            </a>
          </Link>
        </div>
      </Background>
      {/* only display this if the user is the one who initiated the swap */}
      {isMe && (
        <div className="action-list">
          <a
            className="contact"
            href={`https://twitter.com/${userName}`}
            target="_blank"
          >
            <AiOutlineTwitter
              size={25}
              style={{ stroke: "white", marginRight: "0.5rem" }}
            />
            <p>Send a DM</p>
          </a>
          <button className="success" onClick={() => handleDomainSwap()}>
            <BiCheck
              size={25}
              style={{ stroke: "white", marginRight: "0.5rem" }}
            />
            <p>Mark as swapped</p>
          </button>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
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

const Background = styled.div`
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

export default OfferCard;
