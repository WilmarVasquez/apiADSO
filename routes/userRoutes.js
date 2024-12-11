const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    console.log("POST /api/users llamado");
    next();
  },
  createUser
);

router.get(
  "/",
  (req, res, next) => {
    console.log("GET /api/users llamado");
    next();
  },
  getUsers
);

router.put(
  "/:id",
  (req, res, next) => {
    console.log("PUT /api/users llamado");
    next();
  },
  updateUser
);

router.delete(
  "/:id",
  (req, res, next) => {
    console.log("DELETE /api/users llamado");
    next();
  },
  deleteUser
);

module.exports = router;
