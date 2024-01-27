# DataBank
The name of my application is dataBank

The default admin details:
Email: admin@yahoo.com
Password: Password

What i was able to do so far?
i created an apealing UI and i also mocked my backend by using
JSON-SERVER(You can refer to this resources: https://www.npmjs.com/package/json-server). 
I handled validations for my input fields
and i also created endpoints with my mocked
JSON-server which is running on my local machine
to create user, login user... check if details|
are valid and throwing the correct response about
each of the action called.

i was able to created a mocked admin details
the admin approve first user and the user becomes
an admin automatically and approve the next other user 
that comes in and the loop continues.

i was able to dynamically show the users that belongs
to the admin that approve such users l.e, an admin will
only see users that he/she approved

Issues encoutered: I was faced with node version issue.
my node version was node 16, but the JSON-server did not
install completely on node 16, i have to get a higher node with the 
help of NVM, i was able to switch to a higher node version.

and also, coding out design with my head without a figma design 
actually made the work slower but i was able to
figure it out.


when running the project:
After clonning the project, Please run NPM install 
and ensure everything installed very well.
Also, please run a node version that is above 16 so that JSON-SERVER can install 
properly, you can make use of NVM to switch between node versions without stress
(you can refer to this material: https://codedamn.com/news/nodejs/nvm-installation-setup-guide)

after all installation has been done succesfully:
run this command to start the JSON server on one terminal:json-server --watch db.json
if it doesnt create the db.json file automatically, kindly create it to see the data as you use the 
JSON-server

then open a new tab to run angular project using: ng serve

if there are any issues running it, kindly let me know so i can provide more
details. 
