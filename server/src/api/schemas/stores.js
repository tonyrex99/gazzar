export default {
  type: "object",
  properties: {
    name: { type: "string" },
    tier: { type: "string" },
  },
  required: ["name", "tier"],
  additionalProperties: false,
};
