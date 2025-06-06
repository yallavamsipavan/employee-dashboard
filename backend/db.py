import pymysql

def get_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="employer_dashboard",
        cursorclass=pymysql.cursors.DictCursor
    )