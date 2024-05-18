# Import thư viện

import joblib
import pandas as pd
import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from nltk.tokenize import word_tokenize
import string

from sklearn.metrics import accuracy_score

import os 

# Lưu mô hình
#joblib.dump(soft_voting_clf, 'ensemble_model.pkl')



nltk.download('stopwords')


# Tiền xử lí
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

from sklearn.metrics import accuracy_score, f1_score, recall_score, precision_score, confusion_matrix, roc_curve, auc
# import matplotlib.pyplot as plt
import numpy as np

# Report nếu thử với data có nhãn
# def report(y_true, y_pred, y_scores=None):
#     # In các chỉ số cơ bản
#     print("Accuracy:", accuracy_score(y_true, y_pred))
#     print("F1 Score:", f1_score(y_true, y_pred, average='weighted'))
#     print("Recall:", recall_score(y_true, y_pred, average='weighted'))
#     print("Precision:", precision_score(y_true, y_pred, average='weighted'))
#     print("Confusion Matrix:\n", confusion_matrix(y_true, y_pred))

#     # Vẽ ROC Curve nếu y_scores được cung cấp
#     if y_scores is not None:
#         # Tính các giá trị cho ROC
#         fpr, tpr, thresholds = roc_curve(y_true, y_scores)
#         roc_auc = auc(fpr, tpr)
        
#         # Vẽ đồ thị
#         plt.figure()
#         plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (area = {roc_auc:.2f})')
#         plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
#         plt.xlim([0.0, 1.0])
#         plt.ylim([0.0, 1.05])
#         plt.xlabel('False Positive Rate')
#         plt.ylabel('True Positive Rate')
#         plt.title('Receiver Operating Characteristic')
#         plt.legend(loc="lower right")
#         plt.show()

# load data mới của mình vào để test
def loadData_new(list_string):
    data = pd.DataFrame({'CONTENT':list_string})
    return data

# Load data cũ để transform, lấy được từ điển của nó 
# dùng cùng từ điển để lấy cùng chiều dữ liệu
# quan trọng

def loadData():
    data_path= './train_data/'
    data1 = pd.read_csv(data_path+'Youtube01-Psy.csv')
    data2 = pd.read_csv(data_path+'Youtube02-KatyPerry.csv')
    data3 = pd.read_csv(data_path+'Youtube03-LMFAO.csv')
    data4 = pd.read_csv(data_path+'Youtube04-Eminem.csv')
    data5 = pd.read_csv(data_path+'Youtube05-Shakira.csv')
    data = pd.concat([data1, data2, data3, data4, data5], ignore_index=False)
    data = data.drop(['COMMENT_ID', 'AUTHOR', 'DATE'], axis=1)
    
    return data



from sklearn.feature_extraction.text import TfidfVectorizer



# load data mới rồi dùng tử điển (lưu trong vectorizer ở trên) để transform nó



from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

def predict_value(X):
    # cho data sau transform vaof model để predict
    # Đọc mô hình từ file
    data_ = loadData()

    data_['CONTENT'] = data_['CONTENT'].apply(text_process)
    with open('tfidf_vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)

    loaded_model = joblib.load('ensemble_model.pkl')
    data = loadData_new(X)
    data['CONTENT'] = data['CONTENT'].apply(text_process)
    X_new = vectorizer.transform(data['CONTENT'])
    X = np.asarray(X_new.toarray())
    y_pred = loaded_model.predict(X)
    result= y_pred.tolist()
    return result




# test_data=(["hehe","Nam","code","doan","nay", "Please check out , check out video my videos"])
# print(predict_value(test_data))
