import os, sys

from flask import Flask, render_template, jsonify

from models.transaction import Transaction

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

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


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)



