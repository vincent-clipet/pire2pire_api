##### Create user
CREATE ROLE pire2pire_role WITH PASSWORD '[password_here]';

##### Give privileges to user
GRANT ALL PRIVILEGES ON SCHEMA public to pire2pire_role;
ALTER ROLE pire2pire_role WITH LOGIN CREATEDB;
GRANT pg_read_all_data TO pire2pire_role;
GRANT pg_write_all_data TO pire2pire_role;

##### Create DB, and change its ownership
CREATE DATABASE pire2pire; 
ALTER DATABASE pire2pire OWNER TO pire2pire_role;