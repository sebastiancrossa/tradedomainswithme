// Libraries
import Head from "next/head";
import axios from "axios";
import styled from "styled-components";
import { signIn, signOut, getSession } from "next-auth/client";

// Component imports
import GALayout from "../components/layout/GALayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SwapsList from "../components/containers/SwapsList";
import { Container } from "../styles";

const AllDomains = ({ session, userInfo, domains }) => {
  return (
    <GALayout>
      <Head>
        <title>All open swap offers</title>
      </Head>

      <StyledContainer>
        <Navbar
          session={session}
          user={userInfo && userInfo.user_name}
          signIn={signIn}
          signOut={signOut}
        />

        <div className="content">
          <h1>All open swap offers</h1>
          <SwapsList domains={domains} noHeader />
        </div>
        <Footer />
      </StyledContainer>
    </GALayout>
  );
};

export async function getServerSideProps(context) {
  let unswappedDomains = [];

  // ! code from below is a bit too repetitive since I dont really manage state
  // ! should work on refactoring this soon
  // Fetch all domains
  await axios
    .request({
      method: "GET",
      url: `${process.env.BACKEND_URL}/api/domains`,
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
      },
    })
    .then((res) => res.data)
    .then((fetchedDomains) => {
      // Make sure to only grab those domains that have not been swapped yet
      fetchedDomains.map((domain) => {
        if (!domain.swappedWith) {
          unswappedDomains.push(domain);
        }
      });
    });

  // Make sure verified unswapped domains go first
  // ! snippet take from /pages/index.js file, refactor when possible
  let verifiedDomains = unswappedDomains.filter(
    (domain) => domain.isVerified === true
  );
  let unverifiedDomains = unswappedDomains.filter(
    (domain) => domain.isVerified === false
  );
  unswappedDomains = [...verifiedDomains, ...unverifiedDomains];

  return {
    props: {
      domains: unswappedDomains,
    },
  };
}

const StyledContainer = styled(Container)`
  .content {
    margin-top: 2rem;

    h1 {
      margin-bottom: 1rem;
    }
  }
`;

export default AllDomains;
