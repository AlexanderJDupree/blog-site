CREATE USER blogsite WITH PASSWORD 'blogsite';
CREATE DATABASE blogsite;
CREATE DATABASE test_blogsite;
GRANT ALL PRIVILEGES ON DATABASE blogsite TO blogsite;
GRANT ALL PRIVILEGES ON DATABASE test_blogsite TO blogsite;