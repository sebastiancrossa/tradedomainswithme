import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, getSession } from "next-auth/client";
import Head from "next/head";
import axios from "axios";

import styled from "styled-components";

import GALayout from "../../components/layout/GALayout";
import ReactModal from "react-modal";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Container } from "../../styles";
import MakeAnOffer from "../../components/containers/MakeAnOffer";
import OffersList from "../../components/containers/OffersList";

const Domain = ({
  session,
  userInfo,
  domainInfo,
  domainOwner,
  domainsByCurrentUser,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  console.log(domainInfo);
  console.log("userInfo", userInfo);

  const isMe = session ? session.user_id === domainOwner.external_id : false;

  const handleDomainDelete = async () => {
    await axios
      .request({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/domains/${domainInfo._id}`,
        headers: { "Content-Type": "application/json" },
        data: {
          secret: process.env.NEXT_PUBLIC_BACKEND_SECRET,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    router.push("/");
  };

  return (
    <GALayout>
      <Head>
        <title>Swap potentialfor.business</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledContainer>
        <Navbar
          session={session}
          user={userInfo && userInfo.user_name}
          signIn={signIn}
          signOut={signOut}
        />

        {domainInfo && domainInfo.swappedWith ? (
          <div className="heading-info">
            <div>
              {domainInfo && domainInfo.isVerified ? (
                <div className="tag verified">
                  <p>Verified</p>
                </div>
              ) : (
                <div className="tag unverified">
                  <p>Unverified</p>
                </div>
              )}
              <h1>
                <span className="domain">{router.query.domain}</span>
              </h1>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ marginRight: "0.5rem" }}>a domain owned by</p>
                <div className="user-content">
                  <img
                    src={domainOwner && domainOwner.profile_img}
                    alt="User profile image"
                  />
                  <p>{domainOwner && domainOwner.user_name}</p>
                </div>
              </div>
            </div>

            <h1 style={{ padding: "2rem 0" }}>swapped with</h1>

            <div>
              {domainInfo && domainInfo.swappedWith.domain_verified ? (
                <div className="tag verified">
                  <p>Verified</p>
                </div>
              ) : (
                <div className="tag unverified">
                  <p>Unverified</p>
                </div>
              )}
              <h1>
                <span className="domain">
                  {domainInfo.swappedWith.domain_name}
                </span>
              </h1>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ marginRight: "0.5rem" }}>a domain owned by</p>
                <div className="user-content">
                  <img
                    src={domainInfo.swappedWith.user_img}
                    alt="User profile image"
                  />
                  <p>{domainInfo.swappedWith.user_name}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="heading-info">
            {domainInfo.isVerified ? (
              <div className="tag verified">
                <p>Verified</p>
              </div>
            ) : (
              <div className="tag unverified">
                <p>Unverified</p>
              </div>
            )}
            <h1>
              Swap offers for
              <br />
              <span className="domain">{router.query.domain}</span>
            </h1>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <p style={{ marginRight: "0.5rem" }}>a domain owned by</p>
              <div className="user-content">
                <img
                  src={domainOwner && domainOwner.profile_img}
                  alt="User profile image"
                />
                <p>{domainOwner && domainOwner.user_name}</p>
              </div>
            </div>

            {isMe && (
              <button className="close" onClick={() => onOpenModal()}>
                Delete this domain
              </button>
            )}
          </div>
        )}

        {session &&
          session.user_id !== (domainInfo && domainInfo.user_id) &&
          !domainInfo.swappedWith && (
            <MakeAnOffer
              domains={domainsByCurrentUser}
              currentDomain={domainInfo}
            />
          )}

        {domainInfo && !domainInfo.swappedWith && (
          <OffersList
            isMe={isMe}
            offers={domainInfo && domainInfo.swapOffersReceived}
            parentDomainId={domainInfo._id}
          />
        )}

        <Footer />

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
            <h2>Are you sure you want to delete this domain?</h2>
            <p style={{ marginBottom: "1rem" }}>
              Deleting this domain will close the swap offer and remove all of
              the received swap offers as well. You will still be able to add
              the domain back in the future if you ever change your mind.
            </p>

            <div class="buttons">
              <button
                className="remove-btn"
                onClick={() => handleDomainDelete()}
              >
                Remove domain
              </button>
              <button className="close-btn" onClick={onCloseModal}>
                Close
              </button>
            </div>
          </ModalContainer>
        </ReactModal>
      </StyledContainer>
    </GALayout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let user = null;
  let localDomainInfo = null;
  let localDomainOwner = null;
  let domainsByCurrentUser = [];

  if (session) {
    // Fetch complete user info of logged in user
    const users = await axios
      .request({
        method: "GET",
        url: `${process.env.BACKEND_URL}/api/users/`,
        headers: { "Content-Type": "application/json" },
        data: {
          secret: process.env.BACKEND_SECRET,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    user = users.filter((user) => user.external_id === session.user_id);
    console.log("user", user);
  }

  // Fetching id of the domain
  await axios
    .request({
      method: "GET",
      url: `${process.env.BACKEND_URL}/api/domains/`,
      headers: { "Content-Type": "application/json" },
      data: {
        secret: process.env.BACKEND_SECRET,
      },
    })
    .then((res) => res.data)
    .then((domains) => {
      domains.map((domain) => {
        if (domain.user_id === (session && session.user_id))
          domainsByCurrentUser.push(domain);
      });

      return domains.filter((domain) => domain.name === context.query.domain);
    })
    .then(async (info) => {
      localDomainInfo = info;

      await axios
        .request({
          method: "POST",
          url: `${process.env.BACKEND_URL}/api/users/${info[0].user_id}`,
          headers: { "Content-Type": "application/json" },
          data: {
            secret: process.env.BACKEND_SECRET,
          },
        })
        .then((res) => res.data)
        .then((ownerInfo) => {
          localDomainOwner = ownerInfo;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

  return {
    props: {
      session,
      userInfo: session ? user[0] : null,
      domainInfo: localDomainInfo && localDomainInfo[0],
      domainOwner: localDomainOwner && localDomainOwner[0],
      domainsByCurrentUser,
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

  .remove-btn {
    background-color: #ec6559;
    border: 2px solid #ec6559;
  }

  .buttons {
    display: grid;
    grid-auto-columns: auto;
    grid-gap: 0.5rem;
  }

  .close-btn {
    background: none;
    border: 2px solid #5c45ff;
    color: #5c45ff;
  }

  button {
    width: 100%;
    padding: 0.5rem;
  }
`;

const StyledContainer = styled(Container)`
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

  .heading-info {
    margin: 6rem 0 3rem 0;
    text-align: center;
  }

  .domain {
    font-size: 2.5rem;
  }

  .close {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;

    color: #ec6559;
    border: 2px solid #ec6559;
    background: none;
    /* border-radius: 50rem; */
  }

  .user-content {
    display: flex;
    align-items: center;
  }
`;

export default Domain;
