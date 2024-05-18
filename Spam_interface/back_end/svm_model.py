import pandas as pd
from sklearn.model_selection import train_test_split
import joblib
import tensorflow as tf
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

import os 


def svm_model(data):
    # Read the dataset
    data_path= os.path.join(os.path.dirname(__file__), '../../Playwright-Demo/train_data/')
    data1 = pd.read_csv(data_path+'Youtube01-Psy.csv')
    data2 = pd.read_csv(data_path+'Youtube02-KatyPerry.csv')
    data3 = pd.read_csv(data_path+'Youtube03-LMFAO.csv')
    data4 = pd.read_csv(data_path+'Youtube04-Eminem.csv')
    data5 = pd.read_csv(data_path+'Youtube05-Shakira.csv')

    data = pd.concat([data1, data2, data3, data4, data4], ignore_index=True)


    train, test =  train_test_split(data, test_size=0.2, random_state=42)
    train.drop(['COMMENT_ID', 'AUTHOR', 'DATE'], axis=1, inplace=True)
    X_train, X_test, y_train, y_test = train_test_split(train['CONTENT'].values, train['CLASS'].values,
                                                    random_state=42, 
                                                    test_size=0.2, shuffle=True)



    gcs_path = 'svm_model.joblib'

    SVM_model = joblib.load(tf.io.gfile.GFile(gcs_path, 'rb'))


    max_features = 5000
    tfidf_vectorizer = TfidfVectorizer(max_features=max_features)  # Adjust max_features as needed
    X_train_tfidf = tfidf_vectorizer.fit_transform(X_train.tolist())
    X_test_tfidf = tfidf_vectorizer.transform((data))

    y_pred = SVM_model.predict(X_test_tfidf)
    return(y_pred.tolist())

test_data=(["hehe","Nam","code","doan","nay", "Please check out , check out video my videos"])
print(svm_model(test_data))
