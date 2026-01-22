import express from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { loginValidation } from "../utils/validator.js";
import { getUserInformation } from "../controllers/userController.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "batutu";

// Login route
router.post("/login", loginValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { email, password } = req.body;
    const isUserExist = await getUserInformation(email, password);
    // console.log(isUserExist);

    //Cek apakah user yang dicari ada?
    if (!isUserExist) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    const user = isUserExist.rows[0];
    let token = null;
    if (user.role !== "buyer") {
      // Create jwt token
      token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
    }

    res.json({
      success: true,
      token: token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
