# 此專案包含next專案與後端專案，是SPA網頁
還有flutter的專案，用以從邊緣裝置透過藍牙接收資料，手機傳送心率資料到資料庫，前端再顯示給使用者
|資料夾|說明|
|---|---|
|dog-web|next前端|
|server|python後端|
* 前後端連接用websocket
* 資料庫使用microsoft access
  * ecg_data:ID,username,time,data,petname
  * pet:ID,username,name,type,age,weight,sex,note
  * user:ID,username,password,token_access
  * user_details:ID,username,email
## 主要功能
* 登入與註冊
* 繪製心率折線圖
* AI 模型分類疾病(transformers based classification model)
# 一些畫面
![image](https://github.com/user-attachments/assets/809f1f95-f196-49f4-a79a-5fe90bce35cf)
![image](https://github.com/user-attachments/assets/bd27ef2d-d5bb-435c-94c7-25ca926ee0ab)
![image](https://github.com/user-attachments/assets/1dd7c546-700a-48b3-8dcd-08df48bcd0d4)
![image](https://github.com/user-attachments/assets/8355fbe2-ca03-42f7-ac18-a3b1f14a405a)
![image](https://github.com/user-attachments/assets/c9560437-7c99-4d8f-942f-e2a96e686f5b)
![image](https://github.com/user-attachments/assets/f8eb9eba-531c-404a-bba9-575200bd392e)




