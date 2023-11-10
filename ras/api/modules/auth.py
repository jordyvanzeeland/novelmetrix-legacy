from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.http import JsonResponse
import jwt

@api_view(['POST'])
def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')

    User = get_user_model()

    try:
        user = User.objects.get(username=username)

        if user.check_password(password):
            payload = {
                'id': user.id, 
                'name': user.first_name + ' ' + user.last_name,
                'username': user.username,
                'email': user.email
            }
            token = jwt.encode(payload, 'secret', algorithm='HS256')
            
            return JsonResponse({
                "user": payload,
                "token": token
            })
        else:
            return JsonResponse({'error': 'Wrong credentials'})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'})