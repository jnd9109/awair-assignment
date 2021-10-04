import random
import string

from passlib.hash import bcrypt


def generate_password(password_length=12):
    password = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(password_length))
    hashed_password = bcrypt.hash(password)
    return password, hashed_password
