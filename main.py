import cv2
from flask import Flask, jsonify, request
app = Flask(__name__)


@app.route('/detect',methods=['POST'])
def DetectFaces():
    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

    img = cv2.imread("screenshot.png")
    cv2.waitKey(1000)

    cv2.destroyAllWindows()

    # detecting faces
    print("running")

    faces = face_cascade.detectMultiScale(img, 1.1, 4)

    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)

    cv2.imwrite("newImage.jpg", img)
    with open ("newImage.jpg","rb") as f:
        encode_string = base64.encode(f.read())


if (__name__ == '__main__'):
    app.run(debug=True)
