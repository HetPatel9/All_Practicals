const homepage = (req, res) => {
  res.status(200).render('landing', {
    title: 'Landing Page'
  });
};
const loginPage = (req, res) => {
  res.render('login', {
    title: 'Login Page'
  });
};
const signupPage = (req, res) => {
  res.render('signup', {
    title: 'Signup Page'
  });
};
const welcomePage = (req, res) => {
  res.render('welcome', {
    title: 'Welcome Page',
    name: req.cookies.name,
    message: res.__('message')
  });
};

module.exports = { homepage, loginPage, signupPage, welcomePage };
