import createApp from "./app.js";

const PORT = 8080;

const app = createApp();

app.listen(PORT, () => {
  console.log("app running on port " + PORT);
});
