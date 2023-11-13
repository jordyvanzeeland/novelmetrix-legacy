import jwt, json
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
import ras.settings
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from django.http import JsonResponse
import pandas as pd
from rest_framework.response import Response

def filterData(df, datayear = None):
    df['readed'] = pd.to_datetime(df['readed'], format='%Y-%m-%d')
    df['readed'] = df['readed'].dt.strftime('%m-%Y')

    # Filter data on year
    if datayear and datayear is not None:
        df = df.where(df['readed'].str.contains(datayear))

    return df

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

@api_view(['GET'])
def getAllChallenges(request):
    data = []
    df = getBookChallenge()

    for index, row in df.iterrows():

        books = filterData(getBooksData(), str(row['year']))
        books = books.dropna()

        totalBooksRead = books['name'].count()

        data.append({
            "id": row['id'],
            "year": row['year'],
            "nrofbooks": row['nrofbooks'],
            "booksread": totalBooksRead
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

@api_view(['POST'])
def addChallenge(request):
    if(request.headers.get('Authorization')):
        token = request.headers.get('Authorization').split(' ')[1]

        try:
            User = get_user_model()
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])

            if(user):
                year = request.POST.get('year')
                challenge = request.POST.get('challenge')

                if(year and challenge):
                    engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
                    conn = engine.connect()
                    conn.execute(text("INSERT INTO book_challenge (year, nrofbooks) VALUES ('" + str(year) + "', '" + str(challenge) + "')"))
                    return JsonResponse("OK", safe=False)
                else:
                    return JsonResponse({'error': 'No year and challenge detected'}, safe=False)
            else:
                return JsonResponse({'error': 'No user detected'}, safe=False)
        except (jwt.DecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Token invalid'}, safe=False)

@api_view(['DELETE'])
def deleteChallenge(request, id = None):

    if(request.headers.get('Authorization')):
        token = request.headers.get('Authorization').split(' ')[1]

        try:
            User = get_user_model()
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])

            if(user):

                if(id):
                    engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
                    conn = engine.connect()
                    conn.execute(text("DELETE FROM book_challenge WHERE id = " + str(id)))
                    return JsonResponse("OK", safe=False)
                else:
                    return JsonResponse({'error': 'No challengeid detected'}, safe=False)
            else:
                return JsonResponse({'error': 'No user detected'}, safe=False)
        except (jwt.DecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Token invalid'}, safe=False)     