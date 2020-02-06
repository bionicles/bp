import Router from "next/router";
import cookie from "js-cookie";

export const signIn = ({ token }) => {
  cookie.set("token", token, { expires: 1 });
  Router.push("/me");
};

export const signOut = () => {
  cookie.remove("token");
  // log out from all windows
  window.localStorage.setItem("signout", Date.now());
  Router.push("/auth/signin");
};
