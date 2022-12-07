from django.urls import path, include
from makes import views

urlpatterns = [
    path('add/', views.create_make),
    path('all/', views.get_all_makes),
    path('<int:pk>/update/', views.update_make),
    path('<int:mpk>/model/')
]
