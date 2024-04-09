#!/usr/bin/env python3

"""
Setup a basic Flask app
"""

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    """
    renders index.html
    """
    return render_template('index.html')