const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = 'mysecret';

const userQueries = {
  usersGetAll: async () => {
    const users = await User.find();
    return users;
  },
  userGetOne: async ({ id }) => {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }
};

const userMutations = {
  userCreate: async ({ input }) => {
    const { name, email, password } = input;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = new User({ name, email, password: hashedPassword });
    await userCreated.save();
    return userCreated;
  },
  userLogin: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Invalid credentials');
    const token = jwt.sign({ userId: user._id }, secret);
    return token;
  }
};

module.exports = { userQueries, userMutations };
