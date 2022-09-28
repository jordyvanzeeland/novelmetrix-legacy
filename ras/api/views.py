from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Books
import pandas as pd

from .serializers import BooksSerializer
from django.db.models import Q
from django.templatetags.static import static
import json

@api_view(['GET'])
def api_all_books(request):
    df = pd.read_csv("api/static/books2.csv", encoding = "utf-8")
    books = []
    for book in df['Books']:
        info = book.split(';')
        books.append({
            "name": info[0],
            "author": info[1],
            "genre": info[2],
            "pages": info[3],
            "readed": info[4],
            "rating": info[5]
        })
    return Response(books)

@api_view(['GET'])
def books_per_genre_per_month(request):

    datayear = request.META.get('HTTP_YEAR')

    if datayear:

        data = []
        
        # Get CSV file with book data
        df = pd.read_csv("api/static/books2.csv", encoding = "utf-8", header = 0, sep=';')

        # Filter data on year
        df = df.where(df['readed'].str.contains(datayear))

        # Filter array on genre and date
        booksPerMonth = df.groupby(['genre','readed'])['genre'].count().reset_index(name="count")  
        booksPerMonth = booksPerMonth.sort_values(by='readed')

        for index, row in booksPerMonth.iterrows():
            data.append({
                "genre": row['genre'],
                "readed": row['readed'],
                "count": row['count']
            })
        
        return Response(data)
    else:
        return Response("No year header included")