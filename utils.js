export function generateRandom4Digits() {
  // Generate a random number between 0 and 9999
  const randomNumber = Math.floor(Math.random() * 10000);

  // Pad the number with leading zeros if necessary
  const paddedNumber = randomNumber.toString().padStart(4, "0");

  return paddedNumber;
}
