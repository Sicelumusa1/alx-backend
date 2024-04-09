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
users: Dict[int, Dict[str, Optional[str]]] = {
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

@babel.localeselecter
def get_locale() -> str:
    requested_locale = request.args.get('locale')

    if requested_locale and requested_locale in app.config['LANGUAGES']:
        return requested_lacale
    if g.user and g.user.get('locale') in app.config['LANGUAGES'}:
        return g.user{'locale'}
    header_locale = request.accept_language.best_match(app.config['LANGUAGES'])
    if header_locale:
        return header_locale

    return app.config['BABEL_DEFAULT_LOCALE']

@app.route("/")
def index():
    """
    renders index.html
    """
    return render_template('index.html', user=g.user)


if __name__ == '__main__':
    app.run(debug=True)
