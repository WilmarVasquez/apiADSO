const User = require("../models/User");

// Crear usuario (POST)
exports.createUser = async (req, res) => {
  try {
    // Log para depuración
    console.log("Encabezados de la solicitud:", req.headers);
    console.log("Cuerpo de la solicitud:", req.body);

    const { username, password } = req.body;

    // Validación de datos recibidos
    if (!username || !password) {
      return res.status(400).json({
        error: "Los campos 'username' y 'password' son obligatorios.",
      });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({
      message: "Usuario creado",
      user: newUser,
    });
  } catch (err) {
    // Manejo de errores de validación de Mongoose
    if (err.name === "ValidationError") {
      return res.status(400).json({
        error: "Error de validación",
        details: err.errors,
      });
    }

    console.error("Error al crear usuario:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todos los usuarios (GET)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar usuario (PUT)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    // Validación de datos recibidos
    if (!username || !password) {
      return res.status(400).json({
        error: "Los campos 'username' y 'password' son obligatorios.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, password },
      { new: true, runValidators: true } // Ejecuta validadores del modelo
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Usuario actualizado",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error al actualizar usuario:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar usuario (DELETE)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
