import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash
import json
import random
     
"""
From flask website 
"""
DATABASE = '/question.db'
DEBUG = True
SECRET_KEY = 'kempswag'
USERNAME = 'admin'
PASSWORD = 'default'

app = Flask(__name__)
app.config.from_object(__name__)


"""
this is all that I needed to do with flask to connect
the HTML to a server -routing ties a url to a function
returns the template 
"""

"""
This is the home page :)
"""
@app.route('/') #uses get method -- >
def home_page(): #checks if person already signed in
    return render_template('index.html')

"""
The main game console page. receives inputs from users that are responses 0 - 100
"""


@app.route('/gaming', methods = ['GET', 'POST'])
def game_page():
    with open('questionTypes.json', 'r') as f:
        questions = json.load(f)['questions']
    return render_template('game.html', questions=questions)

"""
Questions that prime the suspect to see if they are paying attention and are not a robot.
Also helps the audience member understand the experiment better
"""

@app.route('/begin', methods = ['GET', 'POST'])
def primer_game():
    with open('primerTypes.json', 'r') as f:
        questions = json.load(f)['questions']
    return render_template('primer.html', questions=questions)


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/thanks')
def thanks():
    return render_template('thanks.html')

# Adds things to json file
@app.route('/api', methods = ['POST'])
def api():
    # Gets the json string from the post from client
    j = '[' + list(dict(request.form).keys())[0] + ']'
    k = json.loads(j)
    res_list = []
    # So long as some surveys have been filled out
    if len(k) > 0:
        # get list of objects to add to database
        with open('data.json', 'r') as f:
            data = json.load(f)
        print(len(data))
        print(len(k[0]))
        new_data = k[0] + data

        with open('data.json', 'w') as f:
            json.dump(new_data, f)
        print(len(new_data))


    return "Successful Post"




#when dealing with forms and user inputs, put 

if __name__ == '__main__':
    app.run()

