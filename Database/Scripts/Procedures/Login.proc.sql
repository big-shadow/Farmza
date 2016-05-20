DELIMITER $$

CREATE PROCEDURE Login (p_email CHAR, p_password CHAR, OUT success BOOL)
BEGIN
	DECLARE v_salt CHAR;
	DECLARE v_password CHAR;
	DECLARE counter INT;

	SET v_password = p_password;
	SET counter = 0;

	SELECT salt INTO v_salt FROM UserCredentials WHERE email = p_email;

	SET v_password = PASSWORD(CONCAT(v_password, v_salt));

	SET success = EXISTS(SELECT 1 FROM UserCredentials WHERE email = p_email AND `password` = v_password);
END;$$

