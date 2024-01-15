export const INITIAL_VALUE = { value: "", isValid: false };
const convertToEnglish = (persianText) => {
  // const persianToEnglishMap = {
  //   0: "5",
  //   1: "6",
  //   "٠": "0",
  //   "١": "1",
  //   "٢": "2",
  //   "٣": "3",
  //   "٤": "4",
  //   "٥": "5",
  //   "٦": "6",
  //   "٧": "7",
  //   "٨": "8",
  //   "٩": "9",
  // };
  const persianToEnglish = (persianNumber) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return persianNumber.replace(/[\u06F0-\u06F9]/g, (match) => {
      const persianIndex = persianDigits.indexOf(match);
      return englishDigits[persianIndex];
    });
  };
  return persianToEnglish(persianText) || persianText;
};
export const validate = (_event) => ({
  value: convertToEnglish(_event.target.value),
  isValid: _event.target.value.length > 0,
});
