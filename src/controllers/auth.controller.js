export const googleCallbackSuccess = (req, res) => {
  if (req.user && req.user.role === 'admin') {
    res.redirect('http://localhost:5173/dashboard'); 
  } else {
    res.redirect('http://localhost:5173/learning');
  }
};

// Lấy thông tin user hiện tại từ Session
export const getCurrentUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ user: null });
  }
};

export const logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('http://localhost:5173/');
  });
};