# Generated by Django 3.1.3 on 2021-10-15 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='appointment_date',
            field=models.DateField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='appointment_location',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='consultation_date',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='consultation_location',
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='doctor',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='test_result',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
    ]
