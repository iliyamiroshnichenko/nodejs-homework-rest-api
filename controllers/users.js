const User = require("../services/user");

const Auth = require("../services/auth");

const signUp = async (req, res) => {
  const user = await User.getUserByEmail(req.body.email);

  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  const { email, subscription } = await User.addUser(req.body);
  res.status(201).json({ user: { email, subscription } });
};

const logIn = async (req, res) => {
  const token = await Auth.login(req.body);

  if (token) {
    const { email, subscription } = await User.getUserByEmail(req.body.email);
    return res.status(200).json({ token, user: { email, subscription } });
  }

  res.status(401).json({ message: "Email or password is wrong" });
};

const logOut = async (req, res, next) => {
  await Auth.logout(req.user.id);
  res.status(204).json({ message: "No Content" });
};

const currentUser = async (req, res) => {
  const currentUser = await User.getUserById(req.user.id);

  if (currentUser) {
    const { email, subscription } = currentUser;
    res.status(200).json({ email, subscription });
  }
};

const avatars = async (req, res) => {
  const id = req.user.id;
  const pathFile = req.file.path;
  const url = await User.updateAvatar(id, pathFile);
  return res.status(200).json({ avatarURL: url });
};

const verify = async (req, res, next) => {
  try {
    const result = await User.verify(req.params);
    if (result) {
      return res.status(200).json({ message: "Verification successful" });
    }
    return res
      .status(404)
      .json({ message: "Your verification token is inavlid" });
  } catch (error) {}
};

module.exports = { signUp, logIn, logOut, currentUser, avatars, verify };
