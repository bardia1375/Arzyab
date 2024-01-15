export const idGenerator = () => {
  const FIRST_SECTION = Date.now().toString(36);
  const SECOND_SECTION = Math.random().toString(36).substring(2);
  return FIRST_SECTION + SECOND_SECTION;
};
