import express from "express";
import { promises as fs } from "fs";
import path from "path";

const router = express.Router();
const filePath = path.resolve("data", "lifecycle.json");

// Get all lifecycle data
router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    let lifecycle;

    try {
      lifecycle = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing lifecycle data:", parseError);
      return res.status(500).send("Data format error");
    }

    res.json(lifecycle);
  } catch (error) {
    console.error("Error reading the lifecycle data file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a specific lifecycle by ID
router.get("/:lifecycleId", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    let lifecycle;

    try {
      lifecycle = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing lifecycle data:", parseError);
      return res.status(500).send("Data format error");
    }

    const lifecycleId = parseInt(req.params.lifecycleId, 10);

    if (isNaN(lifecycleId)) {
      return res.status(400).send("Invalid lifecycle ID");
    }

    const foundLifecycle = lifecycle.find((item) => item.id === lifecycleId);

    if (!foundLifecycle) {
      return res.status(404).send("Lifecycle not found");
    }

    res.json(foundLifecycle);
  } catch (error) {
    console.error("Error reading the lifecycle data file:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
