ссылка на pr - https://github.com/Lisowez/CRUD/pull/1


Crud api
Description
Crud api is a simple server-side application which uses in-memory database underneath.

The program development mode is started in following way:

npm run start:dev
The program production mode is started, builds bundle and starts an application bundle in following way:

npm run start:prod
Implementation details
Implemented endpoint api/users:
GET api/users is used to get all persons
Server answers with status code 200 and all users records
GET api/users/{userId}
Server answers with status code 200 and record with id === userId if it exists
Server answers with status code 400 and corresponding message if userId is invalid (not uuid)
Server answers with status code 404 and corresponding message if record with id === userId doesn't exist
POST api/users is used to create record about new user and store it in database
Server answers with status code 201 and newly created record
Server answers with status code 400 and corresponding message if request body does not contain required fields
PUT api/users/{userId} is used to update existing user
Server answers with status code 200 and updated record
Server answers with status code 400 and corresponding message if userId is invalid (not uuid)
Server answers with status code 404 and corresponding message if record with id === userId doesn't exist
DELETE api/users/{userId} is used to delete existing user from database
Server answers with status code 204 if the record is found and deleted
Server answers with status code 400 and corresponding message if userId is invalid (not uuid)
Server answers with status code 404 and corresponding message if record with id === userId doesn't exist
Users are stored as objects that have following properties:
id — unique identifier (string, uuid) generated on server side
username — user's name (string, required)
age — user's age (number, required)
hobbies — user's hobbies (array of strings or empty array, required)
On requests to non-existing endpoints (e.g. some-non/existing/resource) server answers with status code 404 and corresponding human-friendly message
On errors on the server side that occur during the processing of a request server answers with status code 500 and corresponding human-friendly message
Value of port on which application is running is stored in .env file
TO BE IMPLEMENTED IN FUTURE:
There are some tests for API. Examples of test scenario:
Get all records with a GET api/users request (an empty array is expected)
A new object is created by a POST api/users request (a response containing newly created record is expected)
With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)
We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)
With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)
With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)
There is implemented horizontal scaling for application, there npm script start:multi starts multiple instances of your application using the Node.js Cluster API (equal to the number of available parallelism - 1 on the host machine, each listening on port PORT + n) with a load balancer that distributes requests across them (using Round-robin algorithm). For example: available parallelism is 4, PORT is 4000. On run npm run start:multi it works following way
On localhost:4000/api load balancer is listening for requests
On localhost:4001/api, localhost:4002/api, localhost:4003/api workers are listening for requests from load balancer
When user sends request to localhost:4000/api, load balancer sends this request to localhost:4001/api, next user request is sent to localhost:4002/api and so on.
After sending request to localhost:4003/api load balancer starts from the first worker again (sends request to localhost:4001/api)
State of db consistents between different workers, for example:
First POST request addressed to localhost:4001/api creates user
Second GET request addressed to localhost:4002/api returns created user
Third DELETE request addressed to localhost:4003/api deletes created user
Fourth GET request addressed to localhost:4001/api returns 404 status code for created user
