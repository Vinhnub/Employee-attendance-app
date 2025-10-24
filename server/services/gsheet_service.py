import gspread
from google.oauth2.service_account import Credentials
import time
from server.utils.config import *

class GGSheet:
    SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    def __init__(self):
        self.creds = Credentials.from_service_account_file(GSHEET_CREDENTIALS, scopes=self.SCOPES)
        self.gc = gspread.authorize(self.creds)
        self.sh = self.gc.open_by_key(SHEET_ID)
        self.ws = self.sh.get_worksheet(1)  # index 1 = sheet thứ 2

    def update_cell(self, x, y, data):
        self.ws.update_cell(x, y, data)

    def update_staff_on_working(self, staffs):
        pass