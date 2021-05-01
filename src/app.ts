import express from "express";
import cors from "cors";
//routes
import home from "./routes/home";
import post from "./routes/post";
import childschoolinfo from "./routes/childschoolinfo";

const PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(cors());
//routes
app.use("/", home);
app.use("/post", post);
app.use("/childschoolinfo", childschoolinfo);

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
