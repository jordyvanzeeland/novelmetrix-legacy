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
    try:
        authorization_token = request.headers.get('Authorization')
        isLoggedIn = isAuthorized(authorization_token)

        if not authorization_token:
            return JsonResponse({'error': 'No authorization token'}, safe=False)

        if not isLoggedIn:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
        
        books = getBooksData(request.headers.get('userid'))
        data = books.to_dict(orient='records')
        return Response(data)
    
    except Exception as e:
        return JsonResponse({'error': 'An error occurred: {}'.format(str(e))}, safe=False)

# -------------------------------
# Add a book into the database
# -------------------------------

@api_view(['POST'])
def addBook(request):
    try:
        authorization_token = request.headers.get('Authorization')
        isLoggedIn = isAuthorized(authorization_token)

        if not authorization_token:
            return JsonResponse({'error': 'No authorization token'}, safe=False)

        if not isLoggedIn:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
        
        userid = request.headers.get('userid')
        book_data = json.loads(request.body)
        query = text("INSERT INTO api_books (userid, name, author, genre, readed, rating) VALUES (:userid, :name, :author, :genre, :readed, :rating)")
        conn.execute(query, {
            'userid': userid,
            'name': book_data['name'],
            'author': book_data['author'],
            'genre': book_data['genre'],
            'readed': book_data['readed'],
            'rating': book_data['rating']
        })

        return JsonResponse("OK", safe=False)
        
    except Exception as e:
        return JsonResponse({'error': 'An error occurred: {}'.format(str(e))}, safe=False)

# -------------------------------
# Update a book in the database
# -------------------------------

@api_view(['PUT'])
def updateBook(request):
    try:
        authorization_token = request.headers.get('Authorization')
        isLoggedIn = isAuthorized(authorization_token)

        if not authorization_token:
            return JsonResponse({'error': 'No authorization token'}, safe=False)

        if not isLoggedIn:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
        
        book_data = json.loads(request.POST.get('book'))
        bookid = request.headers.get('bookid')
        query = text("UPDATE api_books SET name=:name, author=:author, genre=:genre, readed=:readed, rating=:rating WHERE id=:bookid")
        conn.execute(query, {
            'name': book_data['name'],
            'author': book_data['author'],
            'genre': book_data['genre'],
            'readed': book_data['readed'],
            'rating': book_data['rating'],
            'bookid': bookid
        })

        return JsonResponse("OK", safe=False)
        
    except Exception as e:
        return JsonResponse({'error': 'An error occurred: {}'.format(str(e))}, safe=False)

# -------------------------------
# Delete a book in the database
# -------------------------------

@api_view(['DELETE'])
def deleteBook(request):
    try:
        authorization_token = request.headers.get('Authorization')
        isLoggedIn = isAuthorized(authorization_token)

        if not authorization_token:
            return JsonResponse({'error': 'No authorization token'}, safe=False)

        if not isLoggedIn:
            return JsonResponse({'error': 'Unauthorized'}, safe=False)
        
        bookid = request.headers.get('bookid')
        query = text("DELETE FROM api_books WHERE id=:bookid")
        conn.execute(query, {
            'bookid': bookid
        })

        return JsonResponse("OK", safe=False)
        
    except Exception as e:
        return JsonResponse({'error': 'An error occurred: {}'.format(str(e))}, safe=False)