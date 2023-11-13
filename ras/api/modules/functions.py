from sqlalchemy import create_engine
import ras.settings
import pandas as pd
from django.contrib.auth import get_user_model
import jwt
from django.http import JsonResponse

def isAuthorized(authtoken):
    if(authtoken):
        token = authtoken.split(' ')[1]

        User = get_user_model()
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        user = User.objects.get(id=payload['id'])

        if(user):
            return True;
        else:
            return False;
    else:
        return JsonResponse({'error': 'Unauthorized'}, safe=False)

def getBooksData():
    engine = create_engine('mysql+mysqldb://' + ras.settings.DATABASES['default']['USER'] + ':' + ras.settings.DATABASES['default']['PASSWORD'] + '@' + ras.settings.DATABASES['default']['HOST'] + ':3306/' + ras.settings.DATABASES['default']['NAME'])
    df = pd.read_sql('SELECT * FROM api_books ORDER BY readed', engine, parse_dates={'readed': {'format': '%m-%Y'}})

    return df

def filterData(df, datayear = None):
    df['readed'] = pd.to_datetime(df['readed'], format='%Y-%m-%d')
    df['readed'] = df['readed'].dt.strftime('%m-%Y')

    # Filter data on year
    if datayear and datayear is not None:
        df = df.where(df['readed'].str.contains(datayear))

    return df