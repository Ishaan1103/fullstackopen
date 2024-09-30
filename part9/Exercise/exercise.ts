interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(day => day > 0).length;
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = "Great job! You met your target.";
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "Not too bad but could be better.";
    } else {
        rating = 1;
        ratingDescription = "You need to improve your consistency.";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// Get command-line arguments
const args = process.argv;

if (args.length < 4) {
    console.error("Please provide at least two arguments: target hours and daily exercise hours.");
    process.exit(1);
}

const target = Number(args[2]);
const dailyHours = args.slice(3).map(arg => Number(arg));

if (isNaN(target) || dailyHours.some(isNaN)) {
    console.error("All inputs must be valid numbers.");
    process.exit(1);
}

console.log(calculateExercises(dailyHours, target));
