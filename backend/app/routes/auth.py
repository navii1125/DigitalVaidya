from flask import Blueprint, request

bp = Blueprint("auth", __name__)


@bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    name = (email.split("@")[0] if email else "User").title()
    return {"ok": True, "user": {"name": name, "email": email}}


@bp.post("/signup")
def signup():
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    name = (email.split("@")[0] if email else "User").title()
    return {"ok": True, "user": {"name": name, "email": email}}


@bp.post("/face-login")
def face_login():
    # Frontend-only mock; returns a static user
    return {"ok": True, "user": {"name": "Returning User"}}


