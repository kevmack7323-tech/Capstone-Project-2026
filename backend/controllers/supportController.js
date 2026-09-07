import SupportTicket from "../models/SupportTicket.js";

// @desc    Create support ticket
// @route   POST /api/support
// @access  Private
export const createSupportTicket = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: "Please provide a subject and message" });
    }

    const userId = req.user._id || req.user.id;
    const ticket = await SupportTicket.create({
      userId,
      subject,
      message,
    });

    res.status(201).json({ status: "success", data: ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};