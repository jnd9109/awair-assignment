from awair.settings.base import *
import environ

env = environ.Env()
# reading .env file
environ.Env.read_env()

SECRET_KEY = env("SECRET_KEY")
MODE = env("MODE", default='dev').lower()

if MODE == 'prod':
    #  Django
    ALLOWED_HOSTS = [
        '127.0.0.1',
    ]

    #  Django CORS
    CORS_ALLOWED_ORIGINS = [
        '127.0.0.1',
    ]

else:  # dev
    #  Django
    DEBUG = True

    #  Django CORS
    CORS_ALLOW_ALL_ORIGINS = True
