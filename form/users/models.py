from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=200, default=None, blank=True, null=True)
    last_name = models.CharField(max_length=200, default=None, blank=True, null=True)
    email = models.CharField(max_length=200, default=None, blank=True, null=True) 
    appointment_location = models.CharField(max_length=200, default=None, blank=True, null=True) 
    appointment_date = models.DateField(max_length=200, blank=True, null=True) 
    doctor = models.CharField(max_length=200, default=None, blank=True, null=True) 
    consultation_location = models.CharField(max_length=200, default=None, blank=True, null=True) 
    consultation_date = models.DateField(blank=True, null=True) 
    test_result = models.BooleanField(max_length=200, blank=True, null=True)