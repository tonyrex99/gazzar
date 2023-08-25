export default {
  type: "object",
  properties: {
    locationName: { type: "string" },
    phoneNumber: { type: "string" },
    pickupAddress: { type: "string" },
    state: { type: "string" },
    country: { type: "string" },
    availability: { type: "object" },
    availableTime: { type: "string" },
    storeID: { type: "string" },
  },
  required: [
    "locationName",
    "phoneNumber",
    "pickupAddress",
    "state",
    "country",
    "availability",
    "availableTime",
    "storeID",
  ],
  additionalProperties: false,
};
