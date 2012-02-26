import os, sys

from flask import Flask, request, render_template, jsonify, session, json
from models.transaction import Transaction
import requests

app = Flask(__name__)
app.config.from_pyfile('settings.py', silent=True)

if os.environ.get("APP_ENV") != "PROD":
    app.debug = True

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route("/jasmine")
def jasmine_test():
    return render_template("tests/jasmine.html")

@app.route("/logout")
def logout():
    session.pop('user_id', None)
    session.pop('user_fb_profile', None)
    return redirect(url_for('index'))

# TODO: refactor this shit into its own python module, don't
# know the terminology for this for flask.
# Our RESTful API
@app.route("/transaction")
def get_transactions():
    try:
        return jsonify(transactions=[i.serialize() for i in Transaction.get()])
    except:
        abort(404)
    pass

@app.route("/transaction/<int:trans_id>")
def get_transaction(trans_id):
    # fetch transaction via id
    try:
        t = Transaction.get(trans_id)
        return jsonify(t.serialize())
    except:
        abort(404)

@app.route("/transaction/add", methods=["POST"])
def add_transaction():
    t = Transaction(request.form['amount'], request.form['reoccurs'],
            description=request.form['description'])
    Transaction.add(t)
    # adds a transaction
    pass


@app.route("/transaction/<int:trans_id>/delete", methods=["DELETE"])
def delete_transaction(trans_id):
    #deletes a transaction
    try:
        Transaction.delete(trans_id)
    except:
        abort(404)

@app.route("/transaction/<int:trans_id>/update", methods=["PUT"])
def update_transaction(trans_id):
    #updates a transaction
    pass


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        do_login()
    else:
        show_login_form()

def _get_fb_cookie(request):
    try:
        cookie = request.cookies.get('fbs_%s' % app.config['FACEBOOK_APP_ID'])
        fb_dict = dict(item.split('=') for item in cookie.split('&'))
        cookie_sig = fb_dict['sig']
        del fb_dict['sig']

        if hashlib.md5(''.join(
            ['%s=%s' % (k, v) for k, v in sorted(fb_dict.iteritems())]
            ) + app.config['FACEBOOK_APP_SECRET']).hexdigest() == cookie_sig:
            return fb_dict
        else:
            raise Exception('Cookie is not valid')
    except:
        raise Exception('Cookie not found')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)



