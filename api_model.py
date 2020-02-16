import os
import cv2
import imutils
import numpy as np
from flask import Flask, flash, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
from keras.models import Sequential
from keras.models import load_model, Model
from keras.applications.vgg16 import VGG16, preprocess_input
from keras.layers import Input
from keras.layers import Conv2D, MaxPooling2D, Dense, Dropout, Input, Flatten, SeparableConv2D
from keras.layers import GlobalMaxPooling2D
from keras.layers.normalization import BatchNormalization
from keras.layers.merge import Concatenate
from keras.optimizers import Adam

BREAST_MODEL_FILE = 'breast.h5'
IMG_SIZE = (224,224)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
UPLOAD_FOLDER = '/tmp'
BRAIN_MODEL_FILE = 'brain_model.h5'
LUNG_MODEL_FILE = 'lung.h5'


model = None

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def build_model():
    input_img = Input(shape=(224,224,3), name='ImageInput')
    x = Conv2D(64, (3,3), activation='relu', padding='same', name='Conv1_1')(input_img)
    x = Conv2D(64, (3,3), activation='relu', padding='same', name='Conv1_2')(x)
    x = MaxPooling2D((2,2), name='pool1')(x)
    
    x = SeparableConv2D(128, (3,3), activation='relu', padding='same', name='Conv2_1')(x)
    x = SeparableConv2D(128, (3,3), activation='relu', padding='same', name='Conv2_2')(x)
    x = MaxPooling2D((2,2), name='pool2')(x)
    
    x = SeparableConv2D(256, (3,3), activation='relu', padding='same', name='Conv3_1')(x)
    x = BatchNormalization(name='bn1')(x)
    x = SeparableConv2D(256, (3,3), activation='relu', padding='same', name='Conv3_2')(x)
    x = BatchNormalization(name='bn2')(x)
    x = SeparableConv2D(256, (3,3), activation='relu', padding='same', name='Conv3_3')(x)
    x = MaxPooling2D((2,2), name='pool3')(x)
    
    x = SeparableConv2D(512, (3,3), activation='relu', padding='same', name='Conv4_1')(x)
    x = BatchNormalization(name='bn3')(x)
    x = SeparableConv2D(512, (3,3), activation='relu', padding='same', name='Conv4_2')(x)
    x = BatchNormalization(name='bn4')(x)
    x = SeparableConv2D(512, (3,3), activation='relu', padding='same', name='Conv4_3')(x)
    x = MaxPooling2D((2,2), name='pool4')(x)
    
    x = Flatten(name='flatten')(x)
    x = Dense(1024, activation='relu', name='fc1')(x)
    x = Dropout(0.7, name='dropout1')(x)
    x = Dense(512, activation='relu', name='fc2')(x)
    x = Dropout(0.5, name='dropout2')(x)
    x = Dense(2, activation='softmax', name='fc3')(x)
    
    model = Model(inputs=input_img, outputs=x)
    return model

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def setupModel():
    global model
    model = load_model(BRAIN_MODEL_FILE)


def crop_imgs(set_name, add_pixels_value=0):
    """
    Finds the extreme points on the image and crops the rectangular out of them
    """
    set_new = []
    for img in set_name:
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        gray = cv2.GaussianBlur(gray, (5, 5), 0)

        # threshold the image, then perform a series of erosions +
        # dilations to remove any small regions of noise
        thresh = cv2.threshold(gray, 45, 255, cv2.THRESH_BINARY)[1]
        thresh = cv2.erode(thresh, None, iterations=2)
        thresh = cv2.dilate(thresh, None, iterations=2)

        # find contours in thresholded image, then grab the largest one
        cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)
        c = max(cnts, key=cv2.contourArea)

        # find the extreme points
        extLeft = tuple(c[c[:, :, 0].argmin()][0])
        extRight = tuple(c[c[:, :, 0].argmax()][0])
        extTop = tuple(c[c[:, :, 1].argmin()][0])
        extBot = tuple(c[c[:, :, 1].argmax()][0])

        ADD_PIXELS = add_pixels_value
        new_img = img[extTop[1]-ADD_PIXELS:extBot[1]+ADD_PIXELS, extLeft[0]-ADD_PIXELS:extRight[0]+ADD_PIXELS].copy()
        set_new.append(new_img)

    return np.array(set_new)

def preprocess_imgs(set_name, img_size):
    """
    Resize and apply VGG-15 preprocessing
    """
    set_new = []
    for img in set_name:
        img = cv2.resize(
            img,
            dsize=img_size,
            interpolation=cv2.INTER_CUBIC
        )
        set_new.append(preprocess_input(img))
    return np.array(set_new)


def predictIfBrainHasTumor(image_path):
    model = load_model(BRAIN_MODEL_FILE)
    img = cv2.imread(image_path)

    preProcessedImage = preprocess_imgs(crop_imgs([img]), IMG_SIZE)
    result = model.predict(preProcessedImage)
    print(result)
    return result[0][0]

def predictIfBreastHasTumor(image_path):
    argum_model = Sequential()
    argum_model.add(Conv2D(filters=32,kernel_size=(3,3),strides=2,padding='same',activation='relu',input_shape=(50, 50, 3)))
    argum_model.add(Dropout(0.15))
    argum_model.add(MaxPooling2D(pool_size=2,strides=2))
    argum_model.add(Conv2D(filters=64,kernel_size=(3,3),strides=2,padding='same',activation='relu'))  
    argum_model.add(Dropout(0.25))
    argum_model.add(Conv2D(filters=128,kernel_size=(3,3),strides=2,padding='same',activation='relu'))
    argum_model.add(Dropout(0.35))
    argum_model.add(Conv2D(filters=512,kernel_size=(3,3),strides=2,padding='same',activation='relu'))
    argum_model.add(Dropout(0.45))
    argum_model.add(Flatten())
    argum_model.add(Dense(2, activation='softmax'))
    argum_model.compile(loss='categorical_crossentropy', optimizer='AdaDelta', metrics=['accuracy'])
    argum_model.load_weights(BREAST_MODEL_FILE)
    img = cv2.imread(image_path)
    img = cv2.resize(
            img,
            dsize=(50, 50),
            interpolation=cv2.INTER_CUBIC
        )
    result = argum_model.predict(np.array([img]))
    print(result)
    return result[0][1] > 0.5

def predictIfLungHasTumor(image_path):
    model = build_model()
    opt = Adam(lr=0.0001, decay=1e-5)
    model.compile(loss='binary_crossentropy', metrics=['accuracy'],optimizer=opt)
    model.load_weights(LUNG_MODEL_FILE)	
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224,224))
    if img.shape[2] ==1:
        img = np.dstack([img, img, img])
    else:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.astype(np.float32)/255.
    result = model.predict(np.array([img]))
    print(result)	
    return result[0][1] > 0.5

@app.route('/predict', methods=['POST'])
def predictRoute():
    if 'file' not in request.files:
        return jsonify({
            'error': True,
            'message': 'You have to upload your brain image' 
        })
    file = request.files['file']
    if file.filename == '':
        return jsonify({
            'error': True,
            'message': 'You have to upload your brain image' 
        })
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        if request.form.get('type') == 'brain':
            result = predictIfBrainHasTumor(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        elif request.form.get('type') == 'breast':
            result = predictIfBreastHasTumor(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        elif request.form.get('type') == 'lung':
            result = predictIfLungHasTumor(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({
            'error': False,
            'you_have_cancer': bool(result)
        })
    return jsonify({
        'error': False,
        'message': 'you should not reach this part!'
    })

if __name__ == '__main__':
    setupModel()
    app.run(debug=True)
