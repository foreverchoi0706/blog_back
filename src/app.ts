import express from "express";
import cors from "cors";
//routes
import home from "./routes/home";
import post from "./routes/post";

const PORT = process.env.PORT || 8080;
const app = express();

//middleware
app.use(cors());
//routes
app.use("/", home);
app.use("/post", post);

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
