import { TwitterApiTokens } from "twitter-api-v2";
import * as dotenv from "dotenv";

dotenv.config();

export const oauthBearer = process.env.TWITTER_OAUTH_BEARER!;
export const appKey = process.env.TWITTER_API_KEY!;
export const appKeySecret = process.env.TWITTER_API_KEY_SECRET!;
