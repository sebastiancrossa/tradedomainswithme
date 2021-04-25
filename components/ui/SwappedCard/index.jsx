import Link from "next/link";
import styled from "styled-components";

const SwappedCard = ({ domain, user }) => {
  console.log("swapped card domain", domain);

  return (
    <Background>
      <Link href={`/${user.user_name}`} passHref>
        <a>
          <div className="user-info">
            <img
              src={user.profile_img}
              alt={`Profile image for Twitter user @${user.user_name}}`}
            />
            <p>@{user.user_name} swapped</p>
          </div>
        </a>
      </Link>

      <div>
        <div className="domain">
          {domain.isVerified ? (
            <div className="tag verified">Verified</div>
          ) : (
            <div className="tag unverified">Unverified</div>
          )}

          <p>{domain && domain.name}</p>
        </div>
        <p id="unaligned-circle">for</p>
        <div className="domain">
          {domain.swappedWith.domain_verified ? (
            <div className="tag verified">Verified</div>
          ) : (
            <div className="tag unverified">Unverified</div>
          )}

          <p>{domain.swappedWith && domain.swappedWith.domain_name}</p>
        </div>
      </div>

      <Link href={`/${domain.swappedWith.user_name}`} passHref>
        <a>
          <div className="swapped-user">
            <p>with</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={domain.swappedWith.user_img}
                alt={`Profile image for Twitter user @${domain.swappedWith.user_name}}`}
              />
              <p>@{domain.swappedWith.user_name}</p>
            </div>
          </div>
        </a>
      </Link>
    </Background>
  );
};

const Background = styled.div`
  /* TODO: all this info is pretty similar to what is being done on the TradeCard component, so abstract these styles in the future */
  img {
    width: 2rem;
    height: auto;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  #unaligned-circle {
    position: relative;
    z-index: 2;

    background-color: white;
    border-radius: 50rem;
    padding: 0.5rem;
    width: fit-content;

    margin: -2rem auto -0.6rem auto;
    z-index: 1;
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

  .swapped-user {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    font-size: 1.1rem;
    font-weight: 600;
    color: black;

    p {
      margin-right: 1rem;
    }
  }

  .user-info {
    display: flex;
    align-items: center;

    font-size: 1.1rem;
    font-weight: 600;
    color: black;

    margin: 0 auto 0.5rem auto;
  }

  .domain {
    position: relative;
    z-index: -1;

    background-color: #f9f8f4;
    padding: 2rem;

    margin-bottom: 1rem;

    text-align: center;
    font-size: 1.2rem;

    border-radius: 5px;
  }
`;

export default SwappedCard;
