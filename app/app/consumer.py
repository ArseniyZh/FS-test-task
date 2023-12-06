from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
import json


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        group_name = data['group_name']

        # Отправьте сообщение в группу
        await self.channel_layer.group_add(
            group_name,
            self.channel_name
        )

        await self.channel_layer.group_send(
            group_name,
            {
                'type': 'chat.message',
                'message': message
            }
        )

    async def disconnect(self, close_code):
        pass

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
