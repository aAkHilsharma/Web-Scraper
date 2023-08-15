const express = require("express");
require("dotenv").config();
const app = express();
require("./config/dbConfig");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/scrape", require("./routes/scrape"));

//for deployment
const rootPath = path.resolve(__dirname);
const clientBuildPath = path.join(rootPath, "server", "client", "build");

const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(clientBuildPath)));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
