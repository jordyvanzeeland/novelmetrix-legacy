from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from .views import *
from .modules.auth import *
from .modules.crud import *
from .modules.challenges import *
from .modules.pandas import *
from .modules.predictions import *

urlpatterns = [
    path('books/all', getAllBooks),
    path('books', getBooksByYear),
    path('books/years', getYears),
    path('books/en', countEnBooks),
    path('books/stats', getStats),
    path('books/insert', addBook),
    path('books/delete', deleteBook),
    path('books/update', updateBook),
    path('books/genres', books_per_genre_per_month),
    path('books/genres/count', countGenres),
    path('books/ratings', avg_ratings_per_month),
    path('books/ratings/count', countRatings),
    # path('books/countries', books_per_country),
    path('auth/login', csrf_exempt(login)),
    path('auth/register', csrf_exempt(register)),

    path('books/challenge', getChallengeOfYear),
    path('books/challenges', getAllChallenges),
    path('books/challenges/insert', addChallenge),
    path('books/challenges/<int:id>/delete', deleteChallenge),
    path('books/challenges/prediction/train', predict_next_year),
]