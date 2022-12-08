from django.urls import path, include
from maintenance_records import views

urlpatterns = [
    path('add/', views.create_maintenance_record),
    path('all/', views.get_all_maintenance_records),
    path('<int:pk>/update/', views.update_maintenance_record),
]
