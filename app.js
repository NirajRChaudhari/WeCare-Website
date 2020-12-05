const express = require("express");

const app = express();
const router = require("./Routes/route");

app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening at " + port);
});
