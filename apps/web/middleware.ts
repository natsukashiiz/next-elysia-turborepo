import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware() {},
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
  }
);

export const config = { matcher: ["/protected"] };
