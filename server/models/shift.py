class Shift:
    def __init__(self, start_time, end_time, note, fullname=None, id=None, user_id=None, is_working=None):
        self.id = id
        self.fullname = fullname
        self.start_time = start_time
        self.end_time = end_time
        self.note = note
        self.user_id = user_id
        self.is_working = is_working

    def to_dict(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "user_id" : self.user_id,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "note": self.note,
            "is_working" : self.is_working
        }
