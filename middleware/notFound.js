const notFound = (req, res, next) => {
  const error = new Error("Route Doest Not Exist");
  error.status = 404;
  next(error);
};

export default notFound;
