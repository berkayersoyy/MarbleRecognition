import numpy as np
import tensorflow as tf

from flask import Flask
from flask import jsonify
app = Flask(__name__)
@app.route('/MarbleColorCheck/<path:path>', methods=['POST'])
def MarbleColorCheck(path):
    marbleModel = tf.keras.models.load_model('marble_color_model.h5')
    img = tf.keras.utils.load_img(
        path, target_size=(180, 180)
    )
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create a batch

    predictions = marbleModel.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    class_names = ['BEIGE-BLUE-DARK', 'BEIGE-EMP', 'BEIGE-GRI', 'TRV-CLASSIC-VS', 'TRV-NOCE']

    print(
        "This image most likely belongs to {} with a {:.2f} percent confidence."
            .format(class_names[np.argmax(score)], 100 * np.max(score))
    )
    return jsonify(className=class_names[np.argmax(score)],classQuality=100 * np.max(score))

@app.route('/MarbleSurfaceCheck/<path:path>', methods=['POST'])
def MarbleQualityCheck(path):
    marbleModel = tf.keras.models.load_model('marble_quality_model.h5')
    img = tf.keras.utils.load_img(
        path, target_size=(180, 180)
    )
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = marbleModel.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    class_names = ['crack', 'dot', 'good', 'joint']

    print(
        "This image most likely belongs to {} with a {:.2f} percent confidence."
            .format(class_names[np.argmax(score)], 100 * np.max(score))
    )
    return jsonify(className=class_names[np.argmax(score)],classQuality=100 * np.max(score))

app.run(host='0.0.0.0', port=105)