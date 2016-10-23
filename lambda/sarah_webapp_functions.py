import boto3
from sarah_message_service import MessageService
from sarah_command_service import CommandService
from sarah_survivors import Survivor

def get_message_log(event, context):
    msg_service = MessageService()
    response = msg_service.get_message_log(limit=25)

    return_item = {
        'Messages': response
    }
    return return_item


def get_analytics(event, context):
    cmd_service = CommandService()
    top_actions = cmd_service.get_actions_by_invocation_count()

    survivors = Survivor()
    most_active_survivors = survivors.get_survivors_by_messages_sent()

    total_messages_received = sum(survivor['MessageCount'] for survivor in most_active_survivors)

    return_item = {
        'TopActions': top_actions,
        'MostActiveSurvivors': most_active_survivors,
        'TotalMessages': total_messages_received
    }

    return return_item


def get_actions(event, context):
    cmd_service = CommandService()
    actions = cmd_service.get_actions_by_invocation_count()

    return_item ={
        "Actions": actions
    }
    return return_item



    
