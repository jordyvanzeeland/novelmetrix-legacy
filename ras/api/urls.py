from django.urls import path
from .views import *

urlpatterns = [
    path('books', api_all_books),
    path('books/genres', books_per_genre_per_month)
]