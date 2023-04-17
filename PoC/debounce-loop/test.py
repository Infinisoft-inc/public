
attention = {
  "emitter": "speaker1",
  "content": ["hi", "how are you"],
  "subject": "discussion"
}

def template_method(string):
    result1 = enhance(string)
    result2 = diarization(string)  # speaker1
    result3 = process(string)
    return (result1, result2, result3)

def enhance(string):
    # code for function 1
    return result1

def diarization(string):
    # code for function 2
    return result2

def process(msg):
    # new discussion
    if attention["emitter"] == "":
        print("new discussion")

    # existing discussion
    if attention["emitter"] == "speaker1":
        print("discussion")

    # existing discussion unknown emitter ignore
    if attention["emitter"] != "speaker1":
        print("unknown emitter ignore")


    return result3
