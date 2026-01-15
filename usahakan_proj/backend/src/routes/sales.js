import express from "express";

const router = express.Router();

router.get("/sales", async (req, res) => {
  res.json({
    message: "Ok",
    data: [],
  });
});

router.post("/sales", async (req, res) => {
  const { name, price } = req.body;
  res.json({
    message: "done",
    data: { name, price },
  });
});

export default router;
