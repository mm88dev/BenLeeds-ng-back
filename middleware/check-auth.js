const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization(' ')[1]; // moramo split jer obično u headeru pre tokena bude reč 'Bearer' pa onda razmak
    jwt.verify(token, 'scrtbl');
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated!' });
  }
};
