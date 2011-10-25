import os
from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

# TODO: refactor this shit into its own python module, don't
# know the terminology for this for flask.
# Our RESTful API

@app.route("/transaction/add", methods=["POST"])
def add_transaction():
    # adds a transaction
    pass

@app.route("/transaction/<int:trans_id>")
def get_transaction(trans_id):
    # fetch transaction via id
    pass

@app.route("/transaction/<int:trans_id>/delete", methods=["DELETE"])
def delete_transaction(trans_id):
#deletes a transaction
    pass

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



