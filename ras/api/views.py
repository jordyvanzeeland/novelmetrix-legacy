from sqlite3 import connect
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import ras.settings
import math
from pymongo import MongoClient

from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

from sqlalchemy import create_engine
from django.db.models import Q
from django.templatetags.static import static
import json


def getBooksData():
    engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
    df = pd.read_sql('SELECT * FROM api_books ORDER BY readed', engine, parse_dates={'readed': {'format': '%m-%Y'}})

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