const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());

const search = "REST API";

app.get("/videos", (req, res) => {
  const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=50&q=${search}`;
  fetch(`${url}&key=AIzaSyAnGjpYri0Pvqn50NGLgbF8u1soUCpa_8c`)
    .then((response) => response.json())
    .then((json) => {
      res.json(json.items);
      console.log(`${url}&key=${process.env.GOOGLE_YOUTUBE_API_KEY}`);
    });
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
