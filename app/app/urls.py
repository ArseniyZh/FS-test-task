from django.contrib import admin
from django.urls import path, include

from cats import urls as cats_urls
from users import urls as users_urls


API_PREFIX = "api"

urlpatterns = [
    path('admin/', admin.site.urls),

    path(f"{API_PREFIX}/users/", include(users_urls)),
    path(f"{API_PREFIX}/cats/", include(cats_urls)),

]
