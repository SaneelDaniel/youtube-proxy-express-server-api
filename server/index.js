const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());

const search = null;
const playList = "";
const defaultSearchNumberValue = 25;

app.get("/videos", (req, res) => {
  const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=${
    req.query.maxResults ? req.query.maxResults : defaultSearchNumberValue
  }&q=${req.query.q !== "" ? req.query.q : "youtube"}&pageToken=${
    req.query.pageToken ? req.query.pageToken : ""
  }`;
  console.log("query: >>>>>>", req.query);

  fetch(`${url}&key=AIzaSyBY9-sSv1E12YojjpF5OsLY8C_bZ7VcT5Y`)
    .then((response) => response.json())
    .then((json) => {
      console.log("URL: >>>>>>", url);

      console.log("JSON: >>>>>>", json);
      res.json(json.items);
      console.log("JSON.ITEMS: >>>>>>", json);
    });
});

app.get("/watchVideo", (req, res) => {
  const url = "https://www.youtube.com/watch?v=kXYiU_JCYtU&feature=youtu.be";
  fetch(url)
    .then((response) => response.json)
    .then();
});
function notFound(req, res, next) {
  res.status(404);
  const err = new Error("Not Found");
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening on port", port);
});
