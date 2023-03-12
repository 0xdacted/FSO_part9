import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({ error: "malformatted parameters "});
  }
  const bmi = calculateBmi(height, weight);

  return res.json({
    weight, 
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  const daily_exercises: number[] = req.body.daily_exercises;
  const target = Number(req.body.target);
  if (!daily_exercises || daily_exercises.length < 2) {
    console.log(daily_exercises);
    return res.status(400).json({ error: "parameters missing" });
  }
  if (isNaN(target) || target <= 0 || !Array.isArray(daily_exercises) || 
  daily_exercises.some((value: number) => typeof value !== 'number')) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const result = calculateExercises(daily_exercises, target);

  return res.json({
    periodLength: result.periodLength,
    trainingDays: result.trainingDays,
    success: result.success,
    rating: result.rating,
    ratingDescription: result.ratingDescription,
    target: result.target,
    average: result.average,
  });

});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});