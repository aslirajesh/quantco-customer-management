import re
from rest_framework import serializers
from .models import Customer
from datetime import date

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

    def validate_first_name(self, value):
        # Allow letters and spaces only
        if not re.match("^[A-Za-z ]*$", value):
            raise serializers.ValidationError("First name must contain only letters and spaces.")
        return value

    def validate_last_name(self, value):
        # Allow letters and spaces only
        if not re.match("^[A-Za-z ]*$", value):
            raise serializers.ValidationError("Last name must contain only letters and spaces.")
        return value

    def validate_date_of_birth(self, value):
        if value >= date.today():
            raise serializers.ValidationError("Date of birth must be in the past.")
        return value

    def validate_phone_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits.")
        if len(value) < 10 or len(value) > 15:
            raise serializers.ValidationError("Phone number must be between 10 and 15 digits.")
        return value
