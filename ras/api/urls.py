from django.urls import path, include
from .views import *
from .login import *

urlpatterns = [
    path('books', getAllBooks),
    path('books/challenge', getChallengeOfYear),
    path('books/years', getYears),
    path('books/stats', getStats),
    path('books/predict', predictAmountBooks),

    path('books/insert', addBook),
    path('books/delete', deleteBook),
    path('books/update', updateBook),

    path('books/pages/stats', getStatsPages),
    path('books/pages', pages_per_month),
    
    path('books/genres', books_per_genre_per_month),
    path('books/genres/count', countGenres),
    path('books/authors', books_per_author),
    path('books/countries', books_per_country),

    path('auth/login', login),
    
]