import websockets
from websockets.server import serve
import asyncio
import json
from Utilities import MakeDict
import pyodbc
from datetime import datetime

IPADDR="0.0.0.0"
# IPADDR="192.168.50.98"

PORT=8888

class WebSocket:
    def __init__(self,content):
        self.content=content

    async def AcceptConnection(self,socket):
        print(f"{socket} is connected")
        async for message in socket:
            items=json.loads(message)
            print(items)
            await self.Handle_action(socket,items)
          
    async def SendStatus(self,socket,status):
        await socket.send(status)

    async def SocketInit(self):
        async with serve(self.AcceptConnection, IPADDR, PORT):
            await asyncio.Future() 
    
    async def Handle_action(self,socket,items):
        if items["action"]=="login":
            response=await self.content.handler.Login_handle(items)
            await self.SendStatus(socket,json.dumps(response))
        elif items["action"]=="register":
            response=await self.content.handler.Register_handle(items)
            await self.SendStatus(socket,json.dumps(response))
        elif items["action"]=="addpet":
            response=await self.content.handler.AddPet_handle(items)
            await self.SendStatus(socket,json.dumps(response))
        elif items["action"]=="checkPetQuantity":
            response=await self.content.handler.CheckPetQuantityandAnalysisList(items['userName'])
            await self.SendStatus(socket,json.dumps(response))
        elif items["action"]=="addECGdata":
            response=await self.content.handler.AddECGData(items)
            await self.SendStatus(socket,json.dumps(response))
        
        
        

        
class Handler:
    def __init__(self,content):
        self.content=content

    async def Login_handle(self,items):
        try:
            username=items["userName"]
            userpassword=items["userPassword"]
            result,message=self.content.SQL.CheckLogin(username,userpassword)
            quantity,petList=self.content.SQL.GetPetQuantity(username)
            
            return MakeDict(responseType="login",status=result,message=message,name=items["userName"],quantity=quantity,petList=petList)
        except Exception as e:
            error_message = str(e)
            return MakeDict(responseType="login",status=False,message=error_message)
        
    async def Register_handle(self,items):
        try:
            username=items["userName"]
            userpassword=items["userPassword"]
            useremail=items["userEmail"]
            isExist=self.content.SQL.GetUsernameStatus(username)
            if(not isExist):
                result,message=self.content.SQL.Register(username,userpassword,useremail)
                return MakeDict(responseType="register",status=result,message=message)
            else:
                raise Exception("賬號存在")
        except Exception as e:
            error_message = str(e)
            return MakeDict(responseType="register",status=False,message=error_message)

    async def AddPet_handle(self,items):
        try:
            username=items["userName"]
            name=items["name"]
            type=items["type"]
            age=items["age"]
            weight=items["weight"]
            sex=items["sex"]
            result,message=self.content.SQL.AddPet(username,name,type,age,weight,sex)
            return MakeDict(responseType="addpet",status=result,message=message)
        except:
            raise Exception("添加失敗")
        
    async def CheckPetQuantityandAnalysisList(self,userName):
        try:
            quantity,petList=self.content.SQL.GetPetQuantity(userName)
            analysisList=self.content.SQL.GetAnalysisList(userName)
            print(analysisList)
            return MakeDict(responseType="checkpetquantity",status=True,message="查詢成功",name=userName,quantity=quantity,petList=petList,analysisList=analysisList)
        except:
            raise Exception("查詢失敗")
        
    async def AddECGData(self,items):
        try:
            username=items["userName"]
            data=items["data"]
            petname=items["petname"]
            result,message=self.content.SQL.AddECG(username,data,petname)
            return MakeDict(responseType="addpet",status=result,message=message)
        except:
            raise Exception("添加失敗")

class Content:
    def __init__(self):
        self.webSocket=WebSocket(self)
        self.handler=Handler(self)
        self.SQL=SQL()
       
    
    def Flow(self):
        asyncio.run(self.webSocket.SocketInit())

class SQL:
    def __init__(self):
        db_file = r"../Database11.accdb"  # 請改成你自己的檔案路徑
        self.conn = pyodbc.connect(
            r'DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=' + db_file + ';'
        )
        self.cursor = self.conn.cursor()
    
    def sha256(self,password):
        import hashlib
        if isinstance(password, str):
            password = password.encode('utf-8')
        return hashlib.sha256(password).hexdigest()
    
    def GetAnalysisList(self,username):
        try:
            query="select * from [ecg_data] where username=?"
            result=self.cursor.execute(query,(username,))
            rows = self.cursor.fetchall()
            columns = [column[0] for column in self.cursor.description]
            data = []
            for row in rows:
                row_dict = {}
                for col_name, value in zip(columns, row):
                    if isinstance(value, datetime):
                        row_dict[col_name] = value.strftime("%Y-%m-%d %H:%M:%S")
                    else:
                        row_dict[col_name] = value
                data.append(row_dict)
            print(data)
            return json.dumps(data, ensure_ascii=False)
        except Exception as e:
            print(f"Database error: {e}")
            return json.dumps({"error": "資料庫查詢失敗"}, ensure_ascii=False)
    
    def GetUsernameStatus(self,username):
        try:
            query = "SELECT * FROM [user] WHERE username=?"
            self.cursor.execute(query, (username))
            row = self.cursor.fetchone()
            if row:
                return True
            else:
                return False
        except Exception as e:
            raise Exception(f"資料庫錯誤: {e}")

    def CheckLogin(self, username, password):
        try:
            hashed_password = password
            query = "SELECT * FROM [user] WHERE username=? AND password=?"
            self.cursor.execute(query, (username, hashed_password))
            row = self.cursor.fetchone()
            if row:
                return True, "success"
            else:
                return False, "賬號或密碼錯誤"
        except Exception as e:
            raise Exception(f"資料庫錯誤: {e}")
    
    def AddECG(self,username,data,petname):
        try:
            query="insert into [ecg_data](username,[time],data,petname) values (?,Now(),?,?)"
            self.cursor.execute(query,(username,json.dumps({'data':data}),petname))
            self.conn.commit()
            return True,"添加ecg資料成功"
        except Exception as e:
            raise Exception(f"添加失敗 {e}")

    def Register(self,username,password,useremail):
        try:
            hashed_password = password
            query="INSERT INTO [user] (username, password, token_access) VALUES (?, ?, ?)"
            self.cursor.execute(query, (username, hashed_password,datetime.now()))
            query="INSERT INTO [user_details] (username, email) VALUES (?, ?)"
            self.cursor.execute(query, (username, useremail))
            self.conn.commit()
            return True,"註冊成功，請登入"
        except Exception as e:
            raise Exception(f"資料庫錯誤: {e}")
        
    def AddPet(self,username,name,type,age,weight,sex):
        try:
            query="insert into [pet] (username,name,type,age,weight,sex) values(?,?,?,?,?,?)"
            self.cursor.execute(query,(username,name,type,age,weight,sex))
            self.conn.commit()
            return True,"添加成功"
        except:
            raise Exception(f"無法添加寵物，稍後再試")
        
    def GetPetQuantity(self,userName):
        try:
            query="select * from [pet] where username=?"
            result=self.cursor.execute(query,(userName,))
            rows = self.cursor.fetchall()
            columns = [column[0] for column in self.cursor.description]
            data = [dict(zip(columns, row)) for row in rows]
            return len(rows),json.dumps(data, ensure_ascii=False)
        except:
            raise Exception(f"無法查詢，稍後再試")

def main():
    content=Content()
    print(f"server start.Listening on {IPADDR}:{PORT}")
    content.Flow() 


if __name__=="__main__":
    main()
