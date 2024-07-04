from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.core.files.storage import default_storage
from django.http import JsonResponse
from .utils import segment_image  # Assuming this is your segmentation function
import numpy as np
import cv2
import io
import base64

IMGHEIGHT, IMGWIDTH = 224, 224  # Adjust according to your model's input size

def preprocess_image(image):
    image = cv2.resize(image, (IMGWIDTH, IMGHEIGHT))
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

# class SegmentationView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, *args, **kwargs):
#         file = request.FILES.get('file')

#         if not file:
#             return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             file_name = default_storage.save(file.name, file)
#             file_path = default_storage.path(file_name)

#             # Read and preprocess the image
#             img = cv2.imread(file_path)
#             if img is None:
#                 return Response({"error": "Invalid image"}, status=status.HTTP_400_BAD_REQUEST)
#             img = preprocess_image(img)

#             # Perform segmentation
#             segmented_mask = segment_image(img)

#             # Convert the mask to an image and encode it to PNG
#             segmented_mask = segmented_mask.squeeze()  # Remove batch dimension
#             segmented_mask = (segmented_mask * 255).astype(np.uint8)  # Convert mask to 8-bit
#             _, buffer = cv2.imencode('.png', segmented_mask)
#             encoded_image = base64.b64encode(buffer).decode('utf-8')

#             return Response({"segmented_image": encoded_image}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SegmentationView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            file_name = default_storage.save(file.name, file)
            file_path = default_storage.path(file_name)

            # Read the image
            img = cv2.imread(file_path)
            if img is None:
                return Response({"error": "Invalid image"}, status=status.HTTP_400_BAD_REQUEST)

            # Perform segmentation using the utility function
            segmented_mask = segment_image(img)

            # Convert the mask to an image and encode it to PNG
            segmented_mask = (segmented_mask * 255).astype(np.uint8)  # Convert mask to 8-bit
            _, buffer = cv2.imencode('.png', segmented_mask)
            encoded_image = base64.b64encode(buffer).decode('utf-8')

            return Response({"segmented_image": encoded_image}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)