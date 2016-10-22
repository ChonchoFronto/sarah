import boto3
from sarah_survivors import Survivor
from sarah_command_service import CommandService

def handler(event, context):
    survivor_number = event['from']
    message_body = event['body']

    survivor = Survivor(survivor_number)
    survivor.update_survivor_info()

    cmd_service = CommandService()
    response = cmd_service.get_intent_from_apiai(message_body)

    return response
    