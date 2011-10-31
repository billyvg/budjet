import os, sys
from datetime import datetime

from flask import Flask
from flaskext.sqlalchemy import SQLAlchemy

from models import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(250))
    added_date = db.Column(db.DateTime)

    def __init__(self, name, email, added_date=None, **kwargs):
        self.name = name
        self.email = email
        if added_date is None:
            added_date = datetime.utcnow()
        self.added_date = added_date

        for name, val in kwargs.iteritems():
            self.__setattr__(name, val)

    def __repr__(self):
        return '<User %s>' % (self.name, )

