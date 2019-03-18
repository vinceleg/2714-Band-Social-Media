CREATE TABLE accounts(
    userid INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL UNIQUE; 
    first_name VARCHAR(40) NOT NULL;
    last_name VARCHAR(40) NOT NULL;
    pw VARCHAR(20) NOT NULL;
    PRIMARY KEY(userid),
);
