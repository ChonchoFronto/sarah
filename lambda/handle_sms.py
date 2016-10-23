import boto3
from sarah_survivors import Survivor
from sarah_command_service import CommandService
from sarah_message_service import MessageService

def handler(event, context):
    survivor_number = event['from']
    message_body = event['body']

    # Update survivor records in Dynamo
    survivor = Survivor(survivor_number)
    survivor.update_survivor_info()

    # Pass message to API.AI for processing and get response from Dynamo
    # for the appropriate action.
    cmd_service = CommandService()
    response = cmd_service.get_response_message(message_body)

    # Log message
    msg_service = MessageService()
    msg_service.record_message(survivor_number, message_body, response)
    messages_log = msg_service.get_message_log(20)

    return response
    