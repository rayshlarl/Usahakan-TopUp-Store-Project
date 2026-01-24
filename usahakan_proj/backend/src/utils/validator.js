import { body } from "express-validator";

// Validasi untuk login
const loginValidation = [
    body("email").notEmpty().withMessage("Email wajib di isi!"),
    body("email").isEmail().withMessage("Format email tidak valid"),
    body("password").notEmpty().withMessage("Password wajib diisi"),
];

// Validasi untuk register (nanti bisa ditambah)
const registerValidation = [
    body("fullName").notEmpty().withMessage("Nama lengkap wajib diisi"),
    body("email").isEmail().withMessage("Format email tidak valid"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password minimal 6 karakter"),
    body("passwordConfirm").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Konfirmasi password tidak cocok");
        }
        return true;
    }),
];

export { loginValidation, registerValidation };
