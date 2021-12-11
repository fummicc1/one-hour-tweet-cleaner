import { appKey, appKeySecret, callbackURL } from "../config";
import { Tweet, TweetResponse, UserResponse } from "../requests";
import { OAuth } from "oauth";
import open from "open";

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
      if (err) {
        console.error(err);
        return;
      }
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

export const checkTweet = async (
  userName: string,
  onTweet: (tweet: Tweet) => Promise<void>
) => {
  oauth.get(
    `https://api.twitter.com/2/users/by?usernames=${userName}`,
    accessToken,
    accessTokenSecret,
    (e, data, res) => {
      if (e) {
        console.error(e);
        return;
      }
      console.log("data", data);
      const response: UserResponse = unwrapResponse(data);
      console.info("UserResponse", response);
      const id = response.data[0].id;
      console.info("User Id", id);
      oauth.get(
        `https://api.twitter.com/2/users/${id}/tweets`,
        accessToken,
        accessTokenSecret,
        (e, data, res) => {
          if (e) {
            console.error(e);
            return;
          }

          const response: TweetResponse = unwrapResponse(data);
          for (const tweet of response.data) {
            onTweet(tweet);
          }
        }
      );
    }
  );
};

const unwrapResponse = <Response>(
  data: string | Buffer | undefined
): Response => {
  if (typeof data !== "string") {
    console.error("Invalid data", data);
    throw new Error("Invalid Data");
  }
  return JSON.parse(data);
};

export const deleteTweet = async (tweet: Tweet) => {
  oauth.delete(
    `https://api.twitter.com/2/tweets/${tweet.id}`,
    accessToken,
    accessTokenSecret,
    (e, data, res) => {
      if (e) {
        console.error("Error", e);
        return;
      }
      console.log("Success Deleting tweet");
    }
  );
};
