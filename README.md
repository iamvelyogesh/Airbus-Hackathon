# Aircraft Damage Detection and Repair Recommendation Tool

## Overview

This project aims to develop a comprehensive web application for detecting damage on aircraft surfaces and identifying faulty wires in harnesses. Leveraging advanced imaging and analysis techniques, the tool provides accurate damage assessment and repair recommendations. Key functionalities include repair recommendations generation, faulty wire location identification, damage assessment using machine learning algorithms, image analysis, CAD 3D projection, and a user-friendly web interface.

## Backend Documnetation:-
# GAN-Based Anomaly Detection in Electrical Signals

## Introduction

In this notebook, we demonstrate the use of Generative Adversarial Networks (GANs) for detecting anomalies in electrical signals. The GAN model is trained to generate synthetic signals that closely resemble normal electrical signals. By comparing the real signals to the generated ones, we can identify anomalies.

## Advantages of GANs over Traditional Anomaly Detection Methods

### 1. Data Generation Capability
GANs can generate synthetic data that resembles real data, which is useful when data is scarce. This ability allows GANs to create a comprehensive dataset for training, improving the model's performance in detecting anomalies.

### 2. Unsupervised Learning
GANs can learn the distribution of normal data without requiring labeled anomalies. This unsupervised learning approach is advantageous in real-world scenarios where labeled anomalies are rare or unavailable.

### 3. Flexibility and Adaptability
GANs can be adapted to various data types (e.g., images, time series, text) and different domains (e.g., cybersecurity, medical diagnostics, finance) due to their flexible architecture.

### 4. Better Feature Representation
The generator in GANs learns to capture the data distribution and can uncover complex patterns. This learned representation can be more effective for anomaly detection than handcrafted features used in traditional methods.

### 5. Dynamic Anomaly Detection
GANs can dynamically adapt to new types of anomalies by continuously learning from the data, identifying emerging patterns that were not present during the initial training phase.

### 6. Robustness to Noise
GANs, particularly when trained with noise, can become robust to variations and noise in the data, helping to distinguish between true anomalies and random noise.

## Implementation Details

### 1. Preprocessing Signals
We use a low-pass filter to remove high-frequency noise from the signals.

### 2. Training the GAN
The GAN is trained using normal signal data, with the generator learning to produce synthetic signals and the discriminator learning to distinguish between real and fake signals.

### 3. Generating and Processing Fake Signals
We generate synthetic signals using the trained generator and process these signals using the same preprocessing steps as the normal signals.

### 4. Detecting Faults
Anomalies are detected by comparing the mean squared error (MSE) between the real and generated signals. Signals with high MSE scores are flagged as potentially faulty.

## Visualization

We visualize the processed normal and generated signals to compare their patterns and identify anomalies.


**navigate**:
   ```bash
   cd backend
   ```
Refer backend.ipynb

## Features

- **Repair Recommendations**: Generate repair recommendations based on assessed damage and faulty wire locations.
- **Faulty Wire Location Identification**: Implement algorithms to identify and locate faulty wires within aircraft harnesses.
- **Damage Assessment**: Employ machine learning algorithms to assess damage severity and extent on aircraft surfaces.
- **Image Analysis**: Utilize advanced imaging algorithms to analyze high-resolution images of aircraft surfaces and wire harnesses.
- **CAD 3D Projection**: Develop algorithms for CAD 3D modeling to project identified paths of damage or faulty wiring.
- **Web Application**: Build a responsive web application for end-users to interact with the tool.

# Workflow

1. **Image Upload**: Users upload images of aircraft surfaces or wire harnesses through the web interface.
2. **Image Processing**: The uploaded image undergoes analysis using advanced imaging techniques and machine learning algorithms.
3. **Damage Detection**: The system identifies any damage present on the aircraft surface, including dents, scratches, or structural deformities.
4. **Faulty Wire Detection**: Additionally, the system locates and identifies any faulty wires within the aircraft harnesses.
5. **Damage Assessment**: Machine learning algorithms assess the severity and extent of damage, providing detailed reports on the nature, size, and location of damage.
6. **Repair Recommendations**: Based on the analysis, the system generates actionable repair recommendations for maintenance teams, including recommended repair methods and materials.
7. **User Interaction**: Users can interact with the web application to view analysis results, download PDF reports, and explore repair recommendations.

# Existing Model vs. GAN

## Existing Model

- **Limited Scope**: Traditional aircraft damage detection models often focus on specific types of damage or rely on manual inspection, leading to limited scope and accuracy.
- **Manual Intervention**: Maintenance teams often rely on manual inspection and assessment, which can be time-consuming and prone to errors.
- **Static Recommendations**: Repair recommendations generated by existing models may lack accuracy and specificity, leading to suboptimal repair outcomes.
- **Lack of Automation**: Existing models may lack automation in the repair recommendation process, requiring manual intervention from maintenance experts.

## Generative Adversarial Network (GAN)

- **Enhanced Accuracy**: GAN-based models leverage advanced machine learning techniques to improve accuracy in damage detection and repair recommendation.
- **Automated Analysis**: GAN models automate the analysis process, reducing the need for manual intervention and speeding up repair recommendation generation.
- **Dynamic Recommendations**: GAN models generate dynamic repair recommendations tailored to the specific type and severity of damage detected, enhancing repair outcomes.
- **Adaptability**: GAN models can adapt to diverse aircraft damage scenarios, providing more comprehensive and accurate repair recommendations across different aircraft models and damage types.



## Technology Stack

- **Frontend**: React.js for building the user interface.
- **Backend**: Python Flask for server-side logic.
- **AI/ML**: Utilize machine learning algorithms for image analysis and damage assessment.
- **CAD**: Implement CAD 3D modeling for projecting damage locations.
- **Other**: JavaScript, HTML, CSS, Axios for API requests, jsPDF for PDF generation.

## Getting Started

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/your-username/aircraft-damage-detection.git
   ```

2. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```

4. **Run flask server**
    ```bash
   cd backend
    python app.py
   ```
5. **Access the Web Application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Upload Image**: Select an aircraft image for analysis. Ensure the image size is less than 2MB.
2. **Submit Image**: Click the "Submit" button to initiate the image processing.
3. **View Analysis Results**: Once processed, view the analysis results, including crack presence, number of cracks, and repair recommendations.
4. **Download PDF Report**: Optionally, download a PDF report summarizing the crack analysis.
5. **See Repair Recommendations**: Access repair recommendations based on the analysis.
6. **Explore Cracked Images**: Explore additional cracked images for further analysis.

## Contributors

- Subiksha
- Sree SanthiKrishna
- Anusree
- Abishek
- Vel Yogesh

