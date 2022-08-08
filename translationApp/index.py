import spacy
import logging
import json

from flask import Flask, request, jsonify
from bson.objectid import ObjectId
from pymongo import MongoClient
from flask_cors import CORS

nlp = spacy.load("en_core_web_lg")
client = MongoClient(port=27017)
db = client.projectDB

app = Flask(__name__)
CORS(app)

logging.basicConfig(filename='info.log', filemode='w', format='{"timestamp":"%(asctime)s",\
   "level": "%(levelname)s", "message": "%(message)s" }', level=logging.INFO)

'''Receives email object as parameter and find the emails similar
to the rest of the emails in the database using Spacy.'''
@app.route("/compare", methods=['GET', 'POST'])
def compare():
    similarEmails = []
    records = db.mails.find({})
    text = request.json
    logging.info(text)
    emailId = text["emailId"]
    email = db.mails.find_one({"_id": ObjectId(emailId)})
    email1 = nlp(email['normalized'])
    del email["all"]

    #similarity comparision for all the emails in the database with the received email
    for record in records:
        if 'normalized' in record:
            email2 = nlp(record['normalized'])
            similarity = email1.similarity(email2)
            if(similarity > 0.99):
                if 'all' in email:
                    del record["all"]
                record['similarityScore'] = similarity
                similarEmails.append(record)

    #Check if similar and update isSpam attribute in the email object
    if(len(similarEmails) > 0):
        email['similarEmails'] = similarEmails
        email['isSpam'] = True
    else:
        email['isSpam'] = False
        return 'False'

    email["emailId"] = emailId
    logging.info(email)

    #Save email object to 'reports' collection and update it in the 'mails' collection with attribute isSpam
    db.reports.insert_one(email)
    db.mails.find_one_and_update({"_id": ObjectId(emailId)}, {"$set": {"isSpam": email['isSpam']}})
    return 'True'

'''Receives the email content in the request and normalizes them, i.e removes punctuations, stop words and spaces
and send the result as response'''
@app.route("/normalize", methods=['GET', 'POST'])
def normalize():
    normalized = []
    text = request.json
    logging.info(text)
    email = text["email"]
    nlpEmail = nlp(email)

    for token in nlpEmail:
        if not token.is_punct and not token.is_stop and not token.is_space:
            normalized.append(token.lemma_.lower())

    logging.info(' '.join(normalized))
    return ' '.join(normalized)

'''Retrieve all the emails belonging to the user to present them in the user dashboard'''
@app.route("/user", methods=['GET', 'POST'])
def user():
    count = 0
    result = {}
    forwardedEmails = []
    text = request.json
    logging.info(text)

    #Retrieve the emails belonging to the sender email
    senderEmail = text["userEmail"]
    emails = db.mails.find({"senderEmail": senderEmail })

    for email in emails:
        email["_id"] = str(email["_id"])

        #Remove the 'all' attribute of the email object
        if 'all' in email:
            del email["all"]

        #count all the spam emails of the user has received
        if 'isSpam' in email:
            if(email["isSpam"] is True):
                count = count + 1

        forwardedEmails.append(email)

    #add emails and spamcount attribute to the result obeject
    result["emails"] = forwardedEmails
    result["spamCount"] = count
    logging.info(result)
    return jsonify(result)

'''Send the logs accumulated in info.log'''
@app.route("/logs", methods=['GET', 'POST'])
def logs():
    result = []
    with open('info.log') as content:
        for line in content:
            print(str(line))
            result.append(json.loads(line))
    return dict(data=result)

'''The main thing!'''
if __name__ == "__main__":
    app.run()
