from django.urls import path

from .views import UserViewSet

urlpatterns = [
    path('users', UserViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('user', UserViewSet.as_view({
        'post': 'getSingleUser'
    })),
    path('user/<str:uk>', UserViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('consults/<str:uk>', UserViewSet.as_view({
        'put': 'updateConsultations'
    })),
    path('appointment/<str:uk>', UserViewSet.as_view({
        'put': 'updateAppointment'
    })),
    path('result', UserViewSet.as_view({
        'put': 'updateResult'
    }))
]