import { PROFILE_API } from "./constants";

export const callAPI = async (props) => {
  if (Boolean(props.access_token)) {
    var bearer = "Bearer " + props.access_token;
    return await fetch(props.url, {
      method: props.method,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.body),
    });
  } else {
    return await fetch(props.url, {
      method: props.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.body),
    });
  }
};
