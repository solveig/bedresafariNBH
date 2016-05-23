
var SessionHandler = require('./session')
  , ContentHandler = require('./content')
  , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var sessionHandler = new SessionHandler(db);
    var contentHandler = new ContentHandler(db);

    // Middleware to see if a user is logged in
    app.use(sessionHandler.isLoggedInMiddleware);
    //debugger;
    // The main page of the blog
    app.get('/', contentHandler.displayAirstrip);
    app.get('/newLang/:input', contentHandler.displayNewLang);
    app.get('/airstrip', contentHandler.displayAirstrip);
    app.get('/chemicals', contentHandler.displayChemicals);
    app.get('/ph', contentHandler.displayPH);
    app.get('/notes', contentHandler.displayNotes);
    app.get("/crm_not_found", contentHandler.displayCrmNotFound);


    
  // Displays the form allowing a user to add a new post. Only works for logged in users
   app.post('/airstrip', contentHandler.handleCrmClient);
   app.post('/display', contentHandler.display);

    // Login form
    app.get('/login', sessionHandler.displayLoginPage);
    //app.get('/login/:input', sessionHandler.displayLoginPage);
    app.post('/login', sessionHandler.handleLoginRequest);

    // Logout page
    app.get('/logout', sessionHandler.displayLogoutPage);

    // Wlcome page gjøres om til admin side TBD
    //app.get("/welcome", sessionHandler.displayWelcomePage);

    // Signup form 
    app.get('/signup', sessionHandler.displaySignupPage);
    app.post('/signup', sessionHandler.handleSignup);

    // Error handling middleware
    app.use(ErrorHandler);
};
