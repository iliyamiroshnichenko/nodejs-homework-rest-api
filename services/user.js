const Users = require('../model/userSchema')

const getUserById = async (id) => {
  return await Users.findById(id)
}

const getUserByEmail = async (email) => {
  return await Users.findOne({ email })
}

const addUser = async (body) => {
  const user = await Users(body)
  return user.save()
}

const updateToken = async (id, token) => {
  await Users.updateOne({ _id: id }, { token })
}

module.exports = {
  getUserById,
  getUserByEmail,
  addUser,
  updateToken,
}
