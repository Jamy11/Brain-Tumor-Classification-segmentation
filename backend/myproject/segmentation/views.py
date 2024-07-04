from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.core.files.storage import default_storage
from django.http import JsonResponse
# from .utils import segment_image  # Assuming this is your segmentation function
import numpy as np
import cv2
import os
import base64
from django.conf import settings
from tensorflow.keras.models import load_model
from django.http import FileResponse
from PIL import Image
import matplotlib.pyplot as plt

# Load your segmentation model
model_path = os.path.join(settings.BASE_DIR, 'brain_tumor_segmentation.h5')
# model = load_model(model_path)
try:
    model = load_model(model_path)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None  # Handle the case where model loading fails
IMGHEIGHT, IMGWIDTH = 224, 224  # Adjust according to your model's input size
MEDIA_ROOT = os.path.join(settings.BASE_DIR, 'media')

# def preprocess_image(image):
#     image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#     image = cv2.resize(image, (IMGWIDTH, IMGHEIGHT))
#     image = image / 255.0
#     image = np.expand_dims(image, axis=0)
#     return image

# def postprocess_mask(mask):
#     mask = mask.squeeze()
#     mask = cv2.resize(mask, (IMGWIDTH, IMGHEIGHT))
#     return mask

# def segment_image(image):
#     # Preprocess the image
#     preprocessed_image = preprocess_image(image)
    
#     # Predict the mask
#     predicted_mask = model.predict(preprocessed_image)
#     predicted_mask = postprocess_mask(predicted_mask)

#     return predicted_mask

# class SegmentationView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, *args, **kwargs):
#         file = request.FILES.get('file')

#         if not file:
#             return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             file_name = default_storage.save(file.name, file)
#             file_path = default_storage.path(file_name)

#             # Read the image
#             img = cv2.imread(file_path)
#             if img is None:
#                 return Response({"error": "Invalid image"}, status=status.HTTP_400_BAD_REQUEST)

#             # Perform segmentation using the utility function
#             segmented_mask = segment_image(img)

#             # Convert the mask to grayscale image and encode it to base64
#             segmented_mask = (segmented_mask * 255).astype(np.uint8)  # Convert mask to 8-bit
#             _, buffer = cv2.imencode('.png', segmented_mask)
#             encoded_image = base64.b64encode(buffer).decode('utf-8')

#             return Response({"segmented_image": encoded_image}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def preprocess_image(image):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (IMGWIDTH, IMGHEIGHT))
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def postprocess_mask(mask):
    mask = mask.squeeze()
    print(f"Mask values before scaling: min={mask.min()}, max={mask.max()}")  # Debug print
    
    # Normalize mask values to range between 0 and 1
    mask = (mask - mask.min()) / (mask.max() - mask.min())
    mask = (mask * 255).astype(np.uint8)
    
    print(f"Mask values after scaling: min={mask.min()}, max={mask.max()}")  # Debug print
    mask = cv2.resize(mask, (IMGWIDTH, IMGHEIGHT))
    return mask

def save_image(image, output_path):
    cv2.imwrite(output_path, image)

# Define your API view for segmentation\
class SegmentationView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            segmentation_folder = os.path.join(settings.MEDIA_ROOT, 'segmentation')

            # Load and preprocess the uploaded image
            image = Image.open(file)
            image = np.array(image)
            preprocessed_image = preprocess_image(image)
            
            # Print preprocessed image range for debugging
            print(f"Preprocessed image values: min={preprocessed_image.min()}, max={preprocessed_image.max()}")  # Debug print

            # Save preprocessed image for debugging
            preprocessed_image_path = os.path.join(segmentation_folder, 'preprocessed_image.png')
            save_image((preprocessed_image[0] * 255).astype(np.uint8), preprocessed_image_path)  # Note: removing the batch dimension and scaling

            # Predict the mask using your model
            predicted_mask = model.predict(preprocessed_image)
            
            # Print predicted mask range for debugging
            print(f"Predicted mask values: min={predicted_mask.min()}, max={predicted_mask.max()}")  # Debug print

            # Post-process the predicted mask
            predicted_mask = postprocess_mask(predicted_mask)

            # Save the segmented mask for debugging
            predicted_mask_path = os.path.join(segmentation_folder, 'predicted_mask.png')
            save_image(predicted_mask, predicted_mask_path)

            # Save the post-processed mask
            output_path = os.path.join(segmentation_folder, 'postprocess_mask.png')
            save_image(predicted_mask, output_path)

            # Respond with success message or URL of saved image
            # Encode the predicted mask as base64
            _, encoded_image = cv2.imencode('.png', predicted_mask)
            encoded_image_base64 = base64.b64encode(encoded_image).decode('utf-8')

            # Respond with the base64-encoded image data
            return Response({"segmentation_result": encoded_image_base64}, status=status.HTTP_200_OK)
            # return Response({"segmentation_result": output_path}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)