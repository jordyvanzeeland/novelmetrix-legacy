from rest_framework.decorators import api_view
import pandas as pd
import math
from rest_framework.response import Response
from django.http import JsonResponse
from .functions import isAuthorized, getBooksData, filterData

# ----------------------
# Get all reading years
# ----------------------

@api_view(['GET'])
def getYears(request):
    try:
        authorization_token = request.headers.get('Authorization')
        isLoggedIn = isAuthorized(authorization_token)

        if not authorization_token:
            return JsonResponse({'error': 'No authorization token'}, safe=False)

        if not isLoggedIn:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
    
        df = filterData(getBooksData(request.headers.get('userid')))
        df['readed'] = pd.to_datetime(df['readed'], errors='coerce')
        df['year']= df['readed'].dt.year
        years = df.groupby('year')['year'].count().reset_index(name="count")

        return Response(years['year'])

    except Exception as e:
        return JsonResponse({'error': 'An error occurred: {}'.format(str(e))}, safe=False)

# ------------------------------------------------------------------
# Get books of selected year and filter it per month and per genre
# ------------------------------------------------------------------

@api_view(['GET'])
def books_per_genre_per_month(request):
    try:
        authorization_token = request.headers.get('Authorization')
        isLoggedIn = isAuthorized(authorization_token)

        if not authorization_token:
            return JsonResponse({'error': 'No authorization token'}, safe=False)

        if not isLoggedIn:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
        
        if not request.META.get('HTTP_YEAR'):
            return JsonResponse({'error': 'No year in header'}, safe=False)
        
        df = filterData(getBooksData(request.headers.get('userid')), request.META.get('HTTP_YEAR'))
        booksPerMonth = df.groupby(['genre', 'readed']).size().reset_index(name='count')
        booksPerMonth = booksPerMonth.sort_values(by=['genre', 'readed', 'count'], ascending=False)
        data = booksPerMonth.to_dict(orient='records')
        return Response(data)

    except Exception as e:
        return JsonResponse({'error': 'An error occurred: {}'.format(str(e))}, safe=False)
    
# ---------------------------------------------
# Get genres of selected year with percentages
# ---------------------------------------------

@api_view(['GET'])
def countGenres(request):
    try:
        authorization_token = request.headers.get('Authorization')
        isLoggedIn = isAuthorized(authorization_token)

        if not authorization_token:
            return JsonResponse({'error': 'No authorization token'}, safe=False)

        if not isLoggedIn:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
        
        if not request.META.get('HTTP_YEAR'):
            return JsonResponse({'error': 'No year in header'}, safe=False)
        
        df = filterData(getBooksData(request.headers.get('userid')), request.META.get('HTTP_YEAR'))
        genres = df.groupby('genre')['genre'].count().reset_index(name="count")
        genres = genres.sort_values(by='count', ascending=False)
        data = [{"genre": genre, "count": int(count)} for genre, count in zip(genres['genre'], genres['count'])]
        return Response(data)

    except Exception as e:
        return JsonResponse({'error': 'An error occurred: {}'.format(str(e))}, safe=False)
        
# ----------------
# Get year stats
# ----------------
    
@api_view(['GET'])
def getStats(request):
    try:
        authorization_token = request.headers.get('Authorization')
        isLoggedIn = isAuthorized(authorization_token)

        if not authorization_token:
            return JsonResponse({'error': 'No authorization token'}, safe=False)

        if not isLoggedIn:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
        
        if not request.META.get('HTTP_YEAR'):
            return JsonResponse({'error': 'No year in header'}, safe=False)
        
        df = filterData(getBooksData(request.headers.get('userid')), request.META.get('HTTP_YEAR'))
        df = df.dropna()

        if not df.empty:
            statsTotalBooks = df['name'].count()
            statsTotalGenres = df['genre'].nunique()
            avgratingsperyear = round(df['rating'].mean(), 0)

            data = {
                'totalbooks': statsTotalBooks,
                'totalgenres': statsTotalGenres,
                'avgyearrating': avgratingsperyear
            }
        else:
            data = {}
            
        return Response(data)

    except Exception as e:
        return JsonResponse({'error': 'An error occurred: {}'.format(str(e))}, safe=False)

# ------------------------------------------------
# Get books of selected year and group by ratings
# ------------------------------------------------
    
@api_view(['GET'])
def avg_ratings_per_month(request):
    try:
        authorization_token = request.headers.get('Authorization')
        isLoggedIn = isAuthorized(authorization_token)

        if not authorization_token:
            return JsonResponse({'error': 'No authorization token'}, safe=False)

        if not isLoggedIn:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
        
        if not request.META.get('HTTP_YEAR'):
            return JsonResponse({'error': 'No year in header'}, safe=False)
        
        df = filterData(getBooksData(request.headers.get('userid')), request.META.get('HTTP_YEAR'))
        avgratingspermonth = df.groupby('readed')['rating'].mean().reset_index(name="rating")
        data = [{"date": date, "rating": int(rating)} for date, rating in zip(avgratingspermonth['readed'], avgratingspermonth['rating'])]
        return Response(data)
    
    except Exception as e:
        return JsonResponse({'error': 'An error occurred: {}'.format(str(e))}, safe=False)

# -----------------------------
# Get ratings of selected year
# -----------------------------

@api_view(['GET'])
def countRatings(request):
    try:
        authorization_token = request.headers.get('Authorization')
        isLoggedIn = isAuthorized(authorization_token)

        if not authorization_token:
            return JsonResponse({'error': 'No authorization token'}, safe=False)

        if not isLoggedIn:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
        
        if not request.META.get('HTTP_YEAR'):
            return JsonResponse({'error': 'No year in header'}, safe=False)
        
        df = filterData(getBooksData(request.headers.get('userid')), request.META.get('HTTP_YEAR'))
        countratings = df.groupby('rating')['rating'].count().reset_index(name="count")
        countratings = countratings.sort_values(by='rating', ascending=False)
        data = [{"rating": int(rating), "count": int(count)} for rating, count in zip(countratings['rating'], countratings['count'])]
        return Response(data)

    except Exception as e:
        return JsonResponse({'error': 'An error occurred: {}'.format(str(e))}, safe=False)