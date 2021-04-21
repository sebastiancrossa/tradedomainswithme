import { useEffect, useState } from "react";
import styled from "styled-components";
import { BiCheck } from "react-icons/bi";
import { AiOutlineTwitter } from "react-icons/ai";

const OfferCard = ({ userId, domainId }) => {
  const [userInfo, setUserInfo] = useState();

  const fetchInfo = async () => {
    // Fetch complete user info
    const user = await axios
      .request({
        method: "GET",
        url: `http://localhost:5000/api/users/${userId}`,
        headers: { "Content-Type": "application/json" },
        data: {
          secret: "q+pXtJSG#JDN37HsE@,",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // fetchInfo();
  }, []);

  return (
    <Container>
      <Background>
        <div className="user-info">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://avatars.githubusercontent.com/u/20131547?v=4"
              alt="User profile image"
            />
            <p>{user} wants to swap this domain for:</p>
          </div>
          <p>
            <span
              style={{
                padding: "0.5rem",
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "0.5rem",
              }}
            >
              {domain}
            </span>
          </p>
        </div>
      </Background>
      {/* only display this if the user is the one who initiated the swap */}
      <div className="action-list">
        <button className="contact">
          <AiOutlineTwitter
            size={25}
            style={{ stroke: "white", marginRight: "0.5rem" }}
          />
          <p>Send a DM</p>
        </button>
        <button className="success">
          <BiCheck
            size={25}
            style={{ stroke: "white", marginRight: "0.5rem" }}
          />
          <p>Mark as swapped</p>
        </button>
      </div>
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

    button {
      padding: 0.5rem;
      color: white;
    }
  }

  .contact,
  .success {
    display: flex;
    justify-content: center;
    align-items: center;
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
