const express     = require("express");
const router      = express.Router();
const passport    = require("passport");
const User        = require("../models/user");
const bcrypt      = require("bcryptjs");
const bcryptSalt  = 10;

router.get('/users', (req, res, next) => {
    User.find()
    .then( users => res.json(users))
    .catch( err => console.log(err));
})

router.get('/user-id/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then( user => res.json(user))
    .catch( err => console.log(err));
})

router.post('/delete-user/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then( deletedUser => res.status(200).json(deletedUser))
    .catch( err => console.log(err));
})

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


router.post("/edit-user", (req, res, next) => {
    console.log('helloo');


    console.log('req.body: ', req.body);

    const theEmail = req.body.email;
    const theUsername = req.body.username;
    const theId = req.body._id;

    if (theUsername === "" || theEmail === "" || theId === "") {
        res.status(400).json({ message: 'Missing username, email, or id' });
        return;
    }

    User.findOneAndUpdate(
        { _id: theId },
        { $set: { email: theEmail, username: theUsername } }
    )
    .then(oldUser => {

        const newId = oldUser._id;

        User.findOne(
            { _id: newId }
        )
        .then(newUser => {
            res.json(newUser)
        })
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))

});


router.post('/login', passport.authenticate("local"), (req, res) => {
    console.log(req.user);
    res.json(req.user);
});


router.post("/logout", (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Success' });
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
