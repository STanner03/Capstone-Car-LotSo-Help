from django.urls import path, include
from maintenance_records import views

urlpatterns = [
    path('', views.user_maintenance_records),
    path('all/', views.get_vehicle_maintenance_records),
    path('<int:pk>/update/', views.update_maintenance_record),
]
