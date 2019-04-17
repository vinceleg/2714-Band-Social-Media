var config = {
	database: {
		host:	  'bandsocialmedia.cgxvoqdz5ubf.us-east-2.rds.amazonaws.com', 	// database host
		user: 	  'root', 		// your database username
		password: 'password', 		// your database password
		port: 	  3306, 		// default MySQL port
		db: 	  'bandSocialMedia' ,		// your database name
		queueLimit : 0,
		connectionLimit: 0
	},
	server: {
		host: '127.0.0.1',
		port: '3000'
	}
}

module.exports = config
