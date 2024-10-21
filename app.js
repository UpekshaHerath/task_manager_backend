const express = require("express");
const cors = require("cors");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleWare/notFound");
const errorHandlerMiddleware = require("./middleWare/errorHandler");

app.use(cors(
  {
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  }
))

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Hello world test API');
})

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
module.exports = app;
