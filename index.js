const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(req.method, req.url, req.ip, new Date());
  next();
});

const auth = ((req, res, next) => {
  const { password } = req.query;
  if (password === "admin") {
    next();
  } else {
    res.send("Anda tidak memiliki akses ke halaman ini");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/halaman", (req, res) => {
  res.send("Halaman");
});

app.get("/admin", auth, (req, res) => {
  res.send("Hello admin!");
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
