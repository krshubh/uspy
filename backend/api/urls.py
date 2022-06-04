from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView
from .views import AddressView, ProfileView, ParentView, ChildrenView
from .views import SignupView
from .views import get_parent_using_user_id, get_children_using_user_id

urlpatterns = [
    path('',views.getRoutes),
    path('signup/',SignupView.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('address/', AddressView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('profile/parent/', ParentView.as_view()),
    path('profile/<int:user_id>/parent/', get_parent_using_user_id, name='get-parent-using-userid'),
    path('profile/children/', ChildrenView.as_view()),
    path('profile/<int:user_id>/children/', get_children_using_user_id, name='get-children-using-userid'),
]

