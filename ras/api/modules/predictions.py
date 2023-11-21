from rest_framework.decorators import api_view
import pandas as pd
import math
from rest_framework.response import Response
from sqlalchemy import create_engine
import ras.settings
from django.http import JsonResponse
from .functions import isAuthorized, getBooksData, filterData
from sklearn.linear_model import LinearRegression

def getChallenges():
    engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
    df = pd.read_sql('SELECT * FROM book_challenge', engine)

    return df

def train_model_challenges(data):
    df = pd.DataFrame(data)

    X = df.index.values.reshape(-1, 1)
    Y = df['nrofbooks']

    model = LinearRegression()
    model.fit(X, Y)

    return model

def predict_challenge(model):
    future_index = pd.RangeIndex(start=0, stop=1, step=1)
    future_X = future_index.values.reshape(-1, 1)
    predicted_books = model.predict(future_X)

    prediction_next_year = round(predicted_books[-1])
    return prediction_next_year

@api_view(['GET'])
def predict_next_year(request):
    if(request.headers.get('Authorization')):
        isLoggedIn = isAuthorized(request.headers.get('Authorization'));

        if(isLoggedIn):
            data = getChallenges()

            trained_model = train_model_challenges(data)
            next_year_challenge = predict_challenge(trained_model)
            return Response(f"Volgend jaar lees ik {next_year_challenge} boeken")

# def train_model_books_per_month():
# def predict_books_per_month():

# def train_model_genres():
# def predict_genres():