const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getOneUser,
  removeOneUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  getWishlist,
  getUserProfile,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.get("/reset-password/:token/:password", resetPassword);
router.get("/refresh", handleRefreshToken);

// must login
router.use(authMiddleware);
router.get("/profile", getUserProfile);
router.get("/logout", logout);
router.get("/all-users", getAllUser);
router.get("/wishlist", getWishlist);

router.put("/edit-user", updateUser);
router.put("/password", updatePassword);

router.delete("/:id", removeOneUser);

// must be admin
router.use(isAdmin);
router.get("/:id", getOneUser);
router.put("/edit-user/:id", updateUser);
router.put("/block-user/:id", blockUser);
router.put("/unblock-user/:id", unblockUser);

module.exports = router;
