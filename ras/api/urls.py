from django.urls import path
from .views import *

urlpatterns = [
    path('books', api_all_books),
    path('books/<int:_id>', api_get_book),
]