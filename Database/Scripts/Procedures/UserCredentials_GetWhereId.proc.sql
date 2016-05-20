DELIMITER $$

CREATE PROCEDURE UserCredentials_GetWhereId(p_id CHAR)
BEGIN
	SELECT DISTINCT * FROM UserCredentials WHERE usercredentialsid = p_id;
END;$$