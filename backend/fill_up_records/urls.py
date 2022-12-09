from django.urls import path, include
from fill_up_records import views

urlpatterns = [
    path('', views.user_fill_up_records),
    path('all/', views.get_vehicle_fill_up_records),
    path('<int:pk>/update/', views.update_fill_up_record),
]
