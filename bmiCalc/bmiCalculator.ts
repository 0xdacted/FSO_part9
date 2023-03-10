export const calculateBmi = (h: number, w: number): string => {
  const heightinM = h / 100
  const bmi = w / (heightinM * heightinM)
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

try {
  const height: number = Number(process.argv[2])
  const weight: number = Number(process.argv[3])
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
