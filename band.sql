CREATE DATABASE bandSocialMedia;
USE bandSocialMedia;

CREATE TABLE accounts(
    user_id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL UNIQUE; 
    first_name VARCHAR(40) NOT NULL;
    last_name VARCHAR(40) NOT NULL;
    pw VARCHAR(20) NOT NULL;
    PRIMARY KEY(userid),
);

CREATE TABLE instruments(
	instrument_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(40) NOT NULL,
    instrument VARCHAR(40) NOT NULL);
)

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



