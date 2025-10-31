from flask import Blueprint, request

bp = Blueprint("analyze", __name__)


@bp.post("/analyze")
def analyze_symptoms():
    data = request.get_json(silent=True) or {}
    description = data.get("description", "")
    # Stub: pretend to analyze and return a mock result
    result = {
        "condition": "Possible Appendicitis" if "abdomen" in description.lower() else "General Checkup Recommended",
        "urgency": "Seek medical attention within 24 hours" if "pain" in description.lower() else "Non-urgent"
    }
    return {"ok": True, "result": result}


