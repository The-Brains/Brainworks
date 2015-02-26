/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', {
    title: 'Brainworks',
    button_home: 'Home',
    button_signin: 'Sign in',  
    button_about: 'About'  
  });
};