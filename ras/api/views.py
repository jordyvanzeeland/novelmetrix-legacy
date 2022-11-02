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

def getBookChallenge(year = None):
    engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
    if(year):
        df = pd.read_sql('SELECT * FROM book_challenge where year = ' + year, engine)
    else:
        df = pd.read_sql('SELECT * FROM book_challenge', engine)

    return df

def filterData(df, datayear = None):
    df['readed'] = pd.to_datetime(df['readed'], format='%Y-%m-%d')
    df['readed'] = df['readed'].dt.strftime('%m-%Y')

    # Filter data on year
    if datayear and datayear is not None:
        df = df.where(df['readed'].str.contains(datayear))

    return df

@api_view(['GET'])
def getAllBooks(request):

    data = []
    books = getBooksData()

    for index, row in books.iterrows():
            data.append({
                "id": row['id'],
                "name": row['name'],
                "author": row['author'],
                "genre": row['genre'],
                "author": row['author'],
                "country": row['country'],
                "country_code": row['country_code'],
                "pages": row['pages'],
                "readed": row['readed'],
                "rating": row['rating'],
            })

    return Response(data)

@api_view(['GET'])
def getChallengeOfYear(request):
    if request.META.get('HTTP_YEAR'):
        data = []
        df = getBookChallenge(request.META.get('HTTP_YEAR'))

        for index, row in df.iterrows():
            data.append({
                "year": row['year'],
                "nrofbooks": row['nrofbooks']
            })

        return Response(data)
    else:
        return Response("No year header included")

@api_view(['GET'])
def books_per_genre_per_month(request):
    if request.META.get('HTTP_YEAR'):

        data = []
        df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))

        # Filter array on genre and date
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
        return Response("No year header included")

@api_view(['GET'])
def countGenres(request):
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
        return Response("No year header included")

@api_view(['GET'])
def books_per_country(request):
    if request.META.get('HTTP_YEAR'):
        data = []
        df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))

        countries = df.groupby(['country_code', 'country'])['country'].count().reset_index(name="count")
        countries = countries.sort_values(by='count', ascending=False)

        for index, row in countries.iterrows():

            data.append({
                "code": row['country_code'],
                "country": row['country'],
                "count": int(row['count'])
            })

        return Response(data)
    else:
        return Response("No year header included")

@api_view(['GET'])
def books_per_author(request):
    if request.META.get('HTTP_YEAR'):
        data = []
        df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))

        countries = df.groupby(['author'])['author'].count().reset_index(name="count")
        countries = countries.sort_values(by='count', ascending=False)

        for index, row in countries.iterrows():

            data.append({
                "author": row['author'],
                "count": int(row['count'])
            })

        return Response(data)
    else:
        return Response("No year header included")

@api_view(['GET'])
def getStats(request):
    if request.META.get('HTTP_YEAR'):
        data = []
        df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))
        df = df.dropna()

        statsTotalBooks = df['name'].count()
        statsTotalPages = df['pages'].astype(int).sum()
        statsTotalWriters = df['author'].nunique()
        statsTotalCountries = df['country'].nunique()
        statsTotalGenres = df['genre'].nunique()


        data.append({
            'totalbooks': statsTotalBooks,
            'totalpages': statsTotalPages,
            'totalauthors': statsTotalWriters,
            'totalcountries': statsTotalCountries,
            'totalgenres': statsTotalGenres
        })
        

        return Response(data[0])
    else:
        return Response("No year header included")

@api_view(['GET'])
def getStatsPages(request):
    data = []
    df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))
    df = df.dropna()

    df['pages'] = df['pages'].astype(int)

    pages = df.groupby(['pages', 'name', 'author', 'rating'])['pages'].count().reset_index(name="count")
    pages = pages.sort_values(by='pages', ascending=True)

    shortestbook = pages.iloc[0]
    longestbook = pages.iloc[-1]
    avgPages = df["pages"].mean().astype(int)

    shortestbook = {
        "name": shortestbook["name"],
        "author": shortestbook['author'],
        "pages": shortestbook['pages'],
        "rating": shortestbook['rating'].astype(int)
    }

    longestbook = {
        "name": longestbook["name"],
        "author": longestbook['author'],
        "pages": longestbook['pages'],
        "rating": longestbook['rating'].astype(int)
    }

    data = {
        "longestbook": longestbook,
        "shortestbook": shortestbook,
        "avgbook": avgPages
    }

    return Response(data)

@api_view(['GET'])
def pages_per_month(request):
    if request.META.get('HTTP_YEAR'):

        data = []
        df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))

        # Filter array on genre and date
        booksPerMonth = df.groupby(['pages', 'readed'])['pages'].count().reset_index(name="count")  
        booksPerMonth = booksPerMonth.sort_values(by=['readed', 'count'], ascending=True)

        for index, row in booksPerMonth.iterrows():
            data.append({
                "pages": row['pages'],
                "readed": row['readed']
            })
        
        return Response(data)
    else:
        return Response("No year header included")

@api_view(['GET'])
def getYears(request):
    df = filterData(getBooksData())

    df['readed'] = pd.to_datetime(df['readed'], errors='coerce')
    df['year']= df['readed'].dt.year

    years = df.groupby('year')['year'].count().reset_index(name="count")

    return Response(years['year'])