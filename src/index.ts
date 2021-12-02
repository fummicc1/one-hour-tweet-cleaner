import * as express from "express";
import { oneHour, timelineUserName } from "./cosntants";
import { onCallback } from "./routes/route";
import { dispatch } from "./services/dispatch";
import {
  startConfigureTwitterClient,
  deleteTweet,
  observeTweet,
} from "./services/twitter";

const app = express.default();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/callback", async (req, res) => {
  await onCallback(req, res);
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});

const main = async () => {
  await startConfigureTwitterClient();
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
