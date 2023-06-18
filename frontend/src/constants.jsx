// export const HOST_NAME = "192.168.1.78";
export const PORT = "8000";
// export const HOST_NAME = "localhost";
// export const HOST_NAME = "34.131.95.131";
// export const HOST_NAME = "34.126.219.211";

// Api
const HTTP_PROTOCOL = "http://";
const HOST_NAME = "api.uspy.local";
export const BASE_URL = HTTP_PROTOCOL + HOST_NAME;

export const TOKEN_API = BASE_URL + "/token/";
export const REFRESH_TOKEN_API = BASE_URL + "/token/refresh/";
export const SIGN_UP_API = BASE_URL + "/signup/";
export const LOGIN_API = BASE_URL + "/login/";
export const PROFILE_API = BASE_URL + "/profile/";

export const CHANGE_PASSWORD_API = BASE_URL + "/change_password/";
export const USER_SEARCH = BASE_URL + "/user?search=";

// PARENT
export const GET_PARENT_API = BASE_URL + "/user/parent/";
export const PARENT_REQUEST_API = BASE_URL + "/user/parent/request/";
export const PARENT_PENDING_API = BASE_URL + "/user/parent/pending/";
export const PARENT_CONFIRMED_API = BASE_URL + "/user/parent/confirmed/";

// CHILDREN
export const GET_CHILDREN_API = BASE_URL + "/user/children/";
export const CHILDREN_REQUEST_API = BASE_URL + "/user/children/request/";
export const CHILDREN_PENDING_API = BASE_URL + "/user/children/pending/";
export const CHILDREN_CONFIRMED_API = BASE_URL + "/user/children/confirmed/";

export const CALL_LOG_API = BASE_URL + "/call_log/";
export const CALL_LOG_CHILD_API = BASE_URL + "/call_log/children/";

export const MESSAGE_API = BASE_URL + "/message/";
export const MESSAGE_CHILD_API = BASE_URL + "/message/children/";

export const CONTACT_US_API = BASE_URL + "/contact-us/";

export const RESET_PASSWORD_API = BASE_URL + "/accounts/password_reset";
export const CONFIRM_RESET_PASSWORD_API =
  BASE_URL + "/accounts/password_reset/confirm/";

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
export const RESET_PASSWORD = "/password-reset";
export const SIGN_UP_URL = "/signup";
