import express from "express";
//routes
import home from "./routes/home";
const PORT = process.env.PORT || 8080;

const app = express();

app.use(home);

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
