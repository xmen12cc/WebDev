let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let User = require('../../models/users');

module.exports.displayUserList = (req, res, next) => {
    User.find((err, UserList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(UserList);

            res.render('User/list', {title: 'Users', UserList: UserList});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('user/add', {title: 'Add user'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newUser = User({
        "username": req.body.username,
        "email": req.body.email,
    });

    User.create(newUser, (err, User) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the User list
            res.redirect('/user-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let username = req.params.username;

    User.findByUsername(username, (err, UserToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('user/edit', {title: 'Edit user', User: UserToEdit})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let username = req.params.username

    let updatedUser = User({
        "username": username,
        "email": req.body.email,
    });

    User.updateOne({_username: username}, updatedUser, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the User list
            res.redirect('/user-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let username = req.params.username;

    User.remove({_username: username}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the User list
             res.redirect('/user-list');
        }
    });
}
