from django.urls import path, include
from fill_up_records import views

urlpatterns = [
    path('add/', views.create_fill_up_record),
    path('all/', views.get_all_fill_up_records),
    path('<int:pk>/update/', views.update_fill_up_record),
]
