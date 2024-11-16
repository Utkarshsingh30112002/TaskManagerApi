const  User  = require('../models/user');

exports.createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      const e= new Error('Email/Username already exists');
      e.statusCode=400;
      throw e;
    }
    throw err;
  }
};

exports.findUser=async(userData)=>{
  const user = await User.findOne({ where: userData });
  console.log(user)
  return user;
}

