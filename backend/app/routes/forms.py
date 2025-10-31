from flask import Blueprint, request

bp = Blueprint("forms", __name__)


@bp.post("/feedback")
def feedback():
    data = request.get_json(silent=True) or {}
    # In real app, persist to DB. Here, echo back.
    return {"ok": True, "received": data}


@bp.post("/contact")
def contact():
    data = request.get_json(silent=True) or {}
    return {"ok": True, "received": data}


