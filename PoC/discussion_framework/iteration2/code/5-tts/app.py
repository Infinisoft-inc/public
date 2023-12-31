from flask import Flask, request, Response
from gtts import gTTS
from io import BytesIO

app = Flask(__name__)

@app.route('/tts', methods=['POST'])
def text_to_speech():
    try:
        text = request.json.get('text', '')
        tts = gTTS(text)
        buffer = BytesIO()
        tts.write_to_fp(buffer)
        buffer.seek(0)
        audio_data = buffer.getvalue()
        buffer.close()
        return Response(audio_data, mimetype='audio/mpeg')
    except Exception as e:
        return Response(f"Server Error: {str(e)}", status=500)

if __name__ == '__main__':
    app.run(debug=True)
