import os


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB upload limit
    UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER", os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "uploads")))
    CORS_ORIGINS = [
        os.environ.get("FRONTEND_ORIGIN", "http://localhost:5173"),
    ]

    @staticmethod
    def init_app(app):
        os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)


