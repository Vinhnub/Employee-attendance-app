import gspread
from google.oauth2.service_account import Credentials
from server.utils.config import *
from datetime import datetime

class GGSheet:
    SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    def __init__(self):
        self.creds = Credentials.from_service_account_file(GSHEET_CREDENTIALS, scopes=self.SCOPES)
        self.gc = gspread.authorize(self.creds)
        self.sh = self.gc.open_by_key(SHEET_ID)
        self.ws_today = self.sh.get_worksheet(0)  # index 1 = sheet thứ 2

    def update_cell(self, x, y, data):
        self.ws_today.update_cell(x, y, data)

    def update_shift_today(self, shifts):
        self.ws_today.clear()
        
        data = [["Nhân viên", "Thời gian bắt đầu", "Thời gian kết thúc", "Trạng thái làm việc", "Ghi chú"]]

        for shift in shifts:
            start_time = datetime.strptime(shift[1], "%Y-%m-%d %H:%M:%S")
            end_time = datetime.strptime(shift[2], "%Y-%m-%d %H:%M:%S")
            status = "Trong ca làm" if shift[3] else "Đã kết thúc ca"
            data.append([
                shift[0],
                start_time.strftime("%H:%M:%S"),
                end_time.strftime("%H:%M:%S"),
                status,
                shift[4]
            ])
        
        self.ws_today.update(f"A1:E{len(data)}", data)


    def append_shift_today(self, data):
        start_time = datetime.strptime(data["start_time"], "%Y-%m-%d %H:%M:%S")
        end_time = datetime.strptime(data["end_time"], "%Y-%m-%d %H:%M:%S")
        self.ws_today.append_row([data["fullname"], start_time.strftime("%H:%M:%S"), end_time.strftime("%H:%M:%S"), "Trong ca làm", data["note"]])