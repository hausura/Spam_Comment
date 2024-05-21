import joblib
import pandas as pd
import numpy as np
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
import string
import nltk
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.svm import SVC
import pickle


# nltk.download('stopwords')

def text_process(data):
    '''
    1. remove punc
    2. do stemming of words
    3. remove stop words
    4. return list of clean text words
    '''
    nopunc = [c for c in data if c not in string.punctuation] #remove punctuations
    nopunc = ''.join(nopunc)
    
    stemmed = ''
    nopunc = nopunc.split()
    for i in nopunc:
        stemmer = SnowballStemmer('english')
        stemmed += (stemmer.stem(i)) + ' ' # stemming of words
        
    clean_msgs = [word for word in stemmed.split() if word.lower() not in stopwords.words('english')] # remove stopwords
    clean_msgs = ' '.join(i for i in clean_msgs)
    
    return clean_msgs

# example load data
def loadData():
    data_path='./train_data/'
    data = pd.read_csv(data_path+'5000 YT comments.csv', encoding='latin1')
    data = data.drop(['Name', 'Time', 'Likes', 'Reply Count'], axis=1)
    data['Comment'] = data['Comment'].apply(text_process)
    
    return data


def vectorizer():
    """
    Read data from loadData() function and convert to vector
    """
    data = loadData()
    #vectorizer = TfidfVectorizer(max_features=3700)
    #X = vectorizer.fit_transform(data['Comment'])
    vectorizer = joblib.load('tfidf_vectorizer.pkl')
    X = vectorizer.fit_transform(data['Comment'])
    X_matrix = X.toarray()
    return X_matrix

# Tải mô hình
def load_model():
    import joblib
    svm_model = joblib.load('svm_rbf_model.pkl')
    return svm_model

# predict
def main():
    print('Load model...')
    svm_model = joblib.load('svm_rbf_model.pkl') 
    X_matrix = vectorizer()
    print('Predicting...')
    y_svm_pred = svm_model.predict(X_matrix)
    print(y_svm_pred)

def loadData_new(list_string):
    data = pd.DataFrame({'Comment':list_string})
    return data

def predict_value_SVM(X):
    print('Load model...')
    svm_model = load_model()

    vectorizer = joblib.load('tfidf_vectorizer.pkl')
    data = loadData_new(X)
    X_new = vectorizer.transform(data['Comment'])
    X = np.asarray(X_new.toarray())
    y_svm_pred = svm_model.predict(X)
    result= y_svm_pred.tolist()
    return result


if __name__ == '__main__':
    test_data=(["hehe","Nam","code","doan","nay", "Please check out , check out video my videos"])
    print(predict_value_SVM(test_data))

#     main()