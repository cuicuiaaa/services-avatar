from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .producer import publish, publishToConsultations, publishToAppointment, publishToResult
from .serializers import UserSerializer

import random

class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def create(self, request): #api/users
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        publish('user_created', serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, uk=None): #api/user/id
        user = User.objects.get(id=uk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def update(self, request, uk=None): #api/user/id
        user = User.objects.get(id=uk)
        serializer = UserSerializer(instance=user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        publish('user_updated', serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, uk=None): #api/user/id
        user = User.objects.get(id=uk)
        user.delete()
        publish('user_deleted', uk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def getSingleUser(self, request, uk=None): #api/user
        try:
            user = User.objects.get(email=request.data['email'])
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            user = None
            return Response(status=status.HTTP_204_NO_CONTENT)
        
    def updateConsultations(self, request, uk=None):
        user = User.objects.get(id=uk)
        serializer = UserSerializer(instance=user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        publishToConsultations('user_consultations_updated', serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    
    def updateAppointment(self, request, uk=None):
        user = User.objects.get(id=uk)
        serializer = UserSerializer(instance=user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        publishToAppointment('user_appointment_updated', serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def updateResult(self, request, uk=None):
        try:
            user = User.objects.get(email=request.data['email'])
            serializer = UserSerializer(instance=user, data={"test_result": bool(random.getrandbits(1))})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            publishToResult('user_result_updated', serializer.data)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except User.DoesNotExist:
            user = None
            return Response(status=status.HTTP_204_NO_CONTENT)