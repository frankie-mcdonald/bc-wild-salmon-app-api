import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const dataBuffer = fs.readFileSync("./data/quiz.json", "utf8");
    const quizData = JSON.parse(dataBuffer);
    res.json(quizData);
  } catch (error) {
    console.error("Error reading the quiz data file:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:quizId", (req, res) => {
  try {
    const dataBuffer = fs.readFileSync("./data/quiz.json", "utf8");
    const quizData = JSON.parse(dataBuffer);

    const quizId = parseInt(req.params.quizId, 10);

    // Find quiz by its ID
    const foundQuiz = quizData.find((quiz) => quiz.id === quizId);

    if (!foundQuiz) {
      return res.status(404).send("Quiz not found");
    }

    res.json(foundQuiz);
  } catch (error) {
    console.error("Error reading quiz data file:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
