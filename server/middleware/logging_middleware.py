import logging
from logging.handlers import RotatingFileHandler
import os

def setup_logger(
    name="app_logger",
    log_file="app.log",
    level=logging.INFO,
    max_bytes=5 * 1024 * 1024,  # 5MB
    backup_count=3
):
    """
    Tạo logger ghi log vào file .log

    :param name: Tên logger
    :param log_file: Tên file log
    :param level: Mức log (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    :param max_bytes: Dung lượng tối đa của file log
    :param backup_count: Số file log backup
    :return: logger
    """

    log_dir = os.path.dirname(log_file)
    if log_dir and not os.path.exists(log_dir):
        os.makedirs(log_dir)

    logger = logging.getLogger(name)
    logger.setLevel(level)

    if logger.handlers:
        return logger

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(filename)s:%(lineno)d | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )

    handler = RotatingFileHandler(
        log_file,
        maxBytes=max_bytes,
        backupCount=backup_count,
        encoding="utf-8"
    )
    handler.setFormatter(formatter)

    logger.addHandler(handler)

    return logger
