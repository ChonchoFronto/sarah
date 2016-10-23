from __future__ import print_function
import boto3
import apiai
import json
from operator import itemgetter

APIAI_CLIENT_ACCESS_TOKEN = "6acb38048ab042c68d6b2e73a4d7c5b8"

class CommandService:

    actions_table = boto3.resource('dynamodb').Table('SarahSMSActions')

    def get_response_message(self, message_body):
        # Send message to api.ai for analysis
        ai = apiai.ApiAI(APIAI_CLIENT_ACCESS_TOKEN)
        request = ai.text_request()
        request.query = message_body
        
        # Extract the recommended action from the response
        response = request.getresponse()
        json_response = json.loads(response.read())['result']
        action = json_response['action']
        print(response.read())

        # Determine response message to send back to user
        if action in ["", "input.unknown"] or action.split('.')[0] == "smalltalk": 
            return json_response['fulfillment']['speech']
        else:
            action_response = self.actions_table.get_item(Key = {"Action": action})
            response_message = action_response['Item']['Response']

            self.update_action_invocation_counts(action_response['Item'])

            return response_message

        
    def update_action_invocation_counts(self, action_item):
        item = {
            "Action": action_item['Action'],
            "Response": action_item['Response'],
            "InvocationCount": 1 if 'InvocationCount' not in action_item else action_item['InvocationCount'] + 1
        }

        try:
            response = self.actions_table.put_item(Item=item)
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            print("Counts for action " + action_item['Action'] + " updated.")
        
    
    def get_actions_by_invocation_count(self):
        response = self.actions_table.scan()
        action_items = [] if 'Items' not in response else response['Items']
        print(action_items)
        action_items = sorted(action_items, key=itemgetter('InvocationCount'), reverse=True)
        return action_items
        


    


    


