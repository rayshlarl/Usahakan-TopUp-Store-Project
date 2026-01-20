import jwt from "jsonwebtoken";

const JWT_SECRET = "batutu";

const authenticateToken = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token tidak ditemukan",
    });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Token tidak valid",
      });
    }
    req.user = user;
    next();
  });
};
export { authenticateToken };
