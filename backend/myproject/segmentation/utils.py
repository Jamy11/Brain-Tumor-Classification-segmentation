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

def preprocess_image(image):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (IMGWIDTH, IMGHEIGHT))
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def postprocess_mask(mask):
    mask = mask.squeeze()
    mask = cv2.resize(mask, (IMGWIDTH, IMGHEIGHT))
    return mask

def segment_image(image):
    preprocessed_image = preprocess_image(image)
    predicted_mask = model.predict(preprocessed_image)
    return postprocess_mask(predicted_mask)
