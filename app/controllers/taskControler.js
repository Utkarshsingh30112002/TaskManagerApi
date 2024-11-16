const Task=require('../models/task')

exports.findAlltask=async({ priority, status, startDate, endDate, sortBy, order },id)=>{
    try {
      const where = { userId:id };
      if (priority) where.priority = priority;
      if (status) where.status = status;
      if (startDate && endDate) where.dueDate = { [Op.between]: [startDate, endDate] };
  
      const orderBy = [];
      if (sortBy) {
        orderBy.push([sortBy, order === 'desc' ? 'DESC' : 'ASC']);
      }
  
      const tasks = await Task.findAll({ where, order: orderBy });
      return tasks;
    } catch (err) {
       throw err;
    }
  }

exports.createTask=async (taskData) => {
    try {
      const task = await Task.create(taskData);
      return task;
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        const e= new Error('Email/Username already exists');
        e.statusCode=400;
        throw e;
      }
      throw err;
    }
  };

exports.findOneTask=async({userId,taskId:id})=>{
    const task=Task.findOne({where:{id,userId}})
    return task;
}

exports.deleteOneTask=async({userId,taskId:id})=>{
  Task.destroy({where:{id,userId}})
}

exports.updateOneTask=async(updates,{userId,taskId:id})=>{
  await Task.update(updates,{where:{id,userId}})
}

