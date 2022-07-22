// export const HOST_NAME = "192.168.1.78";
// export const HOST_NAME = "localhost";
export const HOST_NAME = "uspy.in";
// export const HOST_NAME = "34.126.219.211";

// Api
export const TOKEN_API = "http://" + HOST_NAME + ":8000/api/token/";
export const REFRESH_TOKEN_API =
  "http://" + HOST_NAME + ":8000/api/token/refresh/";
export const SIGN_UP_API = "http://" + HOST_NAME + ":8000/api/signup/";
export const LOGIN_API = "http://" + HOST_NAME + ":8000/api/login/";
export const PROFILE_API = "http://" + HOST_NAME + ":8000/api/profile/";

export const CHANGE_PASSWORD_API =
  "http://" + HOST_NAME + ":8000/api/change_password/";
export const USER_SEARCH = "http://" + HOST_NAME + ":8000/api/user?search=";

// PARENT
export const GET_PARENTS = "http://" + HOST_NAME + ":8000/api/user/parent/";
export const ADD_PARENTS_REQUEST =
  "http://" + HOST_NAME + ":8000/api/user/parent/add_request/";
export const REMOVE_REQUESTED_PARENT =
  "http://" + HOST_NAME + ":8000/api/user/parent/delete_requested/";
export const REMOVE_PARENT_REQUEST =
  "http://" + HOST_NAME + ":8000/api/user/parent/delete_request/";
export const REMOVE_CONFIRMED_PARENT =
  "http://" + HOST_NAME + ":8000/api/user/parent/delete_confirmed/";
export const ACCEPT_PARENT_REQUEST =
  "http://" + HOST_NAME + ":8000/api/user/parent/confirm_request/";

// CHILDREN
export const GET_CHILDREN = "http://" + HOST_NAME + ":8000/api/user/children/";
export const ADD_CHILDREN_REQUEST =
  "http://" + HOST_NAME + ":8000/api/user/children/add_request/";
export const REMOVE_REQUESTED_CHILDREN =
  "http://" + HOST_NAME + ":8000/api/user/children/delete_requested/";
export const REMOVE_CHILDREN_REQUEST =
  "http://" + HOST_NAME + ":8000/api/user/children/delete_request/";
export const REMOVE_CONFIRMED_CHILDREN =
  "http://" + HOST_NAME + ":8000/api/user/children/delete_confirmed/";
export const ACCEPT_CHILDREN_REQUEST =
  "http://" + HOST_NAME + ":8000/api/user/children/confirm_request/";

export const CALL_LOG_API = "http://" + HOST_NAME + ":8000/api/call_log/";
export const CALL_LOG_CHILD_API =
  "http://" + HOST_NAME + ":8000/api/call_log/children/";

export const MESSAGE_API = "http://" + HOST_NAME + ":8000/api/message/";
export const MESSAGE_CHILD_API =
  "http://" + HOST_NAME + ":8000/api/message/children/";

// Constants
export const PARENT_REQUESTS = "requests";
export const PARENT_REQUESTED = "requested";
export const PARENT_CONFIRMED = "confirmed";
export const CHILDREN_REQUESTS = "requests";
export const CHILDREN_REQUESTED = "requested";
export const CHILDREN_CONFIRMED = "confirmed";
