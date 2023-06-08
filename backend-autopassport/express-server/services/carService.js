// Extra functions to generate random data
const getRandonFine = () => {

  const fines = [
    "Speeding",
    "Parking in a prohibited area",
    "Driving without a license",
    "Driving without insurance",
    "Driving without a seatbelt",
    "Driving under the influence of alcohol",
  ];
  const randomFine = fines[Math.floor(Math.random() * fines.length)];
  return randomFine;
}

const getRandomDateOfLastTwentyDays = () => {
  const today = new Date();
  const twentyDaysInMs = 20 * 24 * 60 * 60 * 1000; // 20 days in ms
  const randomTime = today.getTime() - Math.random() * twentyDaysInMs;
  const randomDate = new Date(randomTime).toISOString().split('T')[0];
  return randomDate
};

const getRandomFinAmount = () => {
  const min = 50;
  const max = 2000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  getRandonFine,
  getRandomDateOfLastTwentyDays,
  getRandomFinAmount
}