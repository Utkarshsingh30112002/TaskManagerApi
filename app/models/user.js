// Database Design:

//     Create a User table with fields:
//         id: Primary key, auto-increment
//         username: Unique, required
//         email: Unique, required
//         password: Required, hashed
//         createdAt: Timestamp
//         updatedAt: Timestamp

//     Create a Task table with fields:
//         id: Primary key, auto-increment
//         title: (String, required)
//         description: (Text, optional)
//         priority: (String, required, values: "low", "medium", "high")
//         dueDate: (Date, required)
//         status: (String, required, values: "pending", "completed")
//         userId: Foreign key referencing the User table
//         createdAt: Timestamp
//         updatedAt: Timestamp
const Sequelze=require('sequelize');
const sequelize=require('../connections/db.connect.js');

const User=sequelize.define("user",{
    id:{
        type:Sequelze.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    username:{
        type:Sequelze.STRING,
        unique:true,
        allowNull:false
    },
    email:{
        type:Sequelze.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelze.STRING,
        allowNull:false,
    }
})
module.exports=User;