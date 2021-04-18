import Link from "next/link";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Background>
      <Link href="/" passHref>
        <a style={{ color: "black" }}>
          <h1>tradedomainswithme</h1>
        </a>
      </Link>

      <Link href="/sebastiancrossa" passHref>
        <a style={{ color: "black" }}>
          <div className="user-info">
            <img
              src="https://avatars.githubusercontent.com/u/20131547?v=4"
              alt="User profile image"
            />
            <p>Sebastian Crossa</p>
          </div>
        </a>
      </Link>
    </Background>
  );
};

const Background = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 600;

  img {
    width: 2rem;
    height: auto;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .user-info {
    display: flex;
    align-items: center;
  }
`;

export default Navbar;
