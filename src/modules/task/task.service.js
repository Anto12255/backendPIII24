const taskModel = require("../../models/task");
const userModel = require("../../models/user"); // Importar userModel
const pager = require("../../utils/pager");
const { ObjectId } = require("mongodb");
async function findOneById(_id){
  return await taskModel.findById(_id).exec();
}

// Función para guardar la tarea
async function save(task) {
  try {
      // Convertir el ID del usuario a ObjectId
      if (task.user) {
          task.user = new ObjectId(task.user);
      }

      let _task = new taskModel(task);
      console.log("Guardando tarea:", _task); // Verifica el contenido antes de guardar

      const savedTask = await _task.save();
      console.log("Tarea guardada exitosamente:", savedTask);

      // Actualizar el usuario para incluir la nueva tarea
      await userModel.findByIdAndUpdate(
          task.user,
          { $push: { tasks: savedTask._id } },
          { new: true }
      );

      console.log("Usuario actualizado con la nueva tarea");
      return savedTask;
  } catch (error) {
      console.log("Error al guardar la tarea:", error);
      throw error;
  }
}

async function paginated(params) {
  let perPage = params.perPage ? params.perPage : 10,
      page = Math.max(0, params.page),
      filter = params.filter ? params.filter : {},
      sort = params.sort ? params.sort : {};

  let count = await taskModel.countDocuments(filter);
  let data = await taskModel.find(filter)
    .limit(perPage)
    .skip(perPage * page)
    .sort(sort)
    .populate('user')
    .exec();

  return pager.createPager(page, data, count, perPage);
}

async function update(id, updatedTask) {
  return await taskModel.findByIdAndUpdate(id, updatedTask, { new: true }).exec();
}

async function remove(id) {
  return await taskModel.findOneAndDelete({ _id: id }).exec();
}

module.exports = { findOneById, save, paginated, update, remove };