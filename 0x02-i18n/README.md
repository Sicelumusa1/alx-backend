
i02. i18n

This projectjj covers the concepts of Flask-Babel with the aim to:
Learn how to parametrize Flask templates to display different languages
Learn how to infer the correct locale based on URL parameters, user settings or request headers
Learn how to localize timestamps

0. Basic Flask app
First you will setup a basic Flask app in 0-app.py. Create a single / route and an index.html template that simply outputs “Welcome to Holberton” as page title (<title>) and “Hello world” as header (<h1>).

1. Basic Babel setup

Install the Babel Flask extension:

$ pip3 install flask_babel==2.0.0
Then instantiate the Babel object in your app. Store it in a module-level variable named babel.

In order to configure available languages in our app, you will create a Config class that has a LANGUAGES class attribute equal to ["en", "fr"].

Use Config to set Babel’s default locale ("en") and timezone ("UTC").

Use that class as config for your Flask app


2. Get locale from request

Create a get_locale function with the babel.localeselector decorator. Use request.accept_languages to determine the best match with our supported languages


Curriculum
Short Specializations
Average: 89.72%
0x02. i18n
Back-end
 Weight: 1
 Project will start Apr 9, 2024 6:00 AM, must end by Apr 10, 2024 6:00 AM
 Checker will be released at Apr 9, 2024 12:00 PM
 Manual QA review must be done (request it when you are done with the project)
 An auto review will be launched at the deadline


Resources
Read or watch:

Flask-Babel
Flask i18n tutorial
pytz
Learning Objectives
Learn how to parametrize Flask templates to display different languages
Learn how to infer the correct locale based on URL parameters, user settings or request headers
Learn how to localize timestamps
Requirements
All your files will be interpreted/compiled on Ubuntu 18.04 LTS using python3 (version 3.7)
All your files should end with a new line
A README.md file, at the root of the folder of the project, is mandatory
Your code should use the pycodestyle style (version 2.5)
The first line of all your files should be exactly #!/usr/bin/env python3
All your *.py files should be executable
All your modules should have a documentation (python3 -c 'print(__import__("my_module").__doc__)')
All your classes should have a documentation (python3 -c 'print(__import__("my_module").MyClass.__doc__)')
All your functions and methods should have a documentation (python3 -c 'print(__import__("my_module").my_function.__doc__)' and python3 -c 'print(__import__("my_module").MyClass.my_function.__doc__)')
A documentation is not a simple word, it’s a real sentence explaining what’s the purpose of the module, class or method (the length of it will be verified)
All your functions and coroutines must be type-annotated.
Tasks
0. Basic Flask app
mandatory
First you will setup a basic Flask app in 0-app.py. Create a single / route and an index.html template that simply outputs “Welcome to Holberton” as page title (<title>) and “Hello world” as header (<h1>).

Repo:

GitHub repository: alx-backend
Directory: 0x02-i18n
File: 0-app.py, templates/0-index.html
1. Basic Babel setup
mandatory
Install the Babel Flask extension:

$ pip3 install flask_babel==2.0.0
Then instantiate the Babel object in your app. Store it in a module-level variable named babel.

In order to configure available languages in our app, you will create a Config class that has a LANGUAGES class attribute equal to ["en", "fr"].

Use Config to set Babel’s default locale ("en") and timezone ("UTC").

Use that class as config for your Flask app.
 
2. Get locale from request
mandatory
Create a get_locale function with the babel.localeselector decorator. Use request.accept_languages to determine the best match with our supported languages.


3. Parametrize templates

Use the _ or gettext function to parametrize your templates. Use the message IDs home_title and home_header.

Create a babel.cfg file containing

[python: **.py]
[jinja2: **/templates/**.html]m
extensions=jinja2.ext.autoescape,jinja2.ext.with_
Then initialize your translations with

$ pybabel extract -F babel.cfg -o messages.pot .
and your two dictionaries with

$ pybabel init -i messages.pot -d translations -l en
$ pybabel init -i messages.pot -d translations -l fr
Then edit files translations/[en|fr]/LC_MESSAGES/messages.po to provide the correct value for each message ID for each language. Use the following translations:

msgid	English	French
home_title	"Welcome to Holberton"	"Bienvenue chez Holberton"
home_header	"Hello world!"	"Bonjour monde!"
Then compile your dictionaries with

$ pybabel compile -d translations
i'Reload the home page of your app and make sure that the correct messages show up.

4. Force locale with URL parameter
In this task, you will implement a way to force a particular locale by passing the locale=fr parameter to your app’s URLs.

In your get_locale function, detect if the incoming request contains locale argument and ifs value is a supported locale, return it. If not or if the parameter is not present, resort to the previous default behavior.

Now you should be able to test different translations by visiting http://127.0.0.1:5000?locale=[fr|en].

Visiting http://127.0.0.1:5000/?locale=fr should display this level 1 heading
