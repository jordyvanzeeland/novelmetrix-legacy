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
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            df = filterData(getBooksData())
            df['readed'] = pd.to_datetime(df['readed'], errors='coerce')
            df['year']= df['readed'].dt.year
            years = df.groupby('year')['year'].count().reset_index(name="count")

            return Response(years['year'])
        else:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
    else:
        return JsonResponse({'error': 'No authorization token'}, safe=False)

# ------------------------------------------------------------------
# Get books of selected year and filter it per month and per genre
# ------------------------------------------------------------------

@api_view(['GET'])
def books_per_genre_per_month(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            if request.META.get('HTTP_YEAR'):
                data = []
                df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))
                booksPerMonth = df.groupby(['genre','readed'])['genre'].count().reset_index(name="count")  
                booksPerMonth = booksPerMonth.sort_values(by=['genre', 'readed', 'count'], ascending=False)

                for index, row in booksPerMonth.iterrows():
                    data.append({
                        "genre": row['genre'],
                        "readed": row['readed'],
                        "count": row['count']
                    })
                
                return Response(data)
            else:
                return JsonResponse({'error': 'No year in header'}, safe=False)
        else:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
    else:
        return JsonResponse({'error': 'No authorization token'}, safe=False)
    
# ---------------------------------------------
# Get genres of selected year with percentages
# ---------------------------------------------

@api_view(['GET'])
def countGenres(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            if request.META.get('HTTP_YEAR'):
                
                data = []
                df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))
                
                genres = df.groupby('genre')['genre'].count().reset_index(name="count")
                genres = genres.sort_values(by='count', ascending=False)

                for index, row in genres.iterrows():
                    data.append({
                        "genre": row['genre'],
                        "count": int(row['count'])
                    })

                return Response(data)
            else:
                return JsonResponse({'error': 'No year in header'}, safe=False)
        else:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
    else:
        return JsonResponse({'error': 'No authorization token'}, safe=False)
        
# ----------------
# Get year stats
# ----------------
    
@api_view(['GET'])
def getStats(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            if request.META.get('HTTP_YEAR'):
                data = []
                df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))
                df = df.dropna()
                statsTotalBooks = df['name'].count()
                statsTotalGenres = df['genre'].nunique()
                avgratingsperyear = round((df['rating'].sum() / df['rating'].count()), 0)

                data.append({
                    'totalbooks': statsTotalBooks,
                    'totalgenres': statsTotalGenres,
                    'avgyearrating': avgratingsperyear
                })

                return Response(data[0])
            else:
                return JsonResponse({'error': 'No year in header'}, safe=False)
        else:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
    else:
        return JsonResponse({'error': 'No authorization token'}, safe=False)

# ------------------------------------------------
# Get books of selected year and group by ratings
# ------------------------------------------------
    
@api_view(['GET'])
def avg_ratings_per_month(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            if request.META.get('HTTP_YEAR'):
                data = []
                df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))
                avgratingspermonth = df.groupby('readed')['rating'].mean().reset_index(name="rating")

                for index, row in avgratingspermonth.iterrows():
                    data.append({
                        "date": row['readed'],
                        "rating": int(row['rating'])
                    })

                return Response(data)
            else:
                return JsonResponse({'error': 'No year in header'}, safe=False)
        else:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
    else:
        return JsonResponse({'error': 'No authorization token'}, safe=False)


# -----------------------------
# Get ratings of selected year
# -----------------------------

@api_view(['GET'])
def countRatings(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            if request.META.get('HTTP_YEAR'):
                data = []
                df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))
                countratings = df.groupby('rating')['rating'].count().reset_index(name="count")
                countratings = countratings.sort_values(by='rating', ascending=False)

                for index, row in countratings.iterrows():
                    data.append({
                        "rating": int(row['rating']),
                        "count": int(row['count'])
                    })

                return Response(data)
            else:
                return JsonResponse({'error': 'No year in header'}, safe=False)
        else:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
    else:
        return JsonResponse({'error': 'No authorization token'}, safe=False)