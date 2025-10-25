class Shift:
    def __init__(self, start_time, end_time, note, fullname, id=None, username=None):
        self.id = id
        self.fullname = fullname
        self.start_time = start_time
        self.end_time = end_time
        self.note = note
        self.username = username

    def to_dict(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "username" : self.username,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "note": self.note
        }
