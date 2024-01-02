from django.urls import path
from django.conf.urls import include
from . import views  


urlpatterns = [
    path('', views.index, name='index'),
    path('all/', views.get_all_books, name='get_all_books'),   
    path('update/<str:isbn>/', views.update_book, name='update_book'),
    path('delete/<str:isbn>/', views.delete_book, name='delete_book'),
    path('add/', views.add_book, name='add_book'),
    path('addp/', views.add_book_page, name='add_book_page'),
    path('book/<str:isbn>/', views.book_detail, name='book_detail'),
    path('addapi/', views.api_book_page, name='api_book_page'),
]