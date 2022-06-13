// export const HOST_NAME = "192.168.1.78";
export const HOST_NAME = "localhost";
// export const HOST_NAME = "34.93.100.128";

// Api
export const TOKEN_API = "http://" + HOST_NAME + ":8000/api/token/";
export const REFRESH_TOKEN_API =
  "http://" + HOST_NAME + ":8000/api/token/refresh/";
export const SIGN_UP_API = "http://" + HOST_NAME + ":8000/api/signup/";
export const LOGIN_API = "http://" + HOST_NAME + ":8000/api/login/";
export const PROFILE_API = "http://" + HOST_NAME + ":8000/api/profile/";
export const CALL_LOG_API = "http://" + HOST_NAME + ":8000/api/call_log/";
export const MESSAGE_API = "http://" + HOST_NAME + ":8000/api/message/";
export const CHANGE_PASSWORD_API =
  "http://" + HOST_NAME + ":8000/api/change_password/";

// Constants
export const PARENT_REQUESTS = "requests";
export const PARENT_REQUESTED = "requested";
export const PARENT_CONFIRMED = "confirmed";
export const CHILDREN_REQUESTS = "requests";
export const CHILDREN_REQUESTED = "requested";
export const CHILDREN_CONFIRMED = "confirmed";
