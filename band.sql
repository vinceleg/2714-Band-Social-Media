CREATE DATABASE bandSocialMedia;
USE bandSocialMedia;

CREATE TABLE users(
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(40) UNIQUE NOT NULL, 
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    pw VARCHAR(20) NOT NULL
);

CREATE TABLE instruments(
	instrument_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(40) NOT NULL,
    instrument VARCHAR(40) NOT NULL);

CREATE TABLE bands(
	band_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    number_of_members INT NOT NULL,
    music_genre VARCHAR(40) NOT NULL);


CREATE TABLE events(
	event_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    location VARCHAR(60) NOT NULL,
    date VARCHAR (40) NOT NULL,
    organizer_id INT NOT NULL);
    
CREATE TABLE bands_events(
	band_id INT NOT NULL,
	event_id INT NOT NULL,
	confirmed TINYINT(4),
	FOREIGN KEY (band_id) REFERENCES bands (band_id),
	FOREIGN KEY (event_id) REFERENCES events (event_id),
	PRIMARY KEY (band_id, event_id)
);

CREATE TABLE bands_events(
band_id INT NOT NULL,
event_id INT NOT NULL,
confirmed TINYINT,
FOREIGN KEY (band_id) REFERENCES bands (band_id),
FOREIGN KEY (event_id) REFERENCES events (event_id),
PRIMARY KEY (band_id, event_id)
);

CREATE TABLE users_bands(
	user_id INT NOT NULL,
    band_id INT NOT NULL,
    confirmed TINYINT,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (band_id) REFERENCES bands (band_id),
    PRIMARY KEY (user_id, band_id)
);

CREATE TABLE users_instruments(
	user_id INT NOT NULL,
    instrument_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (instrument_id) REFERENCES instruments (instrument_id),
    PRIMARY KEY (user_id, instrument_id)
);



