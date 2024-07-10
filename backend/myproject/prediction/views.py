from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse
from django.core.files.storage import default_storage
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import os
from django.conf import settings
# Load your trained model

model_path = os.path.join(settings.BASE_DIR, 'BrainTumors.h5')
model = load_model(model_path)

# model = load_model('./BrainTumors.h5')
class_names = ['Glioma', 'Meningioma', 'No Tumor', 'Pituitary']


# # Home page view
# def index(request):
#     return render(request, 'index.html')
def preprocess_image(image):
    image = cv2.resize(image, (224, 224))  # Ensure the image is 224x224
    # image = image / 255.0  # Normalize the image
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES['file']
        file_name = default_storage.save(file.name, file)
        file_path = default_storage.path(file_name)
        
        # Read and preprocess the image
        img = cv2.imread(file_path)
        img = preprocess_image(img)

        # Make prediction
        prediction = model.predict(img)
        print(prediction)
        predicted_class = class_names[np.argmax(prediction)]

        return JsonResponse({'prediction': predicted_class})
