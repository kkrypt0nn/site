# coding=utf-8
import logging
import os


# region Logging
# Get the log level from environment
log_level = os.environ.get("LOG_LEVEL", "info").upper()
formatter = logging.Formatter('[%(asctime)s] [%(levelname)s] %(message)s')

if hasattr(logging, log_level):
    log_level = getattr(logging, log_level)
else:
    raise RuntimeError("LOG_LEVEL environment variable has an invalid value.")

# This handler will ensure we log to stdout and stderr
logging.basicConfig(format=formatter, level=log_level)
# endregion
