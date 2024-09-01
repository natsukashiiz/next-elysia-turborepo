import cors from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";

const app = new Elysia()
  .use(cors())
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
      exp: "1m",
    })
  )
  .get("/", () => "Hello Elysia :)")
  .get(
    "/hello/:name",
    ({ params: { name } }) => {
      return `Hello ${name} ✨`;
    },
    {
      params: t.Object({ name: t.String({ minLength: 1 }) }),
    }
  )
  .group("auth", (auth) =>
    auth.post(
      "/login",
      async ({ body: { name, password }, jwt, set }) => {
        if (name !== "vv12" || password !== "1234") {
          set.status = 401;
          return {
            message: "Invalid credentials",
          };
        }

        const token = await jwt.sign({ name });

        return {
          result: {
            token,
            user: {
              id: 1,
              name,
            },
          },
          message: "Login successfully",
        };
      },
      {
        body: t.Object({
          name: t.String({ minLength: 2 }),
          password: t.String({ minLength: 4 }),
        }),
        response: t.Object({
          result: t.Optional(
            t.Object({
              token: t.String(),
              user: t.Object({
                id: t.Number(),
                name: t.String(),
              }),
            })
          ),
          message: t.String(),
        }),
      }
    )
  )
  .listen(9000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
