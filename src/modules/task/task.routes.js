const express = require("express");
const taskService = require("./task.service");

const router = express.Router();

// GET /api/task
router.get("/", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const params = JSON.parse(req.headers['params']);
    let paginated = await taskService.paginated(params);
    return res.status(200).send(paginated);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// GET /api/task/:id
router.get("/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const userId = req.params.id;
    const user = await taskService.findOneById(userId);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// POST /api/task
router.post("/", async (req, res) => {
  // #swagger.tags = ['Task']
  // #swagger.summary = 'Crear una nueva tarea'
  // #swagger.parameters['task'] = { description: 'Detalles de la tarea a crear', required: true, type: 'object' }
  // #swagger.responses[201] = { description: 'Tarea creada exitosamente', schema: { $ref: '#/definitions/Task' } }
  // #swagger.responses[500] = { description: 'Error en el servidor' }

  try {
    console.log("Datos recibidos:", req.body); // Verifica el cuerpo de la solicitud
    const user = await taskService.save(req.body);
    console.log("Tarea guardada en la base de datos:", user); // Confirma que se ha guardado
    return res.status(201).send(user);
} catch (error) {
    console.log("Error al guardar la tarea:", error);
    return res.status(500).send({ error: "No se pudo guardar la tarea en la base de datos" });
}
});

// PUT /api/task/:id
router.put("/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await taskService.update(userId, updatedUser);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/task/:id
router.delete("/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const userId = req.params.id;
    await taskService.remove(userId);
    return res.status(200).send("Usuario eliminado correctamente.");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;