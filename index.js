const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect/url");
const { checkForAuthentication, restricTo } = require("./middlewares/auth");
const URL = require("./Models/url");

const urlRoute = require("./Routes/url");
const staticRoute = require("./Routes/staticRouter");
const userRoute = require("./Routes/user");

const app = express();
const PORT = 2002;

connectToMongoDB(
  "mongodb+srv://nileshpansare201811:vWTwkUqIaFiz6BJR@clusterone.w1hshzk.mongodb.net/"
).then(() => console.log("Mongodb  connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restricTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));
