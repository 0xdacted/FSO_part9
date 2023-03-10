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

try {
  const args = process.argv.slice(2)
  const target = Number(args[0])
  if (isNaN(target)) throw new Error('Target value is not a number!')
  const dailyExerciseHours = args.slice(1).map(hours => {
    const parsedHours = Number(hours)
    if (isNaN(parsedHours)) throw new Error(`Invalid input: ${hours} is not a number!`)
    return parsedHours
  })
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
