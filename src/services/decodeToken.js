import jwt from "jwt-decode";

export const decodeToken = async (token) => {
  return await jwt(token);
};
