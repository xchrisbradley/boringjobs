import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      prompt: "login",
      scope: "openid profile email offline_access",
    },
    returnTo: "/",
  }),
  signup: handleLogin({
    authorizationParams: {
      prompt: "login",
      screen_hint: "signup",
      scope: "openid profile email offline_access",
    },
    returnTo: "/",
  }),
});