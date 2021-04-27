import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session(session, token) {
      session.user_id = token.id;

      // If the user id from the already added user to the usersInfo collection is
      // different to the one given to us by next-auth, send a PATCH request and change
      // the domain
      const users = await axios
        .request({
          method: "GET",
          url: `${process.env.BACKEND_URL}/api/users/`,
          headers: {
            Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));

      const user = users.filter((user) => user.email === session.user.email);

      if (user._id !== token.id) {
        fetch(`${process.env.BACKEND_URL}/api/users/${user[0]._id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
          },
          body: JSON.stringify({
            newId: token.id,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log(err));
      }

      return session;
    },
    async signIn(user, account, profile) {
      // console.log("user from signIn", user);
      // console.log("account from signIn", account);
      // console.log("profile from signIn", account);

      // Create/login the user a user through the node server
      fetch(`${process.env.BACKEND_URL}/api/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_BACKEND_SECRET,
        },
        body: JSON.stringify({
          id: user.id,
          email: user.email,
          display_name: profile.name,
          user_name: profile.screen_name,
          profile_img: user.image,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          // console.log("logged user", data);
          // if (data._id !== user.id) {
          //   await fetch(`${process.env.BACKEND_URL}/api/users/${data._id}`, {
          //     method: "put",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({
          //       secret: process.env.BACKEND_SECRET,
          //       newId: user.id,
          //     }),
          //   })
          //     .then((res) => res.json())
          //     .catch((err) => console.log(err));
          // }
        })
        .catch((err) => console.log(err));

      return true;
    },
  },
  database: process.env.DATABASE_URL,
});
