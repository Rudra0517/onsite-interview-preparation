const authorization = (...authorizationroles) => {
  return (req, res, next) => {
    if (!authorizationroles.includes(req.user.role)) {
      return res.status(403).json({ message: "You are not allowed" });
    }
    next();
  };
};

module.exports = authorization;
