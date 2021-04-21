import { signIn, signOut, getSession } from "next-auth/client";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import ReactModal from "react-modal";
import styled from "styled-components";

// Component imports
import { Container } from "../styles";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SwapsList from "../components/containers/SwapsList";

export default function Home({ session, domains, userInfo }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [newDomain, setNewDomain] = useState("");

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  console.log(userInfo);

  const handleDomainSubmit = async () => {
    // Creating the new domain
    // TODO: Do some server side protection as well
    let createdDomain = await axios
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

    onCloseModal();
    router.push(`/${userInfo.user_name.toLowerCase()}`);
  };

  return (
    <>
      <Head>
        <title>tradedomainswith.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledContainer>
        <Navbar session={session} user={userInfo.user_name} signIn={signIn} />
        {/* <button onClick={() => signOut()}>Sign out</button> */}

        <section class="text-container">
          <h1>tradedomainswith.me</h1>
          <h2 style={{ marginBottom: "1rem", fontWeight: "400" }}>
            The easiest way to find people to trade domains with.
          </h2>

          {session ? (
            <button onClick={onOpenModal}>Swap your first domain</button>
          ) : (
            <button onClick={signIn}>Swap your first domain</button>
          )}
        </section>

        <SwapsList domains={domains} />

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
            <button onClick={() => handleDomainSubmit()}>Add my domain</button>
          </ModalContainer>
        </ReactModal>

        <Footer />
      </StyledContainer>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let domains = null;
  let user = null;

  if (session) {
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

    // console.log(users);
    // console.log(session);

    user = users.filter((user) => user.external_id === session.user_id);
  }

  // Fetch all domains from user
  domains = await axios
    .request({
      method: "GET",
      url: `http://localhost:5000/api/domains/`,
      data: {
        secret: "q+pXtJSG#JDN37HsE@,",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: {
      session,
      domains: domains,
      userInfo: session ? user[0] : null,
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

    text-align: center;
  }

  button {
    width: 100%;
    padding: 0.5rem;
  }
`;

const StyledContainer = styled(Container)`
  .text-container {
    h1 {
      font-size: 1.6rem;
    }

    background-color: #f9f8f4;
    text-align: center;

    margin: 2rem 0;

    padding: 2rem;
    border-radius: 10px;
  }
`;
