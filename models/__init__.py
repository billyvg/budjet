import os, sys

from flask import Flask
from flaskext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
try:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
except KeyError:
    print sys.exc_info()
    print "Error Configuring DB: Check your environment variables."

db = SQLAlchemy(app)
