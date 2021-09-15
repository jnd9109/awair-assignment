from awair.settings.base import *
import environ

env = environ.Env()
# reading .env file
environ.Env.read_env()

SECRET_KEY = env("SECRET_KEY")
MODE = env("MODE", default='dev').lower()

if MODE == 'prod':
    pass
else:  # dev
    DEBUG = True
