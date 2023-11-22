import jwt, json
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
import ras.settings
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from django.http import JsonResponse
import pandas as pd
from rest_framework.response import Response
from .functions import isAuthorized, getBooksData, filterData

engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
conn = engine.connect()

# -------------------------------
# Get all books in the database
# -------------------------------

@api_view(['GET'])
def getAllBooks(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            books = getBooksData(request.headers.get('userid'))
            data = []

            for index, row in books.iterrows():
                data.append({
                    "id": row['id'],
                    "name": row['name'],
                    "author": row['author'],
                    "genre": row['genre'],
                    "readed": row['readed'],
                    "rating": row['rating'],
                })

            return Response(data)
        else:
            return JsonResponse({'error': 'No user detected'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)

# -------------------------------
# Add a book into the database
# -------------------------------

@api_view(['POST'])
def addBook(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            userid = request.headers.get('userid')
            book = request.body
            book = json.loads(book)

            conn.execute(text("INSERT INTO api_books (userid, name, author, genre, readed, rating) VALUES ('" + str(userid) + "', '" + str(book['name']) + "', '" + str(book['author']) + "', '" + str(book['genre']) + "', '" + str(book['readed']) + "', " + str(book['rating']) + ")"))
            return JsonResponse("OK", safe=False)
        else:
            return JsonResponse({'error': 'No user detected'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)

# -------------------------------
# Update a book in the database
# -------------------------------

@api_view(['PUT'])
def updateBook(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            book = request.POST.get('book')
            book = json.loads(book)
            bookid = request.headers.get('bookid')

            conn.execute(text("UPDATE api_books set name='" + str(book['name']) + "', author='" + str(book['author']) + "', genre='" + str(book['genre']) + "', readed='" + str(book['readed']) + "', rating='" + str(book['rating']) + "' WHERE id=" + str(bookid)))
            return JsonResponse("OK", safe=False)
        else:
            return JsonResponse({'error': 'No user detected'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)


# -------------------------------
# Delete a book in the database
# -------------------------------

@api_view(['DELETE'])
def deleteBook(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            bookid = request.headers.get('bookid')
            
            conn.execute(text("DELETE FROM api_books WHERE id = " + str(bookid)))
            return JsonResponse("OK", safe=False)
        else:
            return JsonResponse({'error': 'No user detected'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)