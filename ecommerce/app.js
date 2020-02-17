const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const expressValidator = require("express-validator");
dotenv.config();

//import user routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
// app
const app = express();

//db//MONGO ONLINE
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log("ONLINE DB CONNECTED!!!!"));

mongoose.connection.on("error", err => {
  console.log(`ONLINE DB CONNECTION ERROR: ${err.message}`);
});
//db locally
// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useCreateIndex: true
//   })
//   .then(() => console.log("DB CONNECTED!!!!"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Routes middelware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
