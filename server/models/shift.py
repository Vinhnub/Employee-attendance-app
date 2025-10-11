class Shift:
    def __init__(self, id, user_id, start_time, end_time, note=None):
        self.id = id
        self.user_id = user_id
        self.start_time = start_time
        self.end_time = end_time
        self.note = note

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "note": self.note
        }
