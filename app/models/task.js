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

const Task=sequelize.define("task",{
    id:{
        type:Sequelze.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:Sequelze.STRING,
        allowNull:false
    },
    description:{
        type:Sequelze.STRING
    },
    priority:{
        type:Sequelze.STRING,
        allowNull:false
    },
    dueDate:{
        type:Sequelze.DATE,
        allowNull:false
    },
    status:{
        type:Sequelze.STRING,
        default:false,
        allowNull:false
    },
    userId: {
        type: Sequelze.INTEGER, // Foreign key
        allowNull: false,
      },
})
module.exports=Task