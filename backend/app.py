import json
import base64
import tornado.ioloop
import tornado.web
import pymysql
from db import get_connection

class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with, Content-Type")
        self.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")

    def options(self, *args, **kwargs):
        self.set_status(204)
        self.finish()

class EmployeesHandler(BaseHandler):
    def get(self):
        conn = get_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM employees")
        employees = cursor.fetchall()
        conn.close()
        for emp in employees:
            if emp["image"]:
                emp["image"] = base64.b64encode(emp["image"]).decode("utf-8")
            else:
                emp["image"] = None
        self.write(json.dumps(employees))

    def post(self):
        name = self.get_body_argument("name")
        position = self.get_body_argument("position")
        salary = float(self.get_body_argument("salary"))
        experience = self.get_body_argument("experience")
        email = self.get_body_argument("email")
        phonenum = self.get_body_argument("phonenum")
        image_file = self.request.files.get("image", [None])[0]
        image_data = image_file["body"] if image_file else None
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM employees WHERE email = %s", (email))
        if cursor.fetchone():
            conn.close()
            self.set_status(409)
            self.write({"error": "Email already exists"})
            return
        cursor.execute(
            "INSERT INTO employees (name, position, salary, experience, email, phonenum, image) VALUES (%s, %s, %s, %s, %s, %s, %s)", (name, position, salary, experience, email, phonenum, image_data)
        )
        conn.commit()
        conn.close()
        self.write({"message": "Employee added successfully"})

class EmployeeHandler(BaseHandler):
    def get(self, employee_id):
        conn = get_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM employees WHERE id = %s", (employee_id))
        employee = cursor.fetchone()
        conn.close()
        if employee:
            if employee["image"]:
                employee["image"] = base64.b64encode(employee["image"]).decode("utf-8")
            else:
                employee["image"] = None
            self.write(json.dumps(employee))
        else:
            self.set_status(404)
            self.write({"error": "Employee not found"})

    def delete(self, employee_id):
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM employees WHERE id = %s", (employee_id))
        conn.commit()
        conn.close()
        self.write({"message": "Employee deleted successfully"})

def make_app():
    return tornado.web.Application([
        (r"/employees", EmployeesHandler),
        (r"/employees/([0-9]+)", EmployeeHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8000)
    print("Tornado server running on http://localhost:8000")
    tornado.ioloop.IOLoop.current().start()