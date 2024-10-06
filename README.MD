# **Brain Tumor Detection, Classification & Segmentation Using Machine Learning Algorithms**

This project is a web-based application for brain tumor detection using machine learning. The backend is powered by Django REST API with a brain tumor classification model, and the frontend is built using Next.js.

## **Features**

- **Image Classification:**
  Users can upload MRI images to classify brain tumors into one of four categories: Glioma, Meningioma, No Tumor, and Pituitary.
- **Image Segmentation:**
  Provides segmented images to identify the tumor location.
- **Real-time Predictions:**
  Get prediction results with percentages for each class.

## **Technologies Used**

Backend: Django REST Framework (Python)
Frontend: Next.js (JavaScript/React)
Machine Learning Model: Convolutional Neural Network (Keras)
Installation
Backend (Django)
Clone the repository:
bash
Copy code
git clone https://github.com/your-repo.git
Navigate to the backend directory:
bash
Copy code
cd backend
Set up a virtual environment:
bash
Copy code
python -m venv env
source env/bin/activate # For Windows: .\env\Scripts\activate
Install dependencies:
bash
Copy code
pip install -r requirements.txt
Apply migrations:
bash
Copy code
python manage.py migrate
Run the Django development server:
bash
Copy code
python manage.py runserver
Frontend (Next.js)
Navigate to the frontend directory:
bash
Copy code
cd frontend
Install dependencies:
bash
Copy code
npm install
Run the Next.js development server:
bash
Copy code
npm run dev
Usage
Open the frontend by visiting http://localhost:3000 in your browser.
Upload an MRI image for classification or segmentation.
View the prediction results with percentage values for each tumor class.
Project Structure
backend/: Contains the Django REST API for handling image uploads and making predictions.
frontend/: Contains the Next.js app for the user interface.
API Endpoints
/api/predict/: Endpoint to classify images into tumor categories.
/api/segment/: Endpoint to return the segmented image of the tumor.
License
This project is licensed under the MIT License.
