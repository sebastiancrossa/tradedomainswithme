// Libraries
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Head from "next/head";
import axios from "axios";
import styled from "styled-components";
import ReactModal from "react-modal";

// Component imports
import { Container } from "../styles";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TradeCard from "../components/ui/TradeCard";
import SwappedCard from "../components/ui/SwappedCard";

const User = ({ session, domains, userInfo }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [verifiedDomains, setVerifiedDomains] = useState([]);
  const [unverifiedDomains, setUnverifiedDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  const isMe = session.user_id === userInfo._id;
  // const isMe = false;

  useEffect(() => {
    let verifiedDomains = domains.filter(
      (domain) => domain.isVerified === true
    );
    let unverifiedDomains = domains.filter(
      (domain) => domain.isVerified === false
    );

    setVerifiedDomains(verifiedDomains);
    setUnverifiedDomains(unverifiedDomains);
  }, []);

  console.log("domains", domains);
  console.log("verified domains", verifiedDomains);
  console.log("unverified domains", unverifiedDomains);

  // console.log("userInfo", userInfo);
  // console.log("session in user", session);

  const handleDomainAdd = async () => {
    // Creating the new domain
    // TODO: Do some server side protection as well
    await axios
      .request({
        method: "POST",
        url: "http://localhost:5000/api/domains/",
        headers: { "Content-Type": "application/json" },
        data: {
          secret: "q+pXtJSG#JDN37HsE@,",
          user_id: session.user_id,
          name: newDomain,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  return (
    <>
      <Head>
        <title>{router.query.user} | tradedomainswith.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledContainer>
        <Navbar session={session} signIn={signIn} />

        <div className="user-container">
          <div>
            <img
              src={userInfo.profile_img}
              alt={`Profile picture for ${userInfo.display_name} (@${userInfo.user_name})`}
            />
            <h1>{userInfo.display_name}</h1>
            <a
              href={`https://twitter.com/${userInfo.user_name}`}
              target="_blank"
            >
              @{userInfo.user_name}
            </a>
          </div>
        </div>

        {isMe && (
          <button className="add-btn" onClick={onOpenModal}>
            Add a domain
          </button>
        )}

        <div className="user-stats">
          <div class="traded">{userInfo.domains.length} domains swaped</div>
          <div class="open">{userInfo.domains.length} open swap offers</div>
        </div>

        {isMe && unverifiedDomains.length > 0 && (
          <section>
            <h2 style={{ margin: "0" }}>Verify your domains</h2>
            <p style={{ marginBottom: "1rem" }}>
              You can still create swap offers for unverified domains, but it is
              highly recommended to verify each of your submitted domains, since
              it's easier for others to follow through on a swap offer.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              To verify all the domains added, go to your domain service
              provider and add a{" "}
              <span style={{ fontWeight: "bold" }}>TXT Record</span> with the
              value of{" "}
              <span className="code">
                tradedomainswithme-[your domain here]
              </span>
              (e.g. tradedomainswithme-potentialfor.business). Once that is
              added, keep refreshing until we are able to verify that you are
              the owner of that domain!
            </p>

            {unverifiedDomains.map((domain) => (
              <div className="unverified-domains">
                <div className="unverified-domain">
                  <p>{domain.name}</p>
                  <button>Check verification</button>
                </div>
              </div>
            ))}
          </section>
        )}

        <section>
          {/* <h2>Open swap offers from this user</h2> */}
          <h2>{isMe ? "Your open swap offers" : "Open swap offers"}</h2>

          <div className="offers-list">
            <TradeCard />
            <TradeCard />
          </div>
        </section>

        <section>
          <h2>{isMe ? "Your swap history" : "Swap history"}</h2>

          <div className="swapped-list">
            <SwappedCard />
            <SwappedCard />
            <SwappedCard />
          </div>
        </section>

        <ReactModal
          isOpen={isOpen}
          onRequestClose={onCloseModal}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          style={{
            overlay: {
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            },
            content: {
              border: "none",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              maxWidth: "25rem",
              margin: "auto auto",
              height: "fit-content",
              textAlign: "center",
            },
          }}
        >
          <ModalContainer>
            <h2>Add a new domain</h2>
            <input
              type="text"
              placeholder="example.com"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
            />
            <button onClick={() => handleDomainAdd()}>Add my domain</button>
          </ModalContainer>
        </ReactModal>

        <Footer />
      </StyledContainer>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Fetch complete user info
  const users = await axios
    .request({
      method: "GET",
      url: "http://localhost:5000/api/users/",
      headers: { "Content-Type": "application/json" },
      data: {
        secret: "q+pXtJSG#JDN37HsE@,",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const user = users.filter(
    (user) => user.user_name.toLowerCase() === context.query.user
  );

  // Fetch domains from user
  const domains = await axios
    .request({
      method: "GET",
      url: `http://localhost:5000/api/domains/${session.user_id}`,
      headers: { "Content-Type": "application/json" },
      data: {
        secret: "q+pXtJSG#JDN37HsE@,",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  console.log("domains", domains);

  return {
    props: {
      session,
      domains,
      userInfo: user[0],
    },
  };
}

const ModalContainer = styled.div`
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

  button {
    width: 100%;
    padding: 0.5rem;
  }
`;

const StyledContainer = styled(Container)`
  .code {
    background-color: #f9f8f4;
    padding: 0 0.3rem;
    margin-left: 0.3rem;
    font-weight: bold;
  }

  .unverified-domains {
    display: flex;
    text-align: center;

    button {
      padding: 0.5rem;
      width: 100%;
      margin-top: 0.5rem;
    }
  }

  .unverified-domain {
    margin-right: 1rem;

    padding: 1rem;
    border-radius: 5px;
    background-color: #f9f8f4;
    width: fit-content;
  }

  .user-container {
    margin: 6rem 0 2rem 0;
    text-align: center;

    a {
      font-size: 1.2rem;
      color: black;
    }

    img {
      width: 8rem;
      height: auto;
      border-radius: 50rem;

      margin-bottom: 1rem;
    }
  }

  section {
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 1rem;
    }
  }

  .add-btn {
    width: 30rem;
    margin: 0 auto 1rem auto;
    display: block;
  }

  .user-stats {
    margin: 0 auto 3rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    max-width: 30rem;

    @media only screen and (max-width: 375px) {
      grid-template-columns: 1fr;
    }
  }

  .traded,
  .open {
    background-color: #f9f8f4;
    padding: 1rem;

    border-radius: 5px;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
  }

  /* ! Abstract this styling, given that it's more than repeated */
  .offers-list,
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

export default User;
