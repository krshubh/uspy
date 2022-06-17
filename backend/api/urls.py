from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView
from .views import AddressView,UserView, ProfileView, ParentView, ChildrenView
from .views import SignupView, LoginView, ChangePasswordView
from .views import CallLogView, MessageLogView
from .views import AddParentRequest, AddChildrenRequest, \
                    DeleteParentRequested, DeleteChildrenRequested, \
                    ConfirmParentRequest, ConfirmChildrenRequest, \
                    DeleteParentRequests, DeleteChildrenRequests, \
                    DeleteParentConfirmed, DeleteChildrenConfirmed
# from .views import get_parent_using_user_id, get_children_using_user_id

urlpatterns = [
    path('',views.getRoutes),
    path('login',LoginView.as_view()),
    path('login/',LoginView.as_view()),
    path('signup/',SignupView.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view()),
    path('user/parent/', ParentView.as_view()),
    path('user/parent/add_request/', AddParentRequest.as_view()),
    path('user/parent/delete_requested/', DeleteParentRequested.as_view()),
    path('user/parent/delete_requests/', DeleteParentRequests.as_view()),
    path('user/parent/confirm_requests/', ConfirmParentRequest.as_view()),
    path('user/parent/delete_confirmed/', DeleteParentConfirmed.as_view()),
    # path('user/<int:user_id>/parent/', get_parent_using_user_id, name='get-parent-using-userid'),
    path('user/children', ChildrenView.as_view()),
    path('user/children/add_request/', AddChildrenRequest.as_view()),
    path('user/children/delete_requested/', DeleteChildrenRequested.as_view()),
    path('user/children/delete_requests/', DeleteChildrenRequests.as_view()),
    path('user/children/confirm_requests/', ConfirmChildrenRequest.as_view()),
    path('user/children/delete_confirmed/', DeleteChildrenConfirmed.as_view()),
    # path('user/<int:user_id>/children', get_children_using_user_id, name='get-children-using-userid'),
    path('user/address/',AddressView.as_view()),
    path('user',UserView.as_view()),
    path('change_password',ChangePasswordView.as_view(), name = "change password"),
    path('change_password/',ChangePasswordView.as_view(), name = "change password"),
    path('call_log/',CallLogView.as_view(), name = "call log"),
    path('message/',MessageLogView.as_view(), name = "message")
]

