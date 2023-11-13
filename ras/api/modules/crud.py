import jwt, json
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
import ras.settings
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from django.http import JsonResponse
import pandas as pd
from rest_framework.response import Response

engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
conn = engine.connect()

# -------------------------------
# Get all books in the database
# -------------------------------

@api_view(['GET'])
def getAllBooks(request):
    if(request.headers.get('Authorization')):
        token = request.headers.get('Authorization').split(' ')[1]

        try:
            User = get_user_model()
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])

            if(user):
                books = pd.read_sql('SELECT * FROM api_books ORDER BY readed', engine, parse_dates={'readed': {'format': '%m-%Y'}})
                data = []

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
            else:
                return JsonResponse({'error': 'No user detected'}, safe=False)

        except (jwt.DecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Token invalid'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)

# -------------------------------
# Add a book into the database
# -------------------------------

@api_view(['POST'])
def addBook(request):
    if(request.headers.get('Authorization')):
        token = request.headers.get('Authorization').split(' ')[1]
        book = request.POST.get('book')
        book = json.loads(book)

        try:
            User = get_user_model()
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])

            if(user):
                conn.execute(text("INSERT INTO api_books (name, author, genre, country, country_code, pages, readed, rating) VALUES ('" + str(book['name']) + "', '" + str(book['author']) + "', '" + str(book['genre']) + "', '" + str(book['country']) + "', '" + str(book['country_code']) + "', " + str(book['pages']) + ", '" + str(book['readed']) + "', " + str(book['rating']) + ")"))
                return JsonResponse("OK", safe=False)
            else:
                return JsonResponse({'error': 'No user detected'}, safe=False)

        except (jwt.DecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Token invalid'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)

# -------------------------------
# Update a book in the database
# -------------------------------

@api_view(['PUT'])
def updateBook(request):
    if(request.headers.get('Authorization')):
        token = request.headers.get('Authorization').split(' ')[1]
        book = request.POST.get('book')
        book = json.loads(book)
        bookid = request.headers.get('bookid')

        try:
            User = get_user_model()
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])

            if(user):
                conn.execute(text("UPDATE api_books set name='" + str(book['name']) + "', author='" + str(book['author']) + "', genre='" + str(book['genre']) + "', country='" + str(book['country']) + "', country_code='" + str(book['country_code']) + "', pages='" + str(book['pages']) + "', readed='" + str(book['readed']) + "', rating='" + str(book['rating']) + "' WHERE id=" + str(bookid)))
                return JsonResponse("OK", safe=False)
            else:
                return JsonResponse({'error': 'No user detected'}, safe=False)

        except (jwt.DecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Token invalid'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)


# -------------------------------
# Delete a book in the database
# -------------------------------

@api_view(['DELETE'])
def deleteBook(request):
    if(request.headers.get('Authorization')):
        token = request.headers.get('Authorization').split(' ')[1]
        bookid = request.headers.get('bookid')

        try:
            User = get_user_model()
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])

            if(user):
                conn.execute(text("DELETE FROM api_books WHERE id = " + str(bookid)))
                return JsonResponse("OK", safe=False)
            else:
                return JsonResponse({'error': 'No user detected'}, safe=False)

        except (jwt.DecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Token invalid'}, safe=False)
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)