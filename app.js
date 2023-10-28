const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const app = express();
const sessionStore = require('./helpers/init-sessionStore');
const ensureAuthenticated =
    require('./helpers/auth-helper').ensureAuthenticated;

const PORT = process.env.PORT || 4000;

require('dotenv').config();
require('./helpers/init-passport')(passport);

// Inside your server code

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout/main_layout');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ limit: '60mb', extended: false }));

// Generate a secret key

// Session configuration
const hour = 60 * 60 * 1000; // (60min * (60sec *1000millisecond)
const halfHour = hour / 2;
app.set('trust proxy', 1); // trust first proxy
app.use(
    session({
        store: sessionStore,
        name: 'sessionID',
        secret: 'Gvv8V}CGBk5-r;RK}}z))e{#S:%aG1U+%t8;b0epoT57|;9k4bVy]mG8cm=}Dinshaws',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: halfHour },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(flash());

// Global Variables using custom middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

// force to use https on heroku
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`);
        else next();
    });
}

// routes
app.use('/', require('./routes/homeRoute'));
app.use('/user', require('./routes/userRoute'));
app.use('/about-us', require('./routes/aboutRoute'));
app.use('/career', require('./routes/careerRoute'));
app.use('/product', require('./routes/productsRoute'));
app.use('/Our-Legacy', require('./routes/ourLegacyRoute'));
app.use('/business-enquiry', require('./routes/businessEnquiryRoute'));
app.use('/department', require('./routes/departmentRoute'));
app.use('/job-opening', require('./routes/jobOpeningRoute'));
app.use('/user_roles', ensureAuthenticated, require('./routes/userRolesRoute'));
app.use('/dashboard', ensureAuthenticated, require('./routes/dashboardRoute'));

app.listen(PORT, async (err) => {
    if (err) throw err;
    else {
        await console.log(`server running on port http://localhost:${PORT}`);
    }
});
