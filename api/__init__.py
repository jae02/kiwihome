from flask import Flask
from datetime import datetime
from flask import Flask, render_template, request

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

from api import pages
from api import rest
from api import terms
from api import member
from api import log
from api import delete_box
from api import category
from api import stock
from api import question
from api import message
from api import consult
from api import review
from api import board
from api import storeapi
from api import store
from api import jay02

app.run(host='0.0.0.0', port=5222, debug=True)
