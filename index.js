// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const formatDate = (date) => {
  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
};

// Route with optional date parameter
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;

  console.log(`Received date parameter: ${dateParam}`);

  if (!dateParam) {
    // If no date is provided, use the current date
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If the date is a valid Unix timestamp
    dateParam = parseInt(dateParam);
    date = new Date(dateParam);
  } else {
    // If the date is a valid date string
    date = new Date(dateParam);
  }

  console.log(`Parsed date: ${date}`);

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json(formatDate(date));
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
