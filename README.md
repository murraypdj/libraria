# Libraria - Your Django Library Management System

Libraria is a Django-based Library Management System (LMS) that allows users to manage and organize their book collection efficiently. Whether you're a book enthusiast or managing a small library, Libraria provides a user-friendly interface for adding, editing, and deleting books.

## Features

- Add books with details like ISBN, title, quantity, cover, and storage location.
- Add books by ISB via Open Library API
- Edit and update book information.
- Delete books from the collection.
- View a list of all books in the library.
- Responsive design for a seamless user experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/murraypdj/libraria.git
   cd libraria

2. Create a virtual enviroment:
   python -m venv venv

3. Activate the virtual environment:
   On macOS and Linux:
   source venv/bin/activate
   On Windows:
   .\venv\Scripts\activate

5. Install dependencies:
   pip install -r requirements.txt

6. Apply migrations:
   python manage.py migrate

7. Run the development server:
   python manage.py runserver

Visit http://localhost:8000/ in your web browser to access the Libraria application.



