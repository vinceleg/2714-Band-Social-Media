var express = require('express');
var app = express();
//
// CREATE TABLE events(
//     event_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(40) NOT NULL,
//     location INT NOT NULL,
//     date VARCHAR(40) NOT NULL);

// SHOW LIST OF events
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM events ORDER BY event_id DESC',function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('event/list', {
                    title: 'event List',
                    data: ''
                })
            } else {
                // render to views/event/list.ejs template file
                res.render('event/list', {
                    title: 'event List',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD event FORM
app.get('/add', function(req, res, next){
    // render to views/event/add.ejs
    res.render('event/add', {
        title: 'Add New event',
        name: '',
        location: '',
        date: ''
    })
});

// ADD NEW event POST ACTION
app.post('/add', function(req, res, next){
    req.assert('name', 'Name is required').notEmpty();
    req.assert('location', 'Location is required').notEmpty();
    req.assert('date', 'Date is required').notEmpty();

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!
        var event = {
            name: req.sanitize('name').escape().trim(),
            location: req.sanitize('location').escape().trim(),
            date: req.sanitize('date').escape().trim()
        }

        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO events SET ?', event, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/event/add.ejs
                    res.render('event/add', {
                        title: 'Add New event',
                        name: event.name,
                        location: event.location,
                        date: event.date
                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    // render to views/event/add.ejs
                    res.render('event/add', {
                        title: 'Add New event',
                        name: '',
                        location: '',
                        date: ''
                    })
                }
            })
        })
    }
    else {   //Display errors to event
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name
         * because req.param('name') is deprecated
         */
        res.render('event/add', {
            title: 'Add New event',
            name: req.body.name,
            location: req.body.location,
            date: req.body.date
        })
    }
})

// SHOW EDIT event FORM
app.get('/edit/(:event_id)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM events WHERE event_id = ?', [req.params.event_id], function(err, rows, fields) {
            if(err) throw err

            // if event not found
            if (rows.length <= 0) {
                req.flash('error', 'Event not found with event_id = ' + req.params.event_id)
                res.redirect('/events')
            }
            else { // if event found
                // render to views/event/edit.ejs template file
                res.render('event/edit', {
                    title: 'Edit event',
                    //data: rows[0],
                    event_id: rows[0].event_id,
                    name: rows[0].name,
                    location: rows[0].location,
                    date: rows[0].date
                })
            }
        })
    })
})

// EDIT event POST ACTION
app.put('/edit/(:event_id)', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty();
    req.assert('location', 'Age is required').notEmpty();

    var errors = req.validationErrors();

    if( !errors ) {   //No errors were found.  Passed Validation!

        /********************************************
         * Express-validator module

         req.body.comment = 'a <span>comment</span>';
         req.body.eventname = '   a event    ';

         req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
         req.sanitize('eventname').trim(); // returns 'a event'
         ********************************************/
        var event = {
            name: req.sanitize('name').escape().trim(),
            location: req.sanitize('location').escape().trim(),
            date: req.sanitize('date').escape().trim()
        }

        req.getConnection(function(error, conn) {
            conn.query('UPDATE events SET ? WHERE event_id = ' + req.params.event_id, event, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/event/add.ejs
                    res.render('event/edit', {
                        title: 'Edit event',
                        event_id: req.params.event_id,
                        name: req.body.name,
                        location: req.body.location,
                        date: req.body.date
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    // render to views/event/add.ejs
                    res.render('event/edit', {
                        title: 'Edit event',
                        event_id: req.params.event_id,
                        name: req.body.name,
                        location: req.body.location,
                        date: req.body.date
                    })
                }
            })
        })
    }
    else {   //Display errors to event
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name
         * because req.param('name') is deprecated
         */
        res.render('event/edit', {
            title: 'Edit event',
            event_id: req.params.event_id,
            name: req.body.name,
            location: req.body.location,
            date: req.body.date
        })
    }
})

// DELETE event
app.delete('/delete/(:event_id)', function(req, res, next) {
    var event = { event_id: req.params.event_id }

    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM events WHERE event_id = ' + req.params.event_id, event, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to events list page
                res.redirect('/events')
            } else {
                req.flash('success', 'event deleted successfully! event_id = ' + req.params.event_id)
                // redirect to events list page
                res.redirect('/events')
            }
        })
    })
})

module.exports = app
