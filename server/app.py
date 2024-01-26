from flask import Flask, request, render_template, redirect, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  
import bcrypt

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
app.secret_key = 'n56nyjmn7jkfnfj8'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    def __init__(self, email, password, name):
        self.name = name
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({"error": "Missing required fields"}), 400

        new_user = User(name=name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "Registration successful"}), 201

    return jsonify({"error": "Method Not Allowed"}), 405

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if user and user.check_password(password):
            session['email'] = user.email
            return jsonify({"message": "Login successful", "user": {"name": user.name, "email": user.email}})
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"error": "Method Not Allowed"}), 405

@app.route('/dashboard')
def dashboard():
    if session.get('email'):
        user = User.query.filter_by(email=session['email']).first()
        if user:
            return jsonify({"user": {"name": user.name, "email": user.email}})
    
    return jsonify({"error": "Unauthorized"}), 401

@app.route('/update_profile', methods=['PUT'])
def update_profile():
    if request.method == 'PUT':
        if 'email' not in session:
            return jsonify({"error": "Unauthorized"}), 401

        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        new_name = data.get('name')
        new_email = data.get('email')

        if not new_name and not new_email:
            return jsonify({"error": "Nothing to update"}), 400

        user = User.query.filter_by(email=session['email']).first()

        if user:
            if new_name:
                user.name = new_name
            if new_email:
                user.email = new_email

            db.session.commit()

            return jsonify({"message": "Profile updated successfully", "user": {"name": user.name, "email": user.email}})
        else:
            return jsonify({"error": "User not found"}), 404

    return jsonify({"error": "Method Not Allowed"}), 405

@app.route('/logout')
def logout():
    session.pop('email', None)
    return jsonify({"message": "Logout successful"})

if __name__ == '__main__':
    app.run(debug=True)