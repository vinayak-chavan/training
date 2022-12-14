const app = require("./app");

const http = require("http");
const routes = require("./routes/routes");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  try {
    console.log(`Server Started on Port ${port}`);
    app.use("/", routes);
  } catch (error) {
    console.log("Error Occured while running Server : ", error);
  }
});
