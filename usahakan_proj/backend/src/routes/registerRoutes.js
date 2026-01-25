import express from "express";
import bcrypt from "bcrypt";
import { createNewUser } from "../controllers/userController.js";
import { registerValidation } from "../utils/validator.js";
import { validationResult } from "express-validator";

const router = express.Router();

router.post("/register", registerValidation, async (req, res) => {
  //--> validate the user available
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { fullName, email, password, passwordConfirm } = req.body;

    //encrypt the password
    const encryptPassword = async (vanillaPassword) => {
      const hashedPass = await bcrypt.hash(vanillaPassword, 5);
      return hashedPass;
    };
    const newPassword = await encryptPassword(password);

    const result = await createNewUser(fullName, email, newPassword);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.json({
      success: true,
      message: "Akun berhasil dibuat!",
      data: result.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Aya error weh di register" });
  }
});

export default router;
