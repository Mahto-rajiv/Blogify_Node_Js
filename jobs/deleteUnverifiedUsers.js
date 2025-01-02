import User from "../models/user.model.js";

export const deleteUnverifiedUsers = async () => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: fiveMinutesAgo },
    });
    console.log("Unverified users deleted successfully");
  } catch (error) {
    console.error("Error deleting unverified users:", error);
  }
};
