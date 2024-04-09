#!/usr/bin/env python3

"""
Setup a basic Flask app
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel
from typing import Optional, Dict


app = Flask(__name__)


class Config:
    """
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE ='en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

babel = Babel(app)
app.config.from_object(Config)

# Mock user data
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}

def get_user(user_id: int) -> Optional[Dict[str, Optional[str]]]:
    return users.get(user_id)

@app.before_request
def before_request():
    user_id = request.args.get('login_as', type=int)
    g.user = get_user(user_id) if user_id else None


@app.route("/")
def index():
    """
    renders index.html
    """
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
