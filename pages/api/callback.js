import { auth0 } from "tools";

export const callback = async (req, res) => {
  try {
    await auth0.handleCallback(req, res, { redirectTo: "/" });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};
