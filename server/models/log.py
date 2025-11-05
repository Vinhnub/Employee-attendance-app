class Log:
    def __init__(self, log_id, content, date_time, user_id=None, fullname=None):
        self._id = log_id
        self.content = content
        self.date_time = date_time
        self.user_id = user_id
        self.fullname = fullname

    def to_dict(self):
        return {
            "id" : self._id,
            "content" : self.content,
            "date_time" : self.date_time,
            "user_id" : self.user_id,
            "fullname" : self.fullname
        }