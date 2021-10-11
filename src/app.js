const express = require("express");
const path = require("path");
const app = express();
require("./db/connection");
const hbs = require("hbs");
const User = require("./models/users");

const PORT = process.env.PORT || 3030;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// todo:::: Connecting Static Files===Template--Engine===
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.static(static_path));
// :::::Setting Template Engine::::
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
// todo:::: Connecting Static Files

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerUser = new User({
        firstname: req.body.fname,
        lastname: req.body.lname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      });

      const storeUser = await registerUser.save();
      res.status(201).render("index");
    } else {
      res.send("Password are not matching!");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`App is live on ${PORT} 🚀`);
});
