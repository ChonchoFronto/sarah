from __future__ import print_function
import boto3
import apiai
import json

APIAI_CLIENT_ACCESS_TOKEN = "6acb38048ab042c68d6b2e73a4d7c5b8"

class CommandService:

    command_table = boto3.resource('dynamodb').Table('SarahSMSActions')


    def get_intent_from_apiai(self, message_body):
        ai = apiai.ApiAI(APIAI_CLIENT_ACCESS_TOKEN)
        request = ai.text_request()
        request.query = message_body
        
        response = request.getresponse()
        json_response = json.loads(response.read())['result']
        action = json_response['action']
        print(response.read())

        if action in ["", "input.unknown"] or action.split('.')[0] == "smalltalk": 
            return json_response['fulfillment']['speech']
        else:
            action_response = command_table.get_item(Key = {"Action": action})
            response_message = action_response['Item']['Response']
            return response_message
        

    


    


