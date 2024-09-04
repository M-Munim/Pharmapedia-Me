import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("token").value || "";
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    return decodedToken.userId;
  } catch (error) {
    throw new Error(error.message);
  }
};
