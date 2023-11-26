import { isNotNumber, parseArguments } from "./utils";

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

const printCalculateBmi = () => {
  const [height, weight] = parseArguments(process.argv, 2, (args: string[]) => {
    const height: number = Number(args[2]);
    if (isNotNumber(height)) throw new Error('Provided height was not a number!');
    const weight: number = Number(args[3]);
    if (isNotNumber(weight)) throw new Error('Provided weight was not a number!');
    return [height, weight];
  })
  console.log(calculateBmi(height, weight));
}

printCalculateBmi();

// console.log(calculateBmi(180, 74))