import { PROFILE_API } from "./constants";

export const callAPI = async (props) => {
  var bearer = "Bearer " + props.access_token;
  return await fetch(props.url, {
    method: props.method,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props.body),
  }).then((res) => res.json());
};
