from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from helper import helper;
from ensemble import predict_value;

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def get():
    return "Hello, world!"

# class CommentRequest(BaseModel):
#     comments: list[str]

@app.post("/check-length")
async def check_length(comments: list[str]):
    out=[]
    for i in comments:
            
        length = len(i)
        if length % 2 == 0:
            out.append(2)
        else:
            out.append(1)
    return {"result": out}

@app.post("/check")
async def check_length(input_string: str):
    length = len(input_string)
    if length % 2 == 0:
        return {"result": 2}
    else:
        return {"result": 1}
    

@app.post("/predict_lstm")
async def predict(data: list[str]):
    if data == None or len(data)==0:
        return {'result': []}
    else:
        result = helper(data) 
        return {"result": result} 

@app.post("/predict_ensemble")
async def predict(data: list[str]):
    if data == None or len(data)==0:
        return {'result': []}
    else:
        result = predict_value(data)  # Gọi hàm svm_model với dữ liệu được truyền vào từ request
        return {"result": result}  # Trả về kết quả từ hàm svm_model

# predict_value