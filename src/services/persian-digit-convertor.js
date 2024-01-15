export const persianDigitConvertor = (input) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return input.toString().replace(/\d/g, (x) => persianDigits[x]);
};

