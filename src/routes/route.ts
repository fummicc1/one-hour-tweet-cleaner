import * as express from "express";
import { checkOauth, setupAccessToken } from "../services/twitter";

export const onCallback = async (
  req: express.Request,
  res: express.Response
) => {
  const oauthToken = req.query.oauth_token?.toString();
  const oauthVerifier = req.query.oauth_verifier?.toString();
  if (!oauthToken || !oauthVerifier) {
    return;
  }
  const isSame = checkOauth(oauthToken);
  console.log(isSame);
  await setupAccessToken(oauthVerifier);
  res.status(200).send("OK");
};
