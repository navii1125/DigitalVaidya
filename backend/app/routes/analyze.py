from flask import Blueprint, request
from ..firebase_auth import optional_auth

bp = Blueprint("analyze", __name__)


@bp.post("/analyze")
@optional_auth
def analyze_symptoms():
    data = request.get_json(silent=True) or {}
    description = data.get("description", "")
    health_params = data.get("healthParams", {})
    
    temperature = health_params.get("temperature")
    systolic_bp = health_params.get("systolicBP")
    diastolic_bp = health_params.get("diastolicBP")
    heart_rate = health_params.get("heartRate")
    oxygen_level = health_params.get("oxygenLevel")
    
    conditions = []
    urgency_level = "Non-urgent"
    
    if "abdomen" in description.lower() or "stomach" in description.lower():
        conditions.append("Possible Appendicitis")
        urgency_level = "Seek medical attention within 24 hours"
    
    if temperature and float(temperature) > 38.0:
        conditions.append("Fever detected")
        urgency_level = "Monitor closely, seek medical attention if persistent"
    
    if systolic_bp and diastolic_bp:
        systolic = float(systolic_bp)
        diastolic = float(diastolic_bp)
        if systolic > 140 or diastolic > 90:
            conditions.append("Elevated Blood Pressure")
            urgency_level = "Consult a doctor soon"
        elif systolic < 90 or diastolic < 60:
            conditions.append("Low Blood Pressure")
            urgency_level = "Monitor and consult if symptoms persist"
    
    if heart_rate:
        hr = float(heart_rate)
        if hr > 100:
            conditions.append("Tachycardia (Elevated Heart Rate)")
            urgency_level = "Monitor closely"
        elif hr < 60:
            conditions.append("Bradycardia (Low Heart Rate)")
    
    if oxygen_level and float(oxygen_level) < 95:
        conditions.append("Low Oxygen Saturation")
        urgency_level = "Seek medical attention promptly"
    
    if "pain" in description.lower():
        urgency_level = "Seek medical attention within 24 hours"
    
    user_info = None
    if hasattr(request, 'user') and request.user:
        user_info = {
            "uid": request.user.get("uid"),
            "email": request.user.get("email")
        }
    
    result = {
        "condition": " & ".join(conditions) if conditions else "General Checkup Recommended",
        "urgency": urgency_level,
        "healthParams": health_params,
        "user": user_info
    }
    
    return {"ok": True, "result": result}


