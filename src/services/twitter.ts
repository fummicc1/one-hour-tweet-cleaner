import { TwitterApi, TweetV2 } from "twitter-api-v2";
import {
  accessToken,
  accessTokenSecret,
  appKey,
  appKeySecret,
} from "../config";

const client: TwitterApi = new TwitterApi({
  appKey: appKey,
  appSecret: appKeySecret,
  accessToken: accessToken,
  accessSecret: accessTokenSecret,
});

export const configureTwitterClient = async () => {
  await client.appLogin();
};

export const observeTweet = async (
  userName: string,
  onTweet: (tweet: TweetV2) => Promise<void>
) => {
  const user = await client.v2.userByUsername(userName);
  const userId = user.data.id;
  console.log(userId);
  const streams = await client.v2.userTimeline(userId);
  const allTweets = await Promise.all(streams);
  for (const tweet of allTweets) {
    console.log(tweet);
    onTweet(tweet);
  }
};

export const deleteTweet = async (tweet: TweetV2) => {
  await client.v2.deleteTweet(tweet.id);
};
