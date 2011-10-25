from flask import Flask
from flaskext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://'
db = SQLAlchemy(app)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    reoccurs = db.Column(db.Integer)
    description = db.Column(db.String(500))

    def __init__(self, amount, reoccurs=0, **kwargs):
        self.amount = amount
        self.reoccurs = reoccurs

    def __repr__(self):
        return '<Transaction $%d (Reoccurs: %d)' % (self.amount, self.reoccurs)


