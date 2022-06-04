from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView
from .views import AddressList, AddressDetail
from .views import SignupView

urlpatterns = [
    path('',views.getRoutes),
    path('signup/',SignupView.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('address/', AddressList.as_view()),
    path('address/<int:pk>/', AddressDetail.as_view()),
]

