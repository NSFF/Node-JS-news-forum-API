# project2-nodejs-robinVanCraenenbroek

# Software

Versions:
* mysql: 8.0.27 for Win64 on x86_64
* node.js: 16.15.1 (older version like 12.x.x are also fine)
* npm

Packages:

* express: 4.18.1
* mysql: 2.18.1
* express-validator: 6.14.2

DevPackages:

* nodemon: 2.0.19

# Setting up the project

Make sure your MySQL server is up and running. This project database structure is the same as my Laravel project. So you could use the migrations from my laravel project for this one. If not, you can copy the model structures in my model files.

Edit your mysql credentials in src/config.js file to connect to your mysql database.

* If you cannot connect to your mysql on Windows, make sure your MySQL80 service in windows services is running.
* If you get an error: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client' please follow the guide in the following link to fix it: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

To start the express webserver, go to the project directory and enter the following command:
```
npm start
```
If this does not work use the following command:
```
node ./src/index.js
```

# Testing the project

You can test the project's API by using Postman. https://www.postman.com/
You can find all possible API call examples in the routes files. (commentRoutes.js and postRoutes.js)

# Known bugs

* The created_at and updated_at attributes in my database tables is using the incorrect timezone by -2hours. I am not sure if this is a problem with my computer timezone settings or if it's a code issue.

* When I update a post/comment, the postman website keeps on "request loading" forever, even though the data does get updated on my mysql database. (this bug should be a postman issue with my browser extensions according to stackoverflow) This issue should not be caused by my code, but I still mention it to be sure.


# References

* Installing Express: https://expressjs.com/en/starter/installing.html
* Getting started on webpack: https://webpack.js.org/guides/getting-started/
* Setting up nodemon: https://stackoverflow.com/questions/43152968/nodemon-not-refreshing-browser-in-react-express-node-app
* NodeJs basic tutorial made by Teacher Kevin Felix in the course material of Web integration: https://canvas.ehb.be/courses/22733/pages/nodejs-basic-api-oefeningen?module_item_id=335242
* Helped with setting up the project for MySql express api's: https://blog.logrocket.com/build-rest-api-node-express-mysql/#setting-up-expressjs-for-our-rest-api
* I inspired my code a lot on this Tutorial that helped me fix a bug where I could not display my queries: https://www.bezkoder.com/node-js-rest-api-express-mysql/
* formatting javascript datetime to mysql: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
* Helped me a lot on making the validator: https://stackoverflow.com/questions/47311713/using-express-validator-as-express-middle-ware-not-working
* Helped me with implementing the offset and limit: https://stackoverflow.com/questions/40062035/node-js-express-routes-userslimit-20offset-0