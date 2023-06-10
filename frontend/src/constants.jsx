// export const HOST_NAME = "192.168.1.78";
// export const HOST_NAME = "localhost:8000";
export const HOST_NAME = "api.uspy.in";
// export const HOST_NAME = "34.126.219.211";
// export const PORT = "8000";
// Api
export const TOKEN_API = "http://" + HOST_NAME + "/token/";
export const REFRESH_TOKEN_API = "http://" + HOST_NAME + "/token/refresh/";
export const SIGN_UP_API = "http://" + HOST_NAME + "/signup/";
export const LOGIN_API = "http://" + HOST_NAME + "/login/";
export const PROFILE_API = "http://" + HOST_NAME + "/profile/";

export const CHANGE_PASSWORD_API = "http://" + HOST_NAME + "/change_password/";
export const USER_SEARCH = "http://" + HOST_NAME + "/user?search=";

// PARENT
export const GET_PARENT_API = "http://" + HOST_NAME + "/user/parent/";
export const PARENT_REQUEST_API =
  "http://" + HOST_NAME + "/user/parent/request/";
export const PARENT_PENDING_API =
  "http://" + HOST_NAME + "/user/parent/pending/";
export const PARENT_CONFIRMED_API =
  "http://" + HOST_NAME + "/user/parent/confirmed/";

// CHILDREN
export const GET_CHILDREN_API = "http://" + HOST_NAME + "/user/children/";
export const CHILDREN_REQUEST_API =
  "http://" + HOST_NAME + "/user/children/request/";
export const CHILDREN_PENDING_API =
  "http://" + HOST_NAME + "/user/children/pending/";
export const CHILDREN_CONFIRMED_API =
  "http://" + HOST_NAME + "/user/children/confirmed/";

export const CALL_LOG_API = "http://" + HOST_NAME + "/call_log/";
export const CALL_LOG_CHILD_API = "http://" + HOST_NAME + "/call_log/children/";

export const MESSAGE_API = "http://" + HOST_NAME + "/message/";
export const MESSAGE_CHILD_API = "http://" + HOST_NAME + "/message/children/";

export const CONTACT_US_API = "http://" + HOST_NAME + "/contact-us/";

// Constants
export const PARENT_REQUEST = "parent_request";
export const PARENT_PENDING = "parent_pending";
export const PARENT_CONFIRMED = "parent_confirmed";
export const CHILDREN_REQUEST = "children_request";
export const CHILDREN_PENDING = "children_pending";
export const CHILDREN_CONFIRMED = "children_confirmed";

// Pages
export const PROFILE_PAGE = "Profile";
export const CONTACT_US_PAGE = "Contact Us";
export const PRIVACY_POLICY_PAGE = "Privacy Policy";

// Menu Item
export const PROFILE_MENU = "Profile";
export const LOGOUT_MENU = "Logout";
export const CONTACT_US_MENU = "Contact Us";
export const PRIVACY_POLICY_MENU = "Privacy Policy";

// URLS
export const PROFILE_URL = "/profile";
export const CONTACT_US_URL = "/contact-us";
export const PRIVACY_POLICY_URL = "/privacy-policy";
export const MAIN_URL = "/";
export const HOME_URL = "/dashboard";
export const LOGIN_URL = "/login";
export const SIGN_UP_URL = "/signup";
