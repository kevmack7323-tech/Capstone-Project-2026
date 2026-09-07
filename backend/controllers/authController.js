// @desc    Update user profile (name, username, email)
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    // Handle Mongoose duplicate key error (code 11000)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue || {})[0] || "field";
      return res.status(400).json({ message: `That ${duplicateField} is already in use` });
    }

    // Handle Mongoose Schema Validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    res.status(500).json({ message: error.message || "Server error" });
  }
};