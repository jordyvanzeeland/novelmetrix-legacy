from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from .views import *
from .login import *

urlpatterns = [
    path('books', getAllBooks),
    path('books/challenge', getChallengeOfYear),
    path('books/challenges', getAllChallenges),
    path('books/challenges/insert', addChallenge),
    path('books/challenges/<int:id>/delete', deleteChallenge),
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
    path('books/ratings', avg_ratings_per_month),
    path('books/ratings/count', countRatings),
    path('books/authors', books_per_author),
    path('books/countries', books_per_country),

    path('auth/login', csrf_exempt(login)),
    
]