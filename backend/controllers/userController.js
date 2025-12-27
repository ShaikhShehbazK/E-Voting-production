const Voter = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult, check } = require('express-validator');

///Done
exports.getProfile = (req, res) => {
  const userData = req.user;
  res.status(200).json({ userData });
};

exports.postPassword = [
  //Password validation
  check('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 character long')
    .matches(/[a-z]/)
    .withMessage('Password must be at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must be at least one uppercase letter')
    .matches(/[!@#$%^&*]/)
    .withMessage('Password must contain at least one special character')
    .trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
      const voter = await Voter.findById(userId);

      const isMatch = await bcrypt.compare(currentPassword, voter.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'You entered wrong password' });
      }

      voter.password = newPassword;
      voter.save();
      res.status(200).json({ message: 'password changed successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
];
