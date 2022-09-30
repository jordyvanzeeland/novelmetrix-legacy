from django.urls import path
from .views import *

urlpatterns = [
    path('books/genres', books_per_genre_per_month),
    path('books/genres/count', countGenres),
    path('ratings', avg_ratings_per_month)
]