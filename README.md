A simple budgeting app that is hosted on Heroku.

What you need to get it running (kinda follow this guide
http://devcenter.heroku.com/articles/python):

Download Heroku's command-line client over at
http://devcenter.heroku.com/articles/python

You must have: Python v2.7, virtualenv, and pip

(Install these packages via your OS package manager)

Clone this repo somewhere

```
cd ~/development
git clone https://github.com/billyvg/Budjet
```

Create a virtualenv

```
virtualenv --no-site-packages .
source bin/activate
```

Install python library dependencies

```
pip install -r requirements.txt
```


You should be able to run this app now using

```
foreman start
```
