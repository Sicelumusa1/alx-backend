#!/usr/bin/env python3

"""
Setup a basic Flask app
"""

from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)


class Config:
    """
    config for Flask app
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


babel = Babel(app)
app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """
    """
    requested_locale = request.args.get('locale')

    if requested_locale and requested_locale in app.config['LANGUAGES']:
        return requested_locale
    return app.config['BABEL_DEFAULT_LOCALE2']


@app.route("/")
def index():
    """
    renders index.html
    """
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
