DELIMITER $$

CREATE PROCEDURE Sessions_GetUserWhereToken(p_token CHAR(32))
BEGIN
	DECLARE v_UserType VARCHAR(40);
    DECLARE v_UserId INT;

	SELECT UC.usertype, UC.usercredentialsid INTO v_UserType, v_UserId FROM UserCredentials UC
    INNER JOIN Sessions S ON S.usercredentialsid = UC.usercredentialsid
    WHERE S.token = p_token;
    
    IF v_UserType = 'Farmer' THEN
    
		SELECT DISTINCT 
			F.farmid,
			F.`name`,
			F.addressid,
			FA.farmerid,
			FA.firstname,
			FA.lastname,
			FA.farmertype,
			UC.usercredentialsid,
			UC.usertype
		FROM Farms F
		INNER JOIN Farmers FA ON F.farmid = FA.farmid
		INNER JOIN UserCredentials UC ON FA.usercredentialsid = UC.usercredentialsid
		WHERE UC.usercredentialsid = v_UserId;
        
    ELSEIF v_UserType LIKE '%Customer%' THEN
    
		SELECT * FROM Customers C
        INNER JOIN UserCredentials UC ON UC.usercredentialsid = C.usercredentialsid
        WHERE UC.usercredentialsid = v_UserId;
        
	END IF;
    
END;$$

CALL Sessions_GetUserWhereToken('cd2b32fdff4011e59211fcaa14e66c2b');
