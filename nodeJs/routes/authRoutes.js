const express     = require("express");
const router      = express.Router();
const passport    = require("passport");
const User        = require("../models/user");
const bcrypt      = require("bcryptjs");
const bcryptSalt  = 10;

const userIn = false;

router.post("/signup", (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if (username === "" || password === "" || email === "") {
        res.status(400).json({ message: 'Provide username, password and email' });
        return;
    }

    User.findOne({ email }, "email", (err, user) => {
        if (user !== null) {
            res.status(400).json({ message: 'The email already exists' });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            email,
            username,
            password: hashPass,
        });

        newUser.save((err) => {
            if (err) {
                res.status(400).json({ message: 'Something went wrong' });
                return;
            }

            req.login(newUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Something went wrong' });
                    return;
                }

                // req.user = user
                res.status(200).json(newUser);
            })
        });
    });
});

// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', (err, theUser, failureDetails) => {
//         if (err) {
//             res.status(500).json({ message: 'Something went wrong' });
//             return;
//         }

//         if (!theUser) {
//             res.status(401).json(failureDetails);
//             return;
//         }

//         req.login(theUser, (err) => {
//             if (err) {
//                 res.status(500).json({ message: 'Something went wrong' });
//                 return;
//             }

//             // We are now logged in (notice req.user)
//             res.status(200).json(req.user);
//         });
//     })(req, res, next);
// });

router.post('/login', passport.authenticate("local"), (req, res) => {
    console.log(req.user);
    res.json(req.user);
});


router.post("/logout", (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Success' });
});

router.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json();
        return;
    }

    res.status(403).json({ message: 'Unauthorized' });
});

router.get('/private', (req, res, next) => {
    if (req.isAuthenticated()) {
        // console.log("User inside: ", req.user);
        // console.log("Username inside: ", req.body.username);
        res.status(200).json(req.user);
        return;
    }

    res.status(403).json({ message: 'Unauthorized' });
});


router.get("/auth/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/private-page"
}));

module.exports = router;
