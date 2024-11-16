const sequelize=require('./app/connections/db.connect')
const express=require('express');
const authRouter = require('./app/routes/auth');
const errorHandler=require('./app/middleware/errorHandler');
const auth = require('./app/middleware/authentication');
const taskRouter = require('./app/routes/task');
const cookieParser = require('cookie-parser')
const morgan =require('morgan');
const logger = require('./app/utils/logger');
const log = require('./app/middleware/log');


const app=express();

app.use(express.json());
app.use(cookieParser())
app.use(log)
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.use('/auth',authRouter)
app.use(auth)
app.use('/tasks',taskRouter)

app.use(errorHandler);

  
sequelize
.sync()
.then(() => app.listen(8080,()=>console.log('server started at 8080')))
.catch(err => console.log(err));

