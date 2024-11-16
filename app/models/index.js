const sequelize=require('../connections/db.connect')

const User=require('./user')
const Task=require('./task')

//associations

User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

sequelize
  .sync({ force: true }) 
  .then(() => {
   console.log('database tables reset done')
  })
  .catch(err => console.error('Error syncing database:', err));