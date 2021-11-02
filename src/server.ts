/**@lib */
import express, {
  Express,
  json,
  urlencoded,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
/**@routes */
import home from "./routes/home";
import user from "./routes/user";
import post from "./routes/post";
import childschoolinfo from "./routes/childschoolinfo";
import map from "./routes/map";

const PORT: number = 3001;

const app: Express = express();

//middleware
app.use(cors());
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.set('view engine', 'ejs');

//routes
app.use("/", home);
app.use("/user", user);
app.use("/post", post);
app.use("/childschoolinfo", childschoolinfo);
app.use("/map", map);

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
