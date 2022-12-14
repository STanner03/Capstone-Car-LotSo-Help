from django.urls import path, include
from vehicle import views

urlpatterns = [
    path('', views.user_vehicles),
    path('all/', views.get_all_vehicles),
    path('<int:pk>/update/', views.update_vehicle),
    path('<int:vpk>/fillup/', include('fill_up_records.urls')),
    path('<int:vpk>/maintenance/', include('maintenance_records.urls')),
]
