from django.urls import path, include
from model import views

urlpatterns = [
    path('all/', views.get_all_models),
    path('add/', views.create_model),
    path('', views.get_all_models_per_make),
    path('<int:pk>/update/', views.update_model),
    path('<int:modpk>/vehicle/', include('vehicle.urls')),
]
