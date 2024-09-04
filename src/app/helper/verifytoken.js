export const isAuthenticated = () => {
  const isVerfied = localStorage.getItem("token");
  return isVerfied !== null;
};
