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
      // console.log("session from next auth", session);
      // console.log("token from next auth", token);

      // If the user id from the already added user to the usersInfo collection is
      // different to the one given to us by next-auth, send a PATCH request and change
      // the domain
      const users = await axios
        .request({
          method: "GET",
          url: "http://localhost:5000/api/users/",
          headers: { "Content-Type": "application/json" },
          data: {
            secret: "q+pXtJSG#JDN37HsE@,",
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));

      const user = users.filter((user) => user.email === session.user.email);

      // console.log("users", users);
      // console.log("session", session);
      // console.log("user", user);

      if (user._id !== token.id) {
        fetch(`http://localhost:5000/api/users/${user[0]._id}`, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: "q+pXtJSG#JDN37HsE@,",
            newId: token.id,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log(err));
      }

      // let newSession = {
      //   ...session,
      //   test: "Test",
      // };

      // session.test = "this is a test";

      // console.log("token", token);
      // console.log("session", session);

      return session;
    },
    async signIn(user, account, profile) {
      // console.log("user id", user.id);
      // user.user_name = profile.screen_name;

      // console.log("user from next auth", user);
      // console.log("account from next auth", account);
      // console.log("profile from next auth", profile);

      // Create/login the user a user through the node server
      fetch("http://localhost:5000/api/users", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: "q+pXtJSG#JDN37HsE@,",
          id: user.id,
          email: user.email,
          display_name: profile.name,
          user_name: profile.screen_name,
          profile_img: user.image,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("logged user", data))
        .catch((err) => console.log(err));

      return true;
    },
  },
  database: process.env.DATABASE_URL,
});
