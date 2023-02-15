import jwt, json
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from sqlalchemy import create_engine, insert
from sqlalchemy.sql import text
from django.http import JsonResponse
import ras.settings

@api_view(['POST'])
def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')

    User = get_user_model()
    try:
        user = User.objects.get(username=username)

        if user.check_password(password):
            payload = {'id': user.id, 'username': user.username}
            jwt_token = {'token': jwt.encode(payload, 'secret', algorithm='HS256')}
            return JsonResponse(jwt_token)
        else:
            return JsonResponse({'error': 'Wrong credentials'})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'})

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
                engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
                conn = engine.connect()
                conn.execute(text("INSERT INTO api_books (name, author, genre, country, country_code, pages, readed, rating) VALUES ('" + str(book['name']) + "', '" + str(book['author']) + "', '" + str(book['genre']) + "', '" + str(book['country']) + "', '" + str(book['country_code']) + "', " + str(book['pages']) + ", '" + str(book['readed']) + "', " + str(book['rating']) + ")"))
                return JsonResponse("OK", safe=False)
            else:
                return JsonResponse({'error': 'No user detected'}, safe=False)

        except (jwt.DecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Token invalid'}, safe=False)
    else:
        return JsonResponse({'error': 'testing'}, safe=False)

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
                engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
                conn = engine.connect()
                conn.execute(text("UPDATE api_books set name='" + str(book['name']) + "', author='" + str(book['author']) + "', genre='" + str(book['genre']) + "', country='" + str(book['country']) + "', country_code='" + str(book['country_code']) + "', pages='" + str(book['pages']) + "', readed='" + str(book['readed']) + "', rating='" + str(book['rating']) + "' WHERE id=" + str(bookid)))

                return JsonResponse("OK", safe=False)
            else:
                return JsonResponse({'error': 'No user detected'}, safe=False)

        except (jwt.DecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Token invalid'}, safe=False)
    else:
        return JsonResponse({'error': 'No Token'}, safe=False)

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
                engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
                conn = engine.connect()
                conn.execute(text("DELETE FROM api_books WHERE id = " + str(bookid)))
                return JsonResponse("OK", safe=False)
            else:
                return JsonResponse({'error': 'No user detected'}, safe=False)

        except (jwt.DecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Token invalid'}, safe=False)
    else:
        return JsonResponse({'error': 'No Token'}, safe=False)