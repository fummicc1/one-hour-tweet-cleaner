import * as express from "express";
import { PORT } from "./config";
import { timelineUserName } from "./cosntants";
import { onCallback } from "./routes/route";
import {
  startConfigureTwitterClient,
  deleteTweet,
  checkTweet,
} from "./services/twitter";

const app = express.default();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/twitter/callback", async (req, res) => {
  await onCallback(req, res);
});

app.get("/twitter/check", async (req, res) => {
  await checkTweet(timelineUserName, async (tweet) => {
    console.log("onTweet", tweet);
    const shouldDelete = tweet.text.endsWith("...");
    if (shouldDelete) {
      console.log("auto-delete");
      await deleteTweet(tweet);
      console.log("OK");
    }
  });
  res.status(200).send("OK");
});

app.get("/twitter/configure", async (req, res) => {
  await startConfigureTwitterClient();
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log("Server is running on 3000");
});
