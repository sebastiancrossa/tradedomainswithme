import Link from "next/link";
import { Background } from "./swappedCard.style";

const SwappedCard = ({ domain, user }) => {
  if (user) {
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
  } else {
    return <p>Loading...</p>;
  }
};

export default SwappedCard;
