import * as dotenv from "dotenv";

dotenv.config();

export const appKey = process.env.TWITTER_API_KEY!;
export const appKeySecret = process.env.TWITTER_API_KEY_SECRET!;
export const defaultAccessToken = process.env.TWITTER_ACCESS_TOKEN ?? "";
export const defaultAccessTokenSecret =
  process.env.TWITTER_ACCESS_TOKEN_SECRET ?? "";
export const callbackURL = process.env.CALLBACK_URL!;
export const PORT = process.env.PORT || 3000;
