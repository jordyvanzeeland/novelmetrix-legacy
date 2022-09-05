from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Books

from .serializers import BooksSerializer
from django.db.models import Q


@api_view(['GET'])
def api_all_books(request):
    all_books = Books.objects.all()
    if all_books:
        serializer = BooksSerializer(all_books, many=True)
        return Response(serializer.data)
    else:
    	return Response({"Message": 'Books Not Found'})

@api_view(['GET'])
def api_get_book(request, _id):

    obj = Books.objects.filter(id = _id)[0]
    if obj:
        serializer = BooksSerializer(obj)
        return Response(serializer.data)
    else:
    	return Response({"Message": 'Book Not Found'})