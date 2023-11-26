/**
 * 
 * @param height // in centimeters
 * @param weight // in kilograms
 */
const calculateBmi = (height: number, weight: number): string => {
    const bmi : number = weight / Math.pow(height / 100, 2);
    if (bmi < 18.5) {
      return "Underweight";
    }
    if (bmi < 25) {
      return "Normal (healthy weight)";
    } 
    if (bmi < 30) {
      return "Overweight";
    }
    return "Obese";
}

console.log(calculateBmi(180, 74))