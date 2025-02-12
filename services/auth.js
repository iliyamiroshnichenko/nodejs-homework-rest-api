const User = require("./user");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async ({ email, password }) => {
  const user = await User.getUserByEmail(email);

  if (!user || !user.validPassword(password) || !user.verify) {
    return null;
  }

  const id = user.id;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });

  await User.updateToken(id, token);
  return token;
};

const logout = async (id) => {
  const data = await User.updateToken(id, null);
  return data;
};

module.exports = {
  login,
  logout,
};
