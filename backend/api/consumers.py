'''
Websocket consumers
'''

from channels.generic.websocket import AsyncWebsocketConsumer
import json
import logging

logger = logging.getLogger(__name__)

# One instance for each frontend client
class CommentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            # Each comment thread could be a group, e.g., "comments_<post_id>"
            self.post_id = self.scope['url_route']['kwargs'].get('post_id', 'global')
            self.group_name = f'comments_{self.post_id}'

            logger.info(f"CommentConsumer: Attempting to connect to group {self.group_name}")

            # Join group
            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )
            await self.accept()
            
            logger.info(f"CommentConsumer: Successfully connected to group {self.group_name}")
            
            # Send a welcome message
            await self.send(text_data=json.dumps({
                'type': 'connection_established',
                'message': f'Connected to comments for post {self.post_id}',
                'group': self.group_name
            }))
            
        except Exception as e:
            logger.error(f"CommentConsumer connect error: {e}")
            await self.close()

    async def disconnect(self, close_code):
        try:
            # Leave group
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )
            logger.info(f"CommentConsumer: Disconnected from group {self.group_name} with code {close_code}")
        except Exception as e:
            logger.error(f"CommentConsumer disconnect error: {e}")

    async def send_comment(self, event):
        try:
            # Send message to WebSocket
            await self.send(text_data=json.dumps({
                'type': 'new_comment',
                'comment': event['comment'],
                'user': event['user'],
                'timestamp': event['timestamp'],
            }))
            logger.info(f"CommentConsumer: Sent comment to group {self.group_name}")
        except Exception as e:
            logger.error(f"CommentConsumer send_comment error: {e}")

class ReplyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            logger.info("ReplyConsumer: Attempting to connect")
            logger.info(f"Channel Layer: {self.channel_layer}")

            self.parent_id = self.scope['url_route']['kwargs']['parent_id']
            self.group_name = f'replies_{self.parent_id}'

            logger.info(f"ReplyConsumer: Connecting to group {self.group_name}")

            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )
            await self.accept()
            
            logger.info(f"ReplyConsumer: Successfully connected to group {self.group_name}")
            
            # Send a welcome message
            await self.send(text_data=json.dumps({
                'type': 'connection_established',
                'message': f'Connected to replies for comment {self.parent_id}',
                'group': self.group_name
            }))
            
        except Exception as e:
            logger.error(f"ReplyConsumer connect error: {e}")
            await self.close()

    async def disconnect(self, close_code):
        try:
            # Leave group
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )
            logger.info(f"ReplyConsumer: Disconnected from group {self.group_name} with code {close_code}")
        except Exception as e:
            logger.error(f"ReplyConsumer disconnect error: {e}")

    async def send_reply(self, event):
        try:
            # Send reply message to WebSocket
            logger.info(f"ReplyConsumer: Sending reply to group {self.group_name}")
            await self.send(text_data=json.dumps({
                'type': 'new_reply',
                'reply': event.get('reply', {}),
                'user': event.get('user', ''),
                'timestamp': event.get('timestamp', ''),
                'parent_id': self.parent_id
            }))
        except Exception as e:
            logger.error(f"ReplyConsumer send_reply error: {e}")


class MessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            self.chat_id = self.scope['url_route']['kwargs']['chat_id']
            self.group_name = f'chat_{self.chat_id}'

            logger.info(f"MessageConsumer: Connecting to group {self.group_name}")

            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )
            await self.accept()

            logger.info(f"MessageConsumer: Successfully connected to group {self.group_name}")

            # Send a welcome message
            await self.send(text_data=json.dumps({
                'type': 'connection_established',
                'message': f'Connected to chat {self.chat_id}',
                'group': self.group_name
            }))
        except Exception as e:
            logger.error(f"MessageConsumer connect error: {e}")
            await self.close()

    async def disconnect(self, close_code):
        try:
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )
            logger.info(f"MessageConsumer: Disconnected from group {self.group_name} with code {close_code}")
        except Exception as e:
            logger.error(f"MessageConsumer disconnect error: {e}")

    async def send_message(self, event):
        try:
            logger.info(f"MessageConsumer: Sending message to group {self.group_name}")
            logger.info(f"MessageConsumer: Event data: {event}")
            
            await self.send(text_data=json.dumps({
                'type': 'new_message',
                'message': event.get('message', {})
            }))
            logger.info(f"MessageConsumer: Successfully sent message to group {self.group_name}")
        except Exception as e:
            logger.error(f"MessageConsumer send_message error: {e}")
            logger.error(f"MessageConsumer event data: {event}")
