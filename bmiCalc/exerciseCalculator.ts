interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExerciseHours: Array<number>, target: number): ExerciseResult => {
  const periodLength = dailyExerciseHours.length
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length
  const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0)
  const average = totalHours / periodLength
  const success = average >= target
  const rating = success ? 3 : average >= target - 0.5 ? 2 : 1
  const ratingDescription = rating === 3 ? 'excellent' : rating === 2 ? 'not too bad but could be better' : 'poor'

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
