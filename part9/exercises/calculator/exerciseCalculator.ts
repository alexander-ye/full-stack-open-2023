interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number

}

const calculateExercises = (dailyExerciseHours: number[] = [], target: number) : Result => {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter(daysHours => daysHours > 0).length;
  const average : number = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success: boolean = average >= target;
  const rating: number = success ? 3 : average >= target - 1 ? 2 : 1;
  const ratingDescription :string = success ? "Great job!" : average >= target - 1 ? "Not too bad but could be better" : "You should try harder";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))