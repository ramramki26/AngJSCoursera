from flask import Flask,jsonify, render_template, request
import pickle
import nltk
import string
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer 
from nltk.tokenize import word_tokenize 
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

"""nltk.download('punkt')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')"""

app = Flask(__name__)

ps = PorterStemmer()
wordnet_lemmatizer = WordNetLemmatizer()

def get_wordnet_pos(word):
    """Map POS tag to first character lemmatize() accepts"""
    tag = nltk.pos_tag([word])[0][1][0].upper()
    tag_dict = {"J": wordnet.ADJ,
                "N": wordnet.NOUN,
                "V": wordnet.VERB,
                "R": wordnet.ADV}

    return tag_dict.get(tag, wordnet.NOUN)


def lemmer(mess):
    # Check characters to see if they are in punctuation
    mess = mess.lower()
    nopunc = [char for char in mess if char not in string.punctuation]

    # Join the characters again to form the string.
    nopunc = word_tokenize(''.join(nopunc))

    return ([wordnet_lemmatizer.lemmatize(w, get_wordnet_pos(w)) for w in nopunc])


def stemmer(mess):
    # Check characters to see if they are in punctuation
    mess = mess.lower()
    nopunc = [char for char in mess if char not in string.punctuation]

    # Join the characters again to form the string.
    nopunc = word_tokenize(''.join(nopunc))

    stemmed = []

    for word in nopunc:
        stemmed.append(ps.stem(word))

    return stemmed


def stop_words(mess):
    """
    Takes in a string of text, then performs the following:
    1. Remove all punctuation
    2. Remove all stopwords
    3. Returns a list of the cleaned text
    """
    # Check characters to see if they are in punctuation
    mess = mess.lower()
    nopunc = [char for char in mess if char not in string.punctuation]

    # Join the characters again to form the string.
    nopunc = ''.join(nopunc)
    
    # Now just remove any stopwords
    return [word for word in nopunc.split() if word.lower() not in stopwords.words('english')]

@app.route("/", methods = ['POST','GET'])
def func():
    if request.method == 'POST':
        if request.form['action'] == 'Filter stop words':
            text = request.form["text"]
            done_fil = ', '.join(stop_words(text))
            return render_template('index.html', fil_result=done_fil)
        if request.form['action'] == 'Stemming':
            text = request.form["text"]
            done_stem = ', '.join(stemmer(text))
            return render_template('index.html', stem_result=done_stem)
        if request.form['action'] == 'Lemmatization':
            text = request.form["text"]
            done_lem = ', '.join(lemmer(text))
            return render_template('index.html', lem_result=done_lem)
    if request.method == 'GET':
        done = ''
        return render_template('index.html', result=done)
    

if __name__ == '__main__':
    app.run(debug=True)



