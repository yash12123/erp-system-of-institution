# erp-system-of-institution

The main objective of this project was to develop an integrated system that provides real-time data and insights to all stakeholders, including employees, staffs, and student.
Install Node.js:

Go to the official Node.js website and download the version that is appropriate for your operating system.
Follow the installation instructions to complete the installation process.
Verify Node.js installation:

Open a command prompt or terminal.
Type 'node -v' and press enter.
The installed version of Node.js should be displayed.
Navigate to your source code folder:

Open a command prompt or terminal.
Use the cd command followed by the path to the 'client-side' folder.

Install dependencies:

Once you are inside the 'client-side' folder, type 'npm i' and press enter.
This will install all the dependencies required for the project.
Start the React frontend:

After installing the dependencies, type 'npm start' and press enter.
This will start the React frontend of the project.
Note: If you want to see a list of all available npm commands, type npm and press enter.

setup the database

install mysql

<SETUP DB>

In the .env file, fill in the following details appropriately:
host="localhost"
user="root"
password="passwd"
database="dbms"
PORT=7001

Insert your own mysql password here.

Now you can insert in database with registering at the homepage of the erp website.

then run the server

for running the server

Open a command prompt or terminal.
Use the cd command followed by the path to the 'server-side' folder.

Install dependencies:

Once you are inside the 'server-side' folder, type 'npm i' and press enter.
This will install all the dependencies required for the project.
Start the Express backend:

npm run start

this should run the server...

> server-side@1.0.0 start
> node server.js

listening to the port 7001
