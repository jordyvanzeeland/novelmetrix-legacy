import jwt, json
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
import ras.settings
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from django.http import JsonResponse
import pandas as pd
from rest_framework.response import Response
from .functions import isAuthorized, getBooksData, getBookChallenge, filterData

@api_view(['GET'])
def getAllChallenges(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            df = getBookChallenge(request.headers.get('userid'))

            data = df.apply(lambda row: {
                "id": row['id'],
                "year": row['year'],
                "nrofbooks": row['nrofbooks'],
                "booksread": filterData(getBooksData(request.headers.get('userid')), str(row['year'])).dropna()['name'].count()
            }, axis=1).tolist()

            return Response(data)
        else:
            return JsonResponse({'error': 'No user detected'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)

@api_view(['GET'])
def getChallengeOfYear(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            if request.META.get('HTTP_YEAR'):
                df = getBookChallenge(request.headers.get('userid'), request.META.get('HTTP_YEAR'))
                data = df.apply(lambda row: {'year': row['year'], 'nrofbooks': row['nrofbooks']}, axis=1).tolist()
                return Response(data)
            else:
                return JsonResponse({'error': 'No year header included'}, safe=False)
        else:
            return JsonResponse({'error': 'No user detected'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)

@api_view(['POST'])
def addChallenge(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
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
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)

@api_view(['DELETE'])
def deleteChallenge(request, id = None):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            if(id):
                engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
                conn = engine.connect()
                conn.execute(text("DELETE FROM book_challenge WHERE id = " + str(id)))
                return JsonResponse("OK", safe=False)
            else:
                return JsonResponse({'error': 'No challengeid detected'}, safe=False)
        else:
            return JsonResponse({'error': 'No user detected'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)
   