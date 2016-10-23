from __future__ import print_function
import boto3
from botocore.exceptions import ClientError
import calendar
import time

class MessageService:

    messages_table = boto3.resource('dynamodb').Table('SarahMessages')

    def record_message(self, phone_number, message_received_from_user, message_sent_to_user):
        item = {
            "PhoneNumber": phone_number,
            "Timestamp": -int(calendar.timegm(time.gmtime())),
            "MessageReceived": message_received_from_user,
            "MessageSent": message_sent_to_user
        }

        try:
            response = self.messages_table.put_item(Item=item)
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            print("Message to " + phone_number + " saved to messages log")

    
    def get_message_log(self, limit):
        response = self.messages_table.scan(Limit=limit)
        messages_list = [] if 'Items' not in response else response['Items']
        return messages_list