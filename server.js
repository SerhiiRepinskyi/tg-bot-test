import "dotenv/config";
import { app } from "./app.js";

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`My server is running on port: ${process.env.PORT}!`);
});
