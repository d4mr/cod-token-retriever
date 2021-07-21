const tokenRetriever = require("./token_retriever.js");

(async () => {
  const tokens = await tokenRetriever(
    "youremail@id.com",
    "yourpasswordhere"
  );
  console.log(tokens);
})();
