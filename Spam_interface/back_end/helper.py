import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import model_from_json
from keras.preprocessing import sequence
import pickle

def helper(data):
	# max_features = 3800
	maxlen = 140
	
	data = np.array(data)

	with open('tokenizer.pickle', 'rb') as handle:
		token = pickle.load(handle)

	xseq = token.texts_to_sequences(data)
	xpad = sequence.pad_sequences(xseq, maxlen=maxlen)

	json_file = open('model.json', 'r')
	loaded_model_json = json_file.read()
	json_file.close()
	loaded_model = model_from_json(loaded_model_json)
	loaded_model.load_weights("model.h5")

	test_pred = loaded_model.predict(xpad)

	result=[i[0] for i in test_pred.tolist()]
	return result