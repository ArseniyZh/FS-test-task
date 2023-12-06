from channels.routing import ProtocolTypeRouter, URLRouter
import os
from django.core.asgi import get_asgi_application
from channels.security.websocket import AllowedHostsOriginValidator#, AuthMiddlewareStack

from . import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

asgi_application = get_asgi_application()

application = ProtocolTypeRouter({
            "http": asgi_application,
            "websocket": AllowedHostsOriginValidator(
                #AuthMiddlewareStack(
                    URLRouter(routing.websocket_urlpatterns)
                #)
            )
        })
