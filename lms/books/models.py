from django.db import models

class Book(models.Model):
    isbn = models.CharField(primary_key=True, max_length=13)
    title = models.CharField(max_length=255)
    location = models.TextField()
    cover = models.CharField(max_length=255)
    quantity = models.IntegerField(default=0)
    def __str__(self):
        return self.title