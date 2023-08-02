require("dotenv").config();
const express = require("express");

const app = express();
const path = require("path");
const { logger } = require("./middlewares/logEvent");
const errorHandle = require("./middlewares/errorHandle");
const cors = require("cors");
const corsOption = require("./configs/corsOption");
const verifyJWT = require("./middlewares/verifyJWT");
const cookieParse = require("cookie-parser");
const connectDB = require('./configs/dbConn');
const { default: mongoose } = require("mongoose");
//const YAML = require('yamljs');
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
//const swaggerJsDocs = YAML.load('./api.yaml')

const PORT = process.env.PORT || 3500;



const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer Token",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    servers: [
      {
        url: "http://localhost:3500",
      },
      {
        url: "https://tcp-services-huga.onrender.com",
      },
    ],
  },
  apis: ["./routes/api/*.js"],
};

const specs = swaggerJsdoc(options);

//Connect to mongoDB
connectDB()

//middleware logger
app.use(logger);

//middleware for cookies
app.use(cookieParse());

//cors origin ressource
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());




//server static files

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use("/api/auth", require("./routes/api/authRoute"));

app.use(verifyJWT);
app.use("/api/user", require("./routes/api/userRoute"));
app.use("/api/discipline", require("./routes/api/disciplineRoute"));
app.use("/api/question", require("./routes/api/questionRoute"));
app.use("/api/serie", require("./routes/api/serieRoute"));
app.use("/api/test", require("./routes/api/testRoute"));


app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandle);
mongoose.connection.once('open', ()=> {
    console.log('connect to mongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
})

