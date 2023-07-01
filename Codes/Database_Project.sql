ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'passwd';
flush privileges;
use dbms;
show tables;
select * from user_details;