# segmentation/utils.py
import numpy as np
import cv2
from tensorflow.keras.models import load_model
# from PIL import Image
import io
import os
from django.conf import settings

# Load your model
model_path = os.path.join(settings.BASE_DIR, 'brain_tumor_segmentation.h5')
model = load_model(model_path)
IMGHEIGHT, IMGWIDTH = 224, 224  # Adjust according to your model's input size

# IMGHEIGHT, IMGWIDTH = 224, 224  # Adjust according to your input size

def preprocess_image(image_path, target_size=(224, 224)):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Image not found at path: {image_path}")
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, target_size)
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def postprocess_mask(mask, target_size=(224, 224)):
    mask = mask.squeeze()
    mask = cv2.resize(mask, target_size)
    return mask

def segment_image(image):
    # Preprocess the image
    preprocessed_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    preprocessed_image = cv2.resize(preprocessed_image, (IMGWIDTH, IMGHEIGHT))
    preprocessed_image = preprocessed_image / 255.0
    preprocessed_image = np.expand_dims(preprocessed_image, axis=0)
    
    # Predict the mask
    predicted_mask = model.predict(preprocessed_image)
    predicted_mask = postprocess_mask(predicted_mask)

    return predicted_mask
