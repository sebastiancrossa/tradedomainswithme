import Link from "next/link";
import styled from "styled-components";
import { GiExitDoor } from "react-icons/gi";

const Navbar = ({ session, user, signIn, signOut }) => {
  return (
    <Background>
      <Link href="/" passHref>
        <a style={{ color: "black" }}>
          <h1>tradedomainswith.me</h1>
        </a>
      </Link>
      {!session && (
        <button className="sign-in" onClick={() => signIn()}>
          Sign in
        </button>
      )}
      {session && (
        <div className="profile-info">
          <Link href={`/${user}`} passHref>
            <a style={{ color: "black" }}>
              <div className="user-info">
                <img src={session.user.image} alt="User profile image" />
                <p>{session.user.name}</p>
              </div>
            </a>
          </Link>
          <button onClick={() => signOut()}>
            <GiExitDoor />
            <p>Sign out</p>
          </button>
        </div>
      )}
    </Background>
  );
};

const Background = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 0.5rem;

  font-weight: 600;

  img {
    width: 2rem;
    height: auto;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .sign-in {
    padding: 0.3rem 1rem;
    border-radius: 50rem;
  }

  .profile-info {
    display: flex;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      margin-left: 1rem;
      padding: 0.3rem 1rem;

      border-radius: 50rem;
      background-color: #ec6559;

      p {
        margin: 0;
      }
    }
  }

  .user-info {
    display: flex;
    align-items: center;
  }
`;

export default Navbar;
