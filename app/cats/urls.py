from django.urls import path

from . import views

urlpatterns = [
    path("create/", views.CatCreateView.as_view(), name="cat_create"),
    path("list/", views.CatUserListView.as_view(), name="cat_list"),
    path("update/", views.CatUpdateView.as_view(), name="cat_update"),
    path("delete/", views.CatDeleteView.as_view(), name="cat_delete"),
]