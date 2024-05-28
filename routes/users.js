var express = require('express')
var app = express()

// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		if(error) throw error;

		conn.query('SELECT * FROM users ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				console.log(err)
			} /* else {
				// render to views/user/list.ejs template file
				res.render('user/list', {
					title: 'User List', 
					data: rows
				})
			} */
			res.send(200, {data: rows})
		})
	})
})

// SHOW ADD USER FORM
/* app.get('/add', function(req, res, next){	
	// render to views/user/add.ejs
	res.render('user/add', {
		title: 'Add New User',
		name: '',
		age: '',
		email: ''		
	})
}) */

// A simple JSON method on user route
app.get('/json', function(req, res, next){	
	req.getConnection(function(error, conn) {
		if(error) throw error;

		conn.query('SELECT * FROM users ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				console.log(err)
			} else {
				res.json({
					count: rows?.length
				})
			}
		})
	})
})

// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next) {	
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('age', 'Age is required').notEmpty()             //Validate age
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()
    
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
			age: req.sanitize('age').escape().trim(),
			email: req.sanitize('email').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO users SET ?', user, function(err, result) {
				//if(err) throw err
				if (err) {
					throw err
					
					// render to views/user/add.ejs
					/* res.render('user/add', {
						title: 'Add New User',
						name: user.name,
						age: user.age,
						email: user.email					
					}) */
				} else {				
					// req.flash('success', 'Data added successfully!')
					
					// render to views/user/add.ejs
					/* res.render('user/add', {
						title: 'Add New User',
						name: '',
						age: '',
						email: ''					
					}) */
					res.send(201, "User added successfully")
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		// req.flash('error', error_msg)
		res.send(400, error_msg)
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */
        /* res.render('user/add', {
            title: 'Add New User',
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }) */
    }
})

// EDIT USER POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('age', 'Age is required').notEmpty()             //Validate age
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()
    
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
			age: req.sanitize('age').escape().trim(),
			email: req.sanitize('email').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE users SET ? WHERE id = ' + req.params.id, user, function(err, result) {
				console.log('result: ', err)
				//if(err) throw err
				if (err) {
					// req.flash('error', err)
					throw err
					
					// render to views/user/add.ejs
					/* res.render('user/edit', {
						title: 'Edit User',
						id: req.params.id,
						name: req.body.name,
						age: req.body.age,
						email: req.body.email
					}) */
				} else {
					// req.flash('success', 'Data updated successfully!')
					
					// render to views/user/add.ejs
					/* res.render('user/edit', {
						title: 'Edit User',
						id: req.params.id,
						name: req.body.name,
						age: req.body.age,
						email: req.body.email
					}) */
					res.send(200, "User updated successfully")
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		// req.flash('error', error_msg)
		res.send(400, error_msg)
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        /* res.render('user/edit', { 
            title: 'Edit User',            
			id: req.params.id, 
			name: req.body.name,
			age: req.body.age,
			email: req.body.email
        }) */
    }
})

// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {
	var user = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM users WHERE id = ' + req.params.id, user, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to users list page
				res.redirect('/users')
			} else {
				req.flash('success', 'User deleted successfully! id = ' + req.params.id)
				// redirect to users list page
				res.redirect('/users')
			}
		})
	})
})

module.exports = app
