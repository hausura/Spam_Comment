# Spam_Comment
## Introduction
- Môn: **DATA MINING** 
- Khoa: [Khoa Toán Cơ Tin học](http://mim.hus.vnu.edu.vn/en)
- Trường: [Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội](http://hus.vnu.edu.vn/)


## I. How to set up
### 1. Clone master brand

```
git clone https://github.com/hausura/Spam_Comment.git
```

### 2.Install packages
#### Back-End:
- Truy cập vào thư mục: “Spam_interface/back_end/requirements.txt”
- Dùng lệnh
```
pip install -r requirement.txt
```
###### (file requirement.txt chứa các thư viện cần thiết bao gồm:numpy, tensorflow, scikit-learn, fastapi, pydantic, joblib, pandas, nltk, uvicorn)
#### Trong trường hợp không cài được lệnh trên, có thể cài lần lượt các thư viện: fastapi, numpy, Pillow, pydicom, uvicorn, python, pyton.dotenv
#### Front-End:
- Truy cập vào thư mục: “Spam_interface/front_end”
- Dùng lệnh
```
npm install
```

- Lựa chọn port trống để chạy sever
- Dán đường dẫn của 1 trong các folder chứa các file DICOM(ở trong backend/data) hoặc data tự chọn
- Đổi tên user.env thành .env

## II. How to use 
### 1.Cách chạy
###### Đồng thời tạo 2 terminal trong VsCode:
- Terminal đầu tiên chạy front-end:
```
cd “./front-end”
```
- Chạy front-end bằng lệnh:
```
npm start
```
- Terminal thứ hai chạy sever back-end:
```
cd “./backend”
```
- Chạy sever back-end bằng lệnh:
```
uvicorn main:app –reload
```
 <p align="center">
<img  src='https://github.com/hausura/show_read_me/blob/main/Screenshot%202024-05-19%20122730.png'>
</img>
</p>
### Cách 2: Sử dụng Docker

```
cd Spam_interface
```
Chạy lệnh
```
docker-compose up --build
```
### 2.Khởi động giao diện
- Ứng dụng sẽ được khởi động trên cửa sổ trình duyệt mặc định tại địa chỉ localhost:3000
 ![image](https://github.com/hausura/show_read_me/blob/main/spam_0.png)
<p align="center">
Giao diện ứng dụng khi khởi động
</p>


### 3.Nhúng ID Youtube
- ID được lấy từ đường dẫn chính của Video trên nền tảng Youtube, nhập vào trường nhập liệu, lựa chọn mô hình muốn sử dụng, sau đó nhấn “Embed Video”. Video sẽ được nhúng và hiển thị tại giao diện ứng dụng cùng các bình luận phía dưới.\
 <p align="center">
<img  src='https://github.com/hausura/show_read_me/blob/main/spam%201.5.png'> </img>
</p>

 <p align="center">
<img align="center" src='https://github.com/hausura/show_read_me/blob/main/spam1.png'> </img>
</p>

### 4.Hiển thị comments và lọc
 - Dựa trên kết quả của mô hình được hiển thị dưới mỗi bình luận, các bình luận được cho là spam sẽ bị làm mờ.
   
 ![image](https://github.com/hausura/show_read_me/blob/main/spam%202.png)
 <p align="center">
                                      Kết quả dự đoán của mô hình đã chọn 
</p>


                                      
 - Người dùng có thể sử dụng mô hình đã lựa chọn để kiểm tra spam bằng cách thêm bình luận vào phần “Add a comment…”, sau đó nhấn “Comment”. Ứng dụng sẽ nhận bình luận và trả về kết quả dự đoán dựa trên mô hình dự đoán mà người dùng đã lựa chọn trước đó. 
 ![image](https://github.com/hausura/show_read_me/blob/main/spam3.png)
 <p align="center">
                                      Kết quả dự đoán của mô hình cho bình luận của người dùng
</p>






     
