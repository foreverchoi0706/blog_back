import express, { Express } from "express";
import cors from "cors";
//routes
import home from "./routes/home";
import post from "./routes/post";
import childschoolinfo from "./routes/childschoolinfo";

const PORT: String | Number = process.env.PORT || 3000;
const app: Express = express();

//middleware
app.use(cors());
//routes
app.use("/", home);
app.use("/post", post);
app.use("/childschoolinfo", childschoolinfo);

app.listen(PORT, () => {
  console.log(`우리아이 is running on http://localhost:${PORT}`);
});
