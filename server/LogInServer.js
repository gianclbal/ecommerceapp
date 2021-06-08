const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
// let mongooseHidden = require('mongoose-hidden')()

const app = express();
const port = 3001;
app.listen(port, () => console.log(`LogInServer listening on port ${port}!`));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });


const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  }
);

// userSchema.plugin(mongooseHidden)

const userModel = mongoose.model("userLoginData", userSchema);

app.post('/registerNewUser', (req, res) => {
  //console.log('made it here');
  //console.log(req.body);
  var myData = new userModel(req.body);
  myData.save()
    .then(item => {
      return res.status(200).json({ success: true });
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err });
    });
});

app.post('/login', async (req, res) => {
  console.log("req.body is:");
  console.log(req.body);
  //console.log(req.body.username);
  const userToFind = { username: req.body.username, password: req.body.password }
  var user = null;

  try {
    user = await userModel.findOne(userToFind).exec();
    console.log("userFound is:");
    console.log(user);

  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e
    });
  }

  if (user == null) {
    return res.status(400).json({
      success: false,
      error: "Error: Invalid login"
    });
  }
  return res.status(200).json({
    success: true,
    user: user
  });
});

// app.post(`/listUser`, async (req, res) => {
//   console.log(req.body);
//   //console.log(req.body.username);
//   const userToFind = { username: req.body.username, password: req.body.password }
//   var userFound = null;

//   console.log('USERNAME AND PASS HERE')
//   console.log(username);
//   console.log(password);

//   try {
//     const users = await userModel.find().exec();
//     const user = await userModel.findOne( {username: username, password: password}).exec();
//     console.log('USER ARE HERE')
//     // console.log(users);
//     console.log(user)
//     res.status(200).json({
//       success: true,
//       users: users,
//       user: user,
//       errorCode: 200
//     });
//   }
//   catch (e) {
//     console.log(e);
//   }

// });
