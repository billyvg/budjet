from time import mktime
from datetime import datetime

from flask import Flask
from flaskext.sqlalchemy import SQLAlchemy

from models import db
from models.user import User

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    reoccurs = db.Column(db.Integer)
    description = db.Column(db.String(500))
    added_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#    user = db.relationship('User',
#            backref=db.backref('transactions', lazy='dynamic'))

    @staticmethod
    def add(transaction):
        try:
            db.session.add(transaction)
            db.session.commit()
        except:
            abort(500)

    @staticmethod
    def get(id=None):
        try:
            if id:
                t = Transaction.query.get(id)
            else:
                t = Transaction.query.all()
            return t
        except:
            abort(404)


    @staticmethod
    def delete(id):
        try:
            db.session.delete(Transaction.get(id))
            db.session.commit
        except:
            raise Exception('Error deleting record with id: %d' % id)

    def __init__(self, amount, reoccurs=0, added_date=None, **kwargs):
        self.amount = amount
        self.reoccurs = reoccurs
        if added_date is None:
            added_date = datetime.utcnow()
        self.added_date = added_date
        self.updated_date = datetime.utcnow()

        for name, val in kwargs.iteritems():
            setattr(self, name, val)


    def serialize(self):
        return {
            'amount': self.amount,
            'reoccurs': self.reoccurs,
            'added_date': int(mktime(self.added_date.timetuple())*1000),
            'description': self.description,
        }

    def __repr__(self):
        return '<Transaction $%d (Reoccurs: %d)>' % (self.amount, self.reoccurs)

