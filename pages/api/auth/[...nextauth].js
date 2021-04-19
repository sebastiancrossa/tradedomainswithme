import NextAuth from "next-auth";
import Providers from "next-auth/providers";

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

      // console.log(user);
      // console.log(account);
      // console.log(profile);

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
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      return true;
    },
  },
  database: process.env.DATABASE_URL,
});
