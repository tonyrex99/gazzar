export default {
  type: "object",
  properties: {
    name: { type: "string" },
    dateJoined: { type: "string", format: "date-time" },
    phoneNumber: { type: "string" },
    email: { type: "string", format: "email" },
    location: { type: "string" },
    storeID: { type: "string" },
  },
  required: [
    "name",
    "dateJoined",
    "phoneNumber",
    "email",
    "location",
    "storeID",
  ],
  additionalProperties: false,
};
