require("dotenv").config();
const express = require("express");
const methodOverRide = require("method-override");
const morgan = require("morgan")
const session = require("express-session");
const MongoStore = require("connect-mongo");
const FruitRouter = require("./controllers/fruit");
const UserRouter = require("./controllers/user");
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: false})); //allows the req.body to be read from the form
app.use(methodOverRide("_method"));
app.use(morgan("dev"));


app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
}));
//will have a prefix of /fruit on top of what is defined as a path on FruitRouter
app.use("/fruit", FruitRouter);
app.use("/user", UserRouter);

app.get('/', (req, res) => {
    res.render('index.ejs')
})

//listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));