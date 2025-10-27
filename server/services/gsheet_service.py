import gspread
from openpyxl import Workbook
from google.oauth2.service_account import Credentials
from server.utils.config import *
from datetime import datetime
import os
import calendar

class GGSheet:
    SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    def __init__(self):
        self.creds = Credentials.from_service_account_file(GSHEET_CREDENTIALS, scopes=self.SCOPES)
        self.gc = gspread.authorize(self.creds)
        self.sh = self.gc.open_by_key(SHEET_ID)
        self.ws_today = self.sh.get_worksheet(0)  # index 1 = sheet thứ 2
        self.ws_cur_month = self.sh.get_worksheet(1)

    def update_cell(self, x, y, data):
        self.ws_today.update_cell(x, y, data)

    def update_shift_today(self, shifts):
        self.ws_today.clear()
        data = [["Nhân viên", "Thời gian bắt đầu", "Thời gian kết thúc", "Trạng thái làm việc", "Ghi chú"]]

        for shift in shifts:
            start_time = datetime.strptime(shift["start_time"], "%Y-%m-%d %H:%M:%S")
            end_time = datetime.strptime(shift["end_time"], "%Y-%m-%d %H:%M:%S")
            status = "Trong ca làm" if shift["is_working"] else "Đã kết thúc ca"
            data.append([
                shift["fullname"],
                start_time.strftime("%H:%M:%S"),
                end_time.strftime("%H:%M:%S"),
                status,
                shift["note"]
            ])

        self.ws_today.update(f"A1:E{len(data)}", data)

    def append_shift_today(self, shift):
        start_time = datetime.strptime(shift["start_time"], "%Y-%m-%d %H:%M:%S")
        end_time = datetime.strptime(shift["end_time"], "%Y-%m-%d %H:%M:%S")
        self.ws_today.append_row([shift["fullname"], start_time.strftime("%H:%M:%S"), end_time.strftime("%H:%M:%S"), "Trong ca làm", shift["note"]])

    def append_shift_current_month(self, list_shift, row, column):
        values = "" 
        for shift in list_shift:
            start_time = datetime.strptime(shift["start_time"], "%Y-%m-%d %H:%M:%S")
            end_time = datetime.strptime(shift["end_time"], "%Y-%m-%d %H:%M:%S")
            values += f"{start_time.strftime("%H:%M")}-{end_time.strftime("%H:%M")}({shift["note"]})\n"
        self.ws_cur_month.update_cell(row, column, values)

    def append_staff(self, staff):
        self.ws_cur_month.append_row([staff["fullname"]], value_input_option='RAW')

    def save_data_per_month(self):
        data = self.ws_cur_month.get_all_values()
        now = datetime.now()
        file_name = f"{now.month:02d}-{now.year}.xlsx"
        folder_path = "server/database/data_per_month"
        os.makedirs(folder_path, exist_ok=True)
        file_path = os.path.join(folder_path, file_name)

        wb = Workbook()
        ws = wb.active
        for row in data:
            ws.append(row)  

        wb.save(file_path)
        print(f"Saved at: {file_path}")

    def col_num_to_letter(self, n):
        result = ''
        while n > 0:
            n, remainder = divmod(n-1, 26)
            result = chr(65 + remainder) + result
        return result

    def get_days_of_current_month(self):
        today = datetime.today()
        year = today.year
        month = today.month
        num_days = calendar.monthrange(year, month)[1]  
        days = [f"{month:02d}-{day:02d}" for day in range(1, num_days + 1)]
        return days

    def draw_new_month(self, list_staff):
        days = self.get_days_of_current_month()
        values = [["Tên nhân viên/Ngày"] + days + ["Tổng"]]
     
        self.ws_cur_month.clear()
        num_columns = len(values[0])
        last_col = self.col_num_to_letter(num_columns)
        range_str = f"A1:{last_col}1"

        self.ws_cur_month.update(range_str, values)

        values = [[staff["fullname"]] for staff in list_staff]
        self.ws_cur_month.update(f"A2:A{len(values) + 1}", values)

    def update_total_hour_of(self, row, time_delta):
        last_col = len(self.ws_cur_month.row_values(1))
        cell_value = self.ws_cur_month.cell(row, last_col).value
        if cell_value == "" or cell_value is None:
            cell_value = 0
        else: cell_value = float(cell_value)
        new_value = float(time_delta) + cell_value
        self.ws_cur_month.update_cell(row, last_col, str(round(new_value, 2)))
