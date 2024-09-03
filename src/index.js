require('dotenv').config()
const express = require("express")
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongoDb");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require("passport");
const {googleprovaider, facebookProvider} = require("./utliy/provaider");
const connectChat = require("./utliy/soketIo");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const _dirname = path.resolve();

const __swaggerDistPath = path.join(_dirname, 'node_modules', 'swagger-ui-dist'); //install swagger-ui-dist

const swaggerDocument = YAML.load(path.resolve('./pablic', 'api.yaml'));


app.use(
  '/api/docs',
  express.static(__swaggerDistPath, { index: false }), // Serve Swagger UI assets
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      url: '/pablic/api.yaml' // Path to your YAML file
    }
  })
);
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}));
app.use(express.json());
app.use(require('express-session')({ secret: 'bhargav', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
connectDB();
googleprovaider();
facebookProvider();
connectChat()
app.use("/api/v1", routes);

app.listen(8000, () => {
    console.log("Server started at port 8000");
});



