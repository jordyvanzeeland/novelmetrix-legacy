from rest_framework.decorators import api_view
from sqlalchemy import create_engine
import ras.settings
import pandas as pd
from rest_framework.response import Response

def getBooksData():
    engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
    df = pd.read_sql('SELECT * FROM api_books ORDER BY readed', engine, parse_dates={'readed': {'format': '%m-%Y'}})

    return df

def filterData(df, datayear = None):
    df['readed'] = pd.to_datetime(df['readed'], format='%Y-%m-%d')
    df['readed'] = df['readed'].dt.strftime('%m-%Y')

    # Filter data on year
    if datayear and datayear is not None:
        df = df.where(df['readed'].str.contains(datayear))

    return df

@api_view(['GET'])
def getYears(request):
    df = filterData(getBooksData())

    df['readed'] = pd.to_datetime(df['readed'], errors='coerce')
    df['year']= df['readed'].dt.year

    years = df.groupby('year')['year'].count().reset_index(name="count")

    return Response(years['year'])

@api_view(['GET'])
def getBooksByYear(request):
    if request.META.get('HTTP_YEAR'):
        data = []
        df = getBooksData()
        df['readed'] = pd.to_datetime(df['readed'], format='%Y-%m-%d')
        df['readed'] = df['readed'].dt.strftime('%Y-%m-%d')
        df = df.where(df['readed'].str.contains(request.META.get('HTTP_YEAR')))
        df = df.fillna('')

        for index, row in df.iterrows():
            if row['id'] and row['id'] != '':
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
def getStats(request):
    if request.META.get('HTTP_YEAR'):
        data = []
        df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))
        df = df.dropna()

        statsTotalBooks = df['name'].count()
        statsTotalGenres = df['genre'].nunique()


        data.append({
            'totalbooks': statsTotalBooks,
            'totalgenres': statsTotalGenres
        })
        

        return Response(data[0])
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
def avg_ratings_per_month(request):
    datayear = request.META.get('HTTP_YEAR')

    if datayear:
        data = []

        # Get CSV file with book data
        df = filterData(getBooksData(), request.META.get('HTTP_YEAR'))

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
def countRatings(request):
    datayear = request.META.get('HTTP_YEAR')

    if datayear:
        data = []

        # Get CSV file with book data
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
        return Response("No year header included")