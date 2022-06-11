profile = {
  user: {
    id: 10,
    email: "divya@gmail.com",
    firstname: "Divya",
    lastname: "Bharti",
    created_at: "2022-06-08T16:13:21.115023Z",
    updated_at: "2022-06-08T20:10:19.499982Z",
  },
  address: null,
  mobile: "7543021269",
  gender: "F",
};

broken_profile = { ...user, address, mobile, gender };
console.log(user);
