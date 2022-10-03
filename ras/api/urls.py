from django.urls import path
from .views import *

urlpatterns = [
    path('books/years', getYears),
    path('books/stats', getStats),
    path('books/genres', books_per_genre_per_month),
    path('books/genres/count', countGenres),
    path('books/countries', books_per_country),
]