from sqlite3 import connect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Books
import pandas as pd
import ras.settings

from sqlalchemy import create_engine
from .serializers import BooksSerializer
from django.db.models import Q
from django.templatetags.static import static
import json

def getBooksData():
    engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
    df = pd.read_sql('SELECT * FROM api_books', engine, parse_dates={'readed': {'format': '%m-%Y'}})

    return df

@api_view(['GET'])
def books_per_genre_per_month(request):

    datayear = request.META.get('HTTP_YEAR')

    if datayear:

        data = []

        df = getBooksData()

        df['readed'] = pd.to_datetime(df['readed'], format='%Y-%m-%d')
        df['readed'] = df['readed'].dt.strftime('%m-%Y')

        # Filter data on year
        df = df.where(df['readed'].str.contains(datayear))

        # Filter array on genre and date
        booksPerMonth = df.groupby(['genre','readed'])['genre'].count().reset_index(name="count")  
        booksPerMonth = booksPerMonth.sort_values(by=['readed', 'count'], ascending=False)

        for index, row in booksPerMonth.iterrows():
            data.append({
                "genre": row['genre'],
                "readed": row['readed'],
                "count": row['count']
            })
        
        return Response(data)
    else:
        return Response("No year header included")

@api_view(['GET'])
def avg_ratings_per_month(request):
    datayear = request.META.get('HTTP_YEAR')

    if datayear:
        data = []

        # Get CSV file with book data
        df = getBooksData()
        
        df['readed'] = pd.to_datetime(df['readed'], format='%Y-%m-%d')
        df['readed'] = df['readed'].dt.strftime('%m-%Y')

        # Filter data on year
        df = df.where(df['readed'].str.contains(datayear))

        avgratingspermonth = df.groupby('readed')['rating'].mean().reset_index(name="rating")

        for index, row in avgratingspermonth.iterrows():

            data.append({
                "date": row['readed'],
                "rating": int(row['rating'])
            })
        
        return Response(data)
    else:
        return Response("No year header included")

@api_view(['GET'])
def countGenres(request):
    datayear = request.META.get('HTTP_YEAR')

    if datayear:
        data = []

        # Get CSV file with book data
        df = getBooksData()

        df['readed'] = pd.to_datetime(df['readed'], format='%Y-%m-%d')
        df['readed'] = df['readed'].dt.strftime('%m-%Y')

        df = df.where(df['readed'].str.contains(datayear))
        genres = df.groupby('genre')['genre'].count().reset_index(name="count")
        genres = genres.sort_values(by='count', ascending=False)

        for index, row in genres.iterrows():

            data.append({
                "genre": row['genre'],
                "count": int(row['count'])
            })

        return Response(data)
    else:
        return Response("No year header included")

