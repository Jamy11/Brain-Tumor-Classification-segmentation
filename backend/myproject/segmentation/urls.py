# from django.urls import path
# from .views import ImageUploadView

from django.urls import path
from .views import SegmentationView



urlpatterns = [
    path('segmentation/', SegmentationView.as_view(), name='segmentation'),
]


