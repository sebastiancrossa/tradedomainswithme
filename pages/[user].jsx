// Libraries
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, getSession } from "next-auth/client";
import Head from "next/head";
import axios from "axios";

import ReactModal from "react-modal";
import toast from "react-hot-toast";

// Component imports
import GALayout from "../components/layout/GALayout";
import { ModalContainer, StyledContainer } from "../styles/pages/user.style";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TradeCard from "../components/ui/TradeCard";
import SwappedCard from "../components/ui/SwappedCard";
import { AiOutlineTwitter } from "react-icons/ai";

const isValidDomain = require("is-valid-domain");

const verifySuccess = () => toast.success("Your domain has been verified!");

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const User = ({ session, initialDomains, userInfo }) => {
  const router = useRouter();
  const [randNum, setRandNum] = useState(getRandomNumber(999999));
  const [isOpen, setIsOpen] = useState(false);

  // Domain-related state
  // ! this logic is ugly af, refactor once everything is working
  const [domains, setDomains] = useState(initialDomains);
  const [verifiedDomains, setVerifiedDomains] = useState([]);
  const [unverifiedDomains, setUnverifiedDomains] = useState([]);
  const [unswappedDomains, setUnswappedDomains] = useState([]);
  const [swappedDomains, setSwappedDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  // ----

  const isMe = session ? session.user_id === userInfo.external_id : false;

  // useEffect(() => {
  //   const imgReq = new Request(userInfo.profile_img);
  //   fetch(imgReq).then(
  //     (res) => res.status === 404 && delete userInfo.profile_img
  //   );
  // }, []);

  useEffect(() => {
    let verifiedDomains = domains.filter(
      (domain) => domain.isVerified === true
    );
    let unverifiedDomains = domains.filter(
      (domain) => domain.isVerified === false
    );
    let swappedDomains = domains.filter((domain) => domain.swappedWith);
    let unswappedDomains = domains.filter((domain) => !domain.swappedWith);

    setVerifiedDomains(verifiedDomains);
    setUnverifiedDomains(unverifiedDomains);
    setSwappedDomains(swappedDomains);
    setUnswappedDomains(unswappedDomains);
  }, [domains]);

  const handleDomainAdd = async () => {
    // Creating the new domain
    // TODO: Do some server side protection as well
    let createdDomain = await axios
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

    setDomains((prevState) => [...prevState, createdDomain]);

    // Close the modal
    setIsOpen(false);
  };

  const handleDomainVerify = async (domainName, domainId) => {
    const verifyPromise = axios.request({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/domains/verify/${domainId}`,
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
      },
    });

    toast.promise(verifyPromise, {
      loading: `Verifying ${domainName}...`,
      success: `${domainName} is verified!`,
      error: `Error while veryfing ${domainName}, try again.`,
    });
  };

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  // ! refactor this asap, as it's repeated in the tradecard component too
  const placeholderImg =
    "https://st3.depositphotos.com/1767687/16607/v/380/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg";

  return (
    <GALayout>
      <Head>
        <title>{router.query.user} | tradedomainswith.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledContainer>
        <Navbar
          session={session}
          user={userInfo && userInfo.user_name}
          signIn={signIn}
          signOut={signOut}
        />

        <div className="user-container">
          <div>
            <img
              src={userInfo.profile_img ? userInfo.profile_img : placeholderImg}
              alt={`Profile picture for ${userInfo.display_name} (@${userInfo.user_name})`}
            />
            <h1>{userInfo.display_name}</h1>
            <a
              href={`https://twitter.com/${userInfo.user_name}`}
              target="_blank"
            >
              <AiOutlineTwitter
                size={25}
                color="#2b99e6"
                style={{ marginRight: "0.3rem" }}
              />
              <p>@{userInfo.user_name}</p>
            </a>
          </div>
        </div>

        {isMe && (
          <button className="add-btn" onClick={onOpenModal}>
            Add a domain
          </button>
        )}

        <div className="user-stats">
          <div className="open">{unswappedDomains.length} open swap offers</div>
          <div className="traded">{swappedDomains.length} domains swaped</div>
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
                tradedomainswithme-{randNum}-[your domain here]
              </span>
              (e.g. tradedomainswithme-999000-potentialfor.business). Once that
              is added, keep refreshing until we are able to verify that you are
              the owner of that domain!
            </p>

            <div className="unverified-domains">
              {unverifiedDomains.map(
                (domain) =>
                  !domain.swappedWith && (
                    <div className="unverified-domain">
                      <p>{domain.name}</p>
                      <button
                        onClick={() =>
                          handleDomainVerify(domain.name, domain._id)
                        }
                      >
                        Check verification
                      </button>
                    </div>
                  )
              )}
            </div>
          </section>
        )}

        <section>
          {/* <h2>Open swap offers from this user</h2> */}
          <h2>{isMe ? "Your open swap offers" : "Open swap offers"}</h2>

          {unswappedDomains.length == 0 ? (
            <p>No current domains offers just yet!</p>
          ) : (
            <div className="offers-list">
              {unswappedDomains.map((unswappedDomain) => (
                <TradeCard domain={unswappedDomain} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2>{isMe ? "Your swap history" : "Swap history"}</h2>

          {swappedDomains.length == 0 ? (
            <p>No swaps done just yet!</p>
          ) : (
            <div className="swapped-list">
              {swappedDomains.map((swappedDomain) => (
                <SwappedCard domain={swappedDomain} user={userInfo} />
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
            <h2>Add a new domain</h2>
            <input
              type="text"
              placeholder="example.com"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
            />
            <button
              onClick={() => handleDomainAdd()}
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
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Fetch complete user info
  const users = await axios
    .request({
      method: "GET",
      url: `${process.env.BACKEND_URL}/api/users/`,
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log("error while fetching user", err));

  const user = users.filter(
    (user) => user.user_name.toLowerCase() === context.query.user.toLowerCase()
  );

  // Fetch domains from user
  const domains = await axios
    .request({
      method: "GET",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
      },
      url: `${process.env.BACKEND_URL}/api/domains/${user[0].external_id}`,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  // check if the img has a response status of anything but 4xx
  // if it does, delete it from object
  // (make sure we already have user available to us)
  if (user) {
    const imgReq = new Request(user[0].profile_img);
    await fetch(imgReq).then(
      (res) => res.status === 404 && delete user[0].profile_img
    );
  }

  return {
    props: {
      session,
      initialDomains: domains,
      userInfo: user[0],
    },
  };
}

export default User;
