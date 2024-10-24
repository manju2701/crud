const User = require('../model/user');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10; 
      const users = await User.find().limit(limit);
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createUser: async (req, res) => {
    const { firstName, lastName, email, phone, address, gender } = req.body;
    const newUser = new User({ firstName, lastName, email, phone, address, gender });

    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.userId;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.userId;
    const { firstName, lastName, email, phone, address, gender } = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, email, phone, address, gender },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController;
