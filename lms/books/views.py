from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
import json
from .models import Book
from django.urls import path
from books import views

def index(request):
    # You can add any necessary logic here
    return render(request, 'index.html')

def get_all_books(request):
    books = Book.objects.all()
    data = [{'isbn': book.isbn,'title': book.title, 'location': book.location,'cover': book.cover} for book in books]
    return JsonResponse(data, safe=False)

def update_book(request, isbn):
    book = get_object_or_404(Book, isbn=isbn)

    if request.method == 'GET':
        return render(request, 'edit.html', {'book': book})
    elif request.method == 'PUT':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            book.title = data.get('title', book.title)
            book.quantity = data.get('quantity', book.quantity)
            book.location = data.get('location', book.location)
            book.save()
            return JsonResponse({'message': 'Book updated successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

def delete_book(request, isbn):
    book = get_object_or_404(Book, pk=isbn)
    book.delete()
    return JsonResponse({'message': 'Book deleted successfully'})

def add_book(request):
    print(request.body)
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            isbn = data.get('isbn')

            # Check if the ISBN already exists
            if Book.objects.filter(isbn=isbn).exists():
                return JsonResponse({'error': 'Book with this ISBN already exists'}, status=400)

            # Continue with creating a new book
            new_book = Book.objects.create(
                isbn=isbn,
                title=data['title'],
                location=data.get('location', ''),
                cover=data.get('cover', ''),
                quantity=data.get('quantity', 0)
            )

            return JsonResponse({'message': 'Book added successfully', 'isbn': new_book.isbn})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

def book_detail(request, isbn):
    book = get_object_or_404(Book, isbn=isbn)
    return render(request, 'book.html', {'book': book})

def add_book_page(request):
    return render(request, 'add.html')

def api_book_page(request):
    return render(request, 'bookapi.html')
