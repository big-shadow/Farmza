INSERT INTO Farms (`name`, addressid) VALUES ('Rays Farm', 4);

INSERT INTO UserCredentials (email, `password`, salt) VALUES ('ray@customer.com', 'password', 'salt');
INSERT INTO UserCredentials (email, `password`, salt, usertype) VALUES ('ray@farm.com', 'password', 'salt', 'Farmer');

INSERT INTO Sessions (usercredentialsid) VALUES (1); 
INSERT INTO Sessions (usercredentialsid, token) VALUES (2,'0b9da19efefb11e5b4cdfcaa14e66c2b'); 