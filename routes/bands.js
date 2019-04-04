var express = require('express');
var app = express();
//
// CREATE TABLE bands(
//     band_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(40) NOT NULL,
//     number_of_members INT NOT NULL,
//     music_genre VARCHAR(40) NOT NULL);

// SHOW LIST OF Bands
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM bands ORDER BY band_id DESC',function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('band/list', {
                    title: 'Band List',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('band/list', {
                    title: 'Band List',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD BAND FORM
app.get('/add', function(req, res, next){
    // render to views/band/add.ejs
    res.render('band/add', {
        title: 'Add New User',
        name: '',
        number_of_members: '',
        music_genre: ''
    })
});

// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){
    req.assert('name', 'Name is required').notEmpty();
    req.assert('music_genre', 'Genre is required').notEmpty();

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!
        var user = {
            name: req.sanitize('name').escape().trim(),
            number_of_members: req.sanitize('number_of_members').escape().trim(),
            music_genre: req.sanitize('music_genre').escape().trim()
        }

        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO bands SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/band/add.ejs
                    res.render('band/add', {
                        title: 'Add New User',
                        name: user.name,
                        number_of_members: user.number_of_members,
                        music_genre: user.music_genre
                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    // render to views/band/add.ejs
                    res.render('band/add', {
                        title: 'Add New User',
                        name: '',
                        number_of_members: '',
                        music_genre: ''
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name
         * because req.param('name') is deprecated
         */
        res.render('band/add', {
            title: 'Add New User',
            name: req.body.name,
            number_of_members: req.body.number_of_members,
            music_genre: req.body.music_genre
        })
    }
})

// SHOW EDIT USER FORM
app.get('/edit/(:band_id)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM bands WHERE band_id = ?', [req.params.band_id], function(err, rows, fields) {
            if(err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Bnad not found with band_id = ' + req.params.band_id)
                res.redirect('/bands')
            }
            else { // if user found
                // render to views/band/edit.ejs template file
                res.render('band/edit', {
                    title: 'Edit User',
                    //data: rows[0],
                    band_id: rows[0].band_id,
                    name: rows[0].name,
                    number_of_members: rows[0].number_of_members,
                    music_genre: rows[0].music_genre
                })
            }
        })
    })
})

// EDIT USER POST ACTION
app.put('/edit/(:band_id)', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty();
    req.assert('number_of_members', 'Age is required').notEmpty();

    var errors = req.validationErrors();

    if( !errors ) {   //No errors were found.  Passed Validation!

        /********************************************
         * Express-validator module

         req.body.comment = 'a <span>comment</span>';
         req.body.username = '   a user    ';

         req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
         req.sanitize('username').trim(); // returns 'a user'
         ********************************************/
        var user = {
            name: req.sanitize('name').escape().trim(),
            number_of_members: req.sanitize('number_of_members').escape().trim(),
            music_genre: req.sanitize('music_genre').escape().trim()
        }

        req.getConnection(function(error, conn) {
            conn.query('UPDATE bands SET ? WHERE band_id = ' + req.params.band_id, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/band/add.ejs
                    res.render('band/edit', {
                        title: 'Edit User',
                        band_id: req.params.band_id,
                        name: req.body.name,
                        number_of_members: req.body.number_of_members,
                        music_genre: req.body.music_genre
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    // render to views/band/add.ejs
                    res.render('band/edit', {
                        title: 'Edit User',
                        band_id: req.params.band_id,
                        name: req.body.name,
                        number_of_members: req.body.number_of_members,
                        music_genre: req.body.music_genre
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name
         * because req.param('name') is deprecated
         */
        res.render('band/edit', {
            title: 'Edit User',
            band_id: req.params.band_id,
            name: req.body.name,
            number_of_members: req.body.number_of_members,
            music_genre: req.body.music_genre
        })
    }
})

// DELETE USER
app.delete('/delete/(:band_id)', function(req, res, next) {
    var band = { band_id: req.params.band_id }

    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM bands WHERE band_id = ' + req.params.band_id, band, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to bands list page
                res.redirect('/bands')
            } else {
                req.flash('success', 'User deleted successfully! band_id = ' + req.params.band_id)
                // redirect to bands list page
                res.redirect('/bands')
            }
        })
    })
})

module.exports = app
