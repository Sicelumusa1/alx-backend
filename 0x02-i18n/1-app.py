#!/usr/bin/env python3

"""
Setup a basic Flask app
"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)

class Config:
    """
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE ='en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

babel = Babel(app)
app.config.from_object(Config)

@app.route("/")
def index():
    """
    renders index.html
    """
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
