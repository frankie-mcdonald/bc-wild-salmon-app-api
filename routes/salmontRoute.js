import express from "express";
import { promises as fs } from "fs"; // Use fs.promises for async operations

const router = express.Router();
const filePath = "./data/salmon.json"; // Store file path in a variable

// Get all salmon data
router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading the salmon data file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a specific salmon by ID
router.get("/:salmonId", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const salmonData = JSON.parse(data);
    const salmonId = parseInt(req.params.salmonId, 10);

    const foundSalmon = salmonData.find((salmon) => salmon.id === salmonId);

    if (!foundSalmon) {
      return res.status(404).send("Salmon not found");
    }

    res.json(foundSalmon);
  } catch (error) {
    console.error("Error reading the salmon data file:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
