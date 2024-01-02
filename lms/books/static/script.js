// Function to fetch book data from Django backend and update the index page
async function fetchAndDisplayBooks() {
    try {
        // Fetch book data from Django backend
        const response = await fetch('http://127.0.0.1:8000/all/');
        const books = await response.json();

        // Display books on the index page
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching book data:', error.message);
    }
}

// Function to display books on the index page
function displayBooks(books) {
    const table = document.querySelector('.image-table');

    // Clear existing content
    table.innerHTML = '';

    // Loop through each row
    for (let i = 0; i < Math.ceil(books.length / 3); i++) {
        const row = document.createElement('tr');

        // Loop through each column
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;

            if (index < books.length) {
                const book = books[index];
                const cell = document.createElement('td');
                cell.className = 'image';
                cell.id = `image${index + 1}`;

              // Create a paragraph element for the title
              const titlePara = document.createElement('p');
              titlePara.textContent = book.title;

                // Create an image element for the cover
                const coverImg = document.createElement('img');
                coverImg.src = book.cover; // Use the cover URL directly
                coverImg.alt = `Cover for ${book.title}`;
                coverImg.style.maxWidth = '100%'; // Ensure the image fits within the cell


                // Append the image and title to the cell
                cell.appendChild(coverImg);
                cell.appendChild(titlePara);

                // Attach click event listener to the cell
                cell.addEventListener('click', function() {
                     const queryString = encodeURIComponent(JSON.stringify(book.isbn));
                
                    // Use the correct path to navigate to book.html with ISBN as a path parameter
                    window.location.href = "/book/" + book.isbn;
                });


                // Append the cell to the row
                row.appendChild(cell);
            }
        }

        // Append the row to the table
        table.appendChild(row);
    }
}

function handleEditButtonClick(bookISBN) {
    // Redirect to the edit page with the book ISBN as a parameter
    window.location.href = "/update/" + bookISBN;
}

function handleDeleteButtonClick(bookISBN) {
    // Get the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');

    // Fetch with CSRF token in headers
    fetch(`/delete/${bookISBN}/`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to delete book');
        }
    })
    .then(data => {
        console.log(data.message);
        // Additional logic based on the response data

        // Redirect to the index page
        window.location.href = "/";
    })
    .catch(error => console.error(error));
}



// Function to send a PUT request with updated book details
function saveChanges() {
    // Get the form elements
    const title = document.getElementById('title').value;
    const quantity = document.getElementById('quantity').value;
    const location = document.getElementById('location').value;

    // Get the ISBN from the page (you might need to set it somewhere in your HTML)
    const isbn = document.getElementById('book-isbn').innerText.split(': ')[1].trim();

    // Prepare the data to be sent
    const data = {
        title: title,
        quantity: quantity,
        location: location,
    };

    // Send a PUT request to update the book details
    fetch(`/update/${isbn}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Log the success message
        // Optionally, redirect or update the UI after successful update
        window.location.href = "/book/" + isbn;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Function to get the CSRF token from cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function addBook() {
    // Get form data
    const isbn = document.getElementById('isbn').value;
    const title = document.getElementById('title').value;
    const quantity = document.getElementById('quantity').value;
    const cover = document.getElementById('cover').value;
    const location = document.getElementById('location').value; 

    // Create a JSON object with the form data
    const bookData = {
        isbn: isbn,
        location: location,
        title: title,
        cover: cover,
        quantity: quantity
               
    };


// Make a POST request to the server to add the book
fetch('/add/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify(bookData)
})
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Failed to add book');
    }
})
.then(data => {
    console.log(data.message);  
    alert(data.message);
    window.location.href = "/book/" + isbn;
})
.catch(error => console.error(error));
}

