# Generated by Django 5.0 on 2023-12-26 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='cover',
            field=models.CharField(default='https://images.isbndb.com/covers/54/67/9780060935467.jpg', max_length=255),
            preserve_default=False,
        ),
    ]
