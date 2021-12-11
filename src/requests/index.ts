export interface RequestTokenResponse {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: string;
}

export interface AuthorizeCallbackData {
  oauth_token: string;
}

export interface AccessTokenResponse {
  oauth_token: string;
  oauth_token_secret: string;
}

export interface UserResponse {
  id: string;
}

export interface Tweet {
  id: string;
  text: string;
}
