import dotenv from "dotenv";
import createApp from "./app.js";

dotenv.config();

const PORT = process.env.PORT;
const app = createApp();

app.listen(PORT, () => {
  console.log("app running on port " + PORT);
});
