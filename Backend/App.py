from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import cv2
import numpy as np
from PIL import Image
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
import google.generativeai as genai
import matplotlib.pyplot as plt
import io
import textwrap
import base64
import PIL.Image

app = Flask(__name__)
CORS(app)

os.environ['GOOGLE_API_KEY'] = "AIzaSyDgf5jfKC-3c5mgtJL4FHm7GyvSEWE1YHE"
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-pro-vision')

def calculate_length(contour):
    perimeter = cv2.arcLength(contour, True)
    return perimeter * 0.01

def save_cracked_parts(contours, image, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    for idx, contour in enumerate(contours, start=1):
        x, y, w, h = cv2.boundingRect(contour)
        cracked_part = image[y:y+h, x:x+w]
        cv2.imwrite(os.path.join(output_folder, f"cracked_part_{idx}.jpg"), cracked_part)

@app.route('/process_image', methods=['POST'])
def process_image():
    file = request.files['image']
    file_path = 'temp_image.jpg'
    file.save(file_path)

    img = Image.open(file_path)
    img_np = np.array(img)

    gray_img = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
    blurred_img = cv2.GaussianBlur(gray_img, (5, 5), 0)
    edges_img = cv2.Canny(blurred_img, 30, 150)
    kernel = np.ones((5, 5), np.uint8)
    closed_edges_img = cv2.morphologyEx(edges_img, cv2.MORPH_CLOSE, kernel)
    contours, _ = cv2.findContours(closed_edges_img.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    output_folder = "cracked_parts"
    save_cracked_parts(contours, img_np, output_folder)
    if contours:
        cracks = "YES"
        cl = len(contours)
    else:
        cracks = "NO"
        cl = 0

    pdf_path = "crack_measurements.pdf"
    c = canvas.Canvas(pdf_path, pagesize=letter)
    c.setFont("Helvetica", 12)

    for idx, contour in enumerate(contours, start=1):
        cv2.drawContours(img_np, [contour], -1, (0, 255, 0), 2)
        length = calculate_length(contour)
        x, y, w, h = cv2.boundingRect(contour)
        cv2.putText(img_np, f"Crack {idx}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)
        c.drawString(50, 750 - idx * 20, f"Crack {idx}: {length:.2f} cm")
    
    c.save()

    plt.imshow(img_np)
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    img_str = base64.b64encode(buffer.read()).decode('utf-8')
    plt.close()
    
    res = model.generate_content(["Analyse the image and give me the repair recommendations of the identified cracks in the flight", img], stream=True)
    res.resolve()
    analysis_text = to_markdown(res.text)
    analysis_text_str = str(analysis_text)
    return jsonify({'analysis_text': analysis_text_str, 'cracks': cracks, 'cl': cl, 'image_data': img_str})

@app.route('/images')
def get_images():
    images = os.listdir("cracked_parts")
    return jsonify(images)

@app.route('/images/<path:filename>')
def get_image(filename):
    return send_from_directory("cracked_parts", filename)

def to_markdown(text):
    text = text.replace(' • ', '* ')
    return textwrap.indent(text, '> ', predicate=lambda _: True)

@app.route('/analyze_image_summary', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in request'}), 400

    img_file = request.files['image']
    img = PIL.Image.open(img_file)

    repair_recommendations = generate_recommendations(img)
    return jsonify({'repair_recommendations': to_markdown(repair_recommendations)})

def generate_recommendations(img):
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content(["Analyse the image and give me the repair recommendations", img], stream=True)
    response.resolve()
    return response.text

if __name__ == '__main__':
    app.run(debug=True)
