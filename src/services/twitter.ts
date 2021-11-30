import open from "open";
import { TwitterApi, TweetV2, TwitterApiReadWrite } from "twitter-api-v2";
import { appKey, appKeySecret, oauthBearer } from "../config";
import { callback } from "../cosntants";

let client: TwitterApi;

export const configureTwitterClient = async () => {
  const consumerClient: TwitterApiReadWrite = new TwitterApi({
    appKey: appKey,
    appSecret: appKeySecret,
  });
  const callbackResponse = await consumerClient.generateAuthLink(callback, {
    linkMode: "authorize",
  });
  const tempClient = new TwitterApi({
    appKey: appKey,
    appSecret: appKeySecret,
    accessToken: callbackResponse.oauth_token,
    accessSecret: callbackResponse.oauth_token_secret,
  });
  const { accessToken, accessSecret } = await tempClient.login(oauthBearer);
  client = new TwitterApi({
    appKey: appKey,
    appSecret: appKeySecret,
    accessToken: accessToken,
    accessSecret: accessSecret,
  });
};

export const observeTweet = async (
  userName: string,
  onTweet: (tweet: TweetV2) => Promise<void>
) => {
  const user = await client.v2.userByUsername(userName);
  const userId = user.data.id;
  const streams = await client.v2.userTimeline(userId);
  const allTweets = await Promise.all(streams);
  for (const tweet of allTweets) {
    onTweet(tweet);
  }
};

export const deleteTweet = async (tweet: TweetV2) => {
  await client.v2.deleteTweet(tweet.id);
};
