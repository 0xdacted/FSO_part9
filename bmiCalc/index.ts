import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

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
  const { daily_exercises } = req.body;
  if (!daily_exercises || daily_exercises.length < 2) {
    return res.status(400).json({ error: "parameters missing" });
  }
  
  const target = Number(daily_exercises[0]);

  if (isNaN(target) || target <= 0 || !Array.isArray(daily_exercises.slice(1)) || 
  daily_exercises.slice(1).some(value => typeof value !== 'number')) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const result = calculateExercises(daily_exercises.slice(1), target);

  return res.json({
    periodLength: result.periodLength,
    trainingDays: result.trainingDays,
    success: result.success,
    rating: result.rating,
    ratindDescription: result.ratingDescription,
    target: result.target,
    average: result.average,
  });

});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});