import * as express from "express";
import { oneHour, timelineUserName } from "./cosntants";
import { dispatch } from "./services/dispatch";
import {
  configureTwitterClient,
  deleteTweet,
  observeTweet,
} from "./services/twitter";

const app = express.default();

app.use(express.json());

const main = async () => {
  await configureTwitterClient();
  await observeTweet(timelineUserName, async (tweet) => {
    const shouldDelete = tweet.text.startsWith("[auto-delete]");
    if (shouldDelete) {
      console.log("auto-delete");
      await deleteTweet(tweet);
      console.log("OK");
    }
  });
};

main();
