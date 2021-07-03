// Libraries
import { signIn, signOut, getSession } from "next-auth/client";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import ReactModal from "react-modal";

// Component imports
import GALayout from "../components/layout/GALayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SwapsList from "../components/containers/SwapsList";
import SwappedCard from "../components/ui/SwappedCard";

// Styles
import { ModalContainer, StyledContainer } from "../styles/pages/index.style";

const isValidDomain = require("is-valid-domain");

export default function Home({ session, domains, swappedDomains, userInfo }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [newDomain, setNewDomain] = useState("");

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  const handleDomainSubmit = async () => {
    // Creating the new domain
    // TODO: Do some server side protection as well
    await axios
      .request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/domains`,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
        },
        data: {
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
    <GALayout>
      <Head>
        <title>tradedomainswith.me</title>

        <meta property="og:url" content="https://tradedomainswith.me" />
        <meta
          name="description"
          content="Find people to trade your unwanted domains with."
        />
        <meta
          property="og:description"
          content="Find people to trade your unwanted domains with."
        />
        <meta
          itemProp="description"
          content="Find people to trade your unwanted domains with."
        />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="tradedomainswith.me" />
        <meta
          name="twitter:description"
          content="Find people to trade your unwanted domains with."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/kisana/image/upload/v1619462650/tradedomainswithme-pic.jpg"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledContainer>
        <Navbar
          session={session}
          user={userInfo && userInfo.user_name}
          signIn={signIn}
          signOut={signOut}
        />
        {/* <button onClick={() => signOut()}>Sign out</button> */}

        <section className="text-container">
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

        <section>
          <h2 style={{ marginBottom: "1rem" }}>Recently swapped domains</h2>

          {swappedDomains && swappedDomains.length == 0 ? (
            <p>No swaps done just yet!</p>
          ) : (
            <div className="swapped-list">
              {swappedDomains &&
                swappedDomains.map((swappedDomain) => (
                  <SwappedCard
                    domain={swappedDomain}
                    user={swappedDomain.user && swappedDomain.user.user}
                  />
                ))}
            </div>
          )}
        </section>

        <ReactModal
          isOpen={isOpen}
          onRequestClose={onCloseModal}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          style={{
            overlay: {
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
            content: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
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
            <button
              onClick={() => handleDomainSubmit()}
              disabled={!isValidDomain(newDomain)}
            >
              Add my domain
            </button>
          </ModalContainer>
        </ReactModal>

        <Footer />
      </StyledContainer>
    </GALayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let swappedDomains = [];
  let unswappedDomains = [];
  let user = null;

  if (session) {
    // Fetch complete user info of logged in user
    const users = await axios
      .request({
        method: "GET",
        url: `${process.env.BACKEND_URL}/api/users`,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    user = users.filter((user) => user.external_id === session.user_id);
  }

  // Fetch all domains from user
  await axios
    .request({
      method: "GET",
      url: `${process.env.BACKEND_URL}/api/domains`,
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
      },
    })
    .then((res) => res.data)
    .then((fetchedDomains) =>
      fetchedDomains.map((domain) => {
        if (domain.swappedWith) {
          if (
            swappedDomains.length === 0 ||
            swappedDomains.some(
              (item) => item.swappedWith.domain_name !== domain.name
            )
          )
            swappedDomains.push(domain);
        } else {
          unswappedDomains.push(domain);
        }
      })
    )
    .then(async () => {
      // If we do have swapped domains, fetch the users info
      if (swappedDomains.length > 0) {
        await Promise.all(
          swappedDomains.map(async (swappedDomain, index) => {
            await axios
              .request({
                method: "POST",
                url: `${process.env.BACKEND_URL}/api/users/${swappedDomain.user_id}`,
                headers: {
                  Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
                },
              })
              .then((res) => res.data)
              .then((user) => {
                swappedDomains[index]["user"] = {
                  user: user[0],
                  ...swappedDomain,
                };
              })
              .catch((err) =>
                console.log(
                  "Error while fetching swapped domain user info |",
                  err
                )
              );
          })
        );
      }
    })
    .catch((err) => console.log(err));

  // Have the verified unswapped domains be at the front
  let verifiedDomains = unswappedDomains.filter(
    (domain) => domain.isVerified === true
  );
  let unverifiedDomains = unswappedDomains.filter(
    (domain) => domain.isVerified === false
  );
  unswappedDomains = [...verifiedDomains, ...unverifiedDomains];

  return {
    props: {
      session: session ? session : null,
      domains: unswappedDomains,
      swappedDomains,
      userInfo: session ? user[0] : null,
    },
  };
}
