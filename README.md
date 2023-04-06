# awair-assignment

![Python](https://img.shields.io/badge/python-3.9.1-blue.svg)

Coding assignment for application at Awair.

## The Assignment

Create a simple User Management Application that provides the following functionalities

- Create a User
- Delete a User
- List All User


### Part 1 - Create Tables and Services
1. Create the following table User

- id
- name
- email
- password

2. Create a web service for the following actions
    1. Create a user
    2. Delete a user
    3. List all users and a single user

### Part 2 - Create a web page that does the following

- Calls list All user API on page load
- Renders a list of users with the following information:
  1. Name
  2. Email
- Displays a delete button for each user that calls your delete service
- Add a form to create new users with the following elements: inputs to enter name and email (with placeholder)
- Submit button to does the following:
  1. Makes API call to create the user
  2. Empties the text fields
  3. Adds the newly created user to the page


Required technologies

Backend: Go, Python or Nodejs

Frontend: React


## Specs
### Backend
* Django
* Django-Rest-Framework
* SQLite

### Frontend
* React
* Redux
* Material UI


## Dependency

### Backend
```bash
$ pip install -r requirements.txt
```

### Frontend
```bash
$ yarn install
```


## Run

### Backend
```bash
$ python manage.py runserver
```

### Frontend
```bash
$ yarn start
```


## Tests
```bash
$ python manage.py test
```


## Motivation
### Soft Delete
To keep history of the user data, I decided to add deleted_at field and update this one instead of deleting the row in DB.

### UUID
So who ever can see the API calls can't just retrieve user details by assuming the ID of the preceding/following user.

### [DEPRECATED] React in browser
To save time and not set up a full frontend project, I loaded React and other JS libraries directly from the CDN.

### Environment variables
For the sake of POC, the env file containing the variables is included in the repository. Should be removed and injected at deployment.

## Todo Improvements
### Backend
- Dockerfile
- Move statics to a CDN instead of having them in the repository.
- More from SQLite to a separated RDBMS like MySQL or Postgres.
- API Documentation endpoint

### Frontend
- ~~Move frontend into its own project so we can refactorize the code using Typescript.~~
- ~~Use Formik and Yup for the user create Form validation.~~
- Unit tests using Jest and React-Testing-Library
- Pagination
