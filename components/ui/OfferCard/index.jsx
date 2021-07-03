import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import ReactModal from "react-modal";
import { BiCheck } from "react-icons/bi";
import { AiOutlineTwitter } from "react-icons/ai";
import { ModalContainer, Container, Background } from "./offerCard.style";

const OfferCard = ({ isMe, userImg, userName, domainId, parentDomainId }) => {
  const router = useRouter();
  const [domainInfo, setDomainInfo] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const fetchInfo = async () => {
    await axios
      .request({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/domains/`,
        headers: {
          Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
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

  const handleDomainSwap = async () => {
    await axios
      .request({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/domains/swap/${parentDomainId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
        },
        data: {
          swapWithDomainId: domainId,
        },
      })
      .then((res) => res.data)
      .then(() => router.reload())
      .catch((err) => console.log(err));

    router.reload();
    setIsOpen(false);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

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
          <button className="success" onClick={() => setIsOpen(true)}>
            <BiCheck
              size={25}
              style={{ stroke: "white", marginRight: "0.5rem" }}
            />
            <p>Mark as swapped</p>
          </button>
        </div>
      )}

      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
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
          <h2>Are you sure you want to mark this domain as swapped?</h2>
          <p style={{ marginBottom: "1rem" }}>
            Keep in mind that you should only mark this domain as swapped if you
            have already swapped the domain with the other user! If you have,
            congrats and go ahead and mark this as swapped :)
          </p>

          <button onClick={() => handleDomainSwap()}>
            Mark domain as swapped
          </button>
        </ModalContainer>
      </ReactModal>
    </Container>
  );
};

export default OfferCard;
