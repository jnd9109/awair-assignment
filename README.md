# awair-assignment

![Python](https://img.shields.io/badge/python-3.9.1-blue.svg)

Coding assignment for application at Awair.

## Specs
### Backend
* Django 3.2.1
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

### Frontend
- ~~Move frontend into its own project so we can refactorize the code using Typescript.~~
- ~~Use Formik and Yup for the user create Form validation.~~
- Unit tests using Jest and Enzyme
- Pagination
