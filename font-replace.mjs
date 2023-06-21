import replace from "replace-in-file";

const options = {
  files: ["**/*.js", "**/*.jsx", "**/*.tsx"], // File patterns to include
  from: /fontFamily:\s*(['"])Satoshi\1,\s*fontWeight:\s*(['"])(\w+)\2/g,
  to: "fontFamily: $1Satoshi-$3$1",
};

try {
  const results = replace.sync(options);
  console.log("Font replacement successful:", results);
} catch (error) {
  console.error("Error occurred while replacing fonts:", error);
}
