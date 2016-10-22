from __future__ import print_function
import boto3
from botocore.exceptions import ClientError

class Survivor:
    
    survivors_table = boto3.resource('dynamodb').Table('Survivors')

    def __init__(self, phone_number):
        # Construct from Dynamo if user exists, set properties for new user otherwise
        try:
            survivor_info = self.survivors_table.get_item(Key={ 'PhoneNumber': phone_number })
        except ClientError as e:
            print(e.response['Error']['Message'])  
        else:
            self.phone_number = phone_number
            if 'Item' in survivor_info:
                self.message_count = survivor_info['Item']['MessageCount']
            else:
                self.message_count = 0
    
    
    def get_survivor_info(self):
        return {
            "PhoneNumber": self.phone_number,
            "MessageCount": self.message_count
        }
    
    def update_survivor_info(self):
        item = {
            "PhoneNumber": self.phone_number,
            "MessageCount": self.message_count + 1
        }

        response = self.survivors_table.put_item(Item=item)
        print('User ' + self.phone_number + ' updated.')