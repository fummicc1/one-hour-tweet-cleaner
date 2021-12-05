import axios from "axios";
import { appKey, appKeySecret, callbackURL } from "../config";
import { AccessTokenResponse, RequestTokenResponse, Tweet } from "../requests";
import { OAuth } from "oauth";
import open from "open";

const client = axios.create({
  baseURL: "https://api.twitter.com",
});
let accessToken = "";
let accessTokenSecret = "";

const oauth = new OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  appKey,
  appKeySecret,
  "1.0A",
  callbackURL,
  "HMAC-SHA1"
);

let oauthToken = "";
let oauthTokenSecret = "";

export const startConfigureTwitterClient = async () => {
  oauth.getOAuthRequestToken(
    (err, _oauthToken, _oauthTokenSecret, parseQueryString) => {
      oauthToken = _oauthToken;
      oauthTokenSecret = _oauthTokenSecret;
      open(`https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`);
    }
  );
};

export const checkOauth = (oauth: string): boolean => {
  return oauth === oauthToken;
};

export const setupAccessToken = async (verifier: string) => {
  oauth.getOAuthAccessToken(
    oauthToken,
    oauthTokenSecret,
    verifier,
    (err, _token, _tokenSecret, parseQueryString) => {
      accessToken = _token;
      accessTokenSecret = _tokenSecret;
    }
  );
};

export const observeTweet = async (
  userName: string,
  onTweet: (tweet: Tweet) => Promise<void>
) => {};

export const deleteTweet = async (tweet: Tweet) => {};
