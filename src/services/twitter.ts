import axios from "axios";
import { appKey, callbackURL } from "../config";
import { AccessTokenResponse, RequestTokenResponse, Tweet } from "../requests";

const client = axios.create({
  baseURL: "https://api.twitter.com",
});

let oauthToken = "";
let oauthTokenSecret = "";

export const startConfigureTwitterClient = async () => {
  const requestTokenResponse = await client.post<RequestTokenResponse>(
    "/oauth/request_token",
    {
      oauth_callback: callbackURL,
      oauth_consumer_key: appKey,
    }
  );
  oauthToken = requestTokenResponse.data.oauth_token;
  oauthTokenSecret = requestTokenResponse.data.oauth_token_secret;
  await client.get("/oauth/authorize");
};

export const checkOauth = (oauth: string): boolean => {
  return oauth === oauthToken;
};

export const setupAccessToken = async (verifier: string) => {
  const response = await client.post<AccessTokenResponse>(
    "/oauth/access_token",
    {
      oauth_consumer_key: appKey,
      oauth_token: oauthToken,
      oauth_verifier: verifier,
    }
  );
  const data = response.data;
  await client.post("/statuses/update.json", {
    oauth_consumer_key: appKey,
    oauth_token: data.oauth_token,
  });
};

export const observeTweet = async (
  userName: string,
  onTweet: (tweet: Tweet) => Promise<void>
) => {};

export const deleteTweet = async (tweet: Tweet) => {};
