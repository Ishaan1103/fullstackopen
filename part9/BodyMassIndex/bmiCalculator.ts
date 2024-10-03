const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters: number = height / 100;
    const bmi: number = weight / (heightInMeters * heightInMeters);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal range';
    } else {
        return 'Overweight';
    }
};

// Get command-line arguments
const args = process.argv;

if (args.length !== 4) {
    console.error("Please provide two arguments: height in cm and weight in kg.");
    process.exit(1);
}

const height = Number(args[2]);
const weight = Number(args[3]);

if (isNaN(height) || isNaN(weight)) {
    console.error("Both height and weight must be valid numbers.");
    process.exit(1);
}

console.log(calculateBmi(height, weight));
