require("dotenv").config()

const database={
    name:process.env.DATABASE_NAME,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD
}

module.exports=database;