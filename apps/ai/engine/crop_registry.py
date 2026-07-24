"""
Mizan Universal Satellite Engine v5.0 - Crop Registry
------------------------------------------------------
Decoupled Agronomic Decision Layer for interpreting physical spectral outputs
(f_PV, f_Soil, f_NPV, BSI, NDRE, NDTI) across 4 agricultural groups.
"""

from typing import Dict, Any, Optional

CROP_GROUPS: Dict[str, Dict[str, Any]] = {
    "GROUP_1_BORI_TREES": {
        "group_id": "GROUP_1_BORI_TREES",
        "name_ar": "الأشجار الجافة والمتباعدة",
        "crops": ["olive", "picholine", "arbequina", "almond", "pistachio", "fig", "زيتون", "لوز", "فستق", "تين"],
        "is_perennial": True,
        "pv_min_threshold": 0.12,     # Minimum green canopy unmixing fraction
        "bsi_bare_cutoff": 0.18,       # High soil tolerance for wide tree spacing
        "ndre_chlorophyll_min": 0.035, # Calibrated for silver wax leaves
        "unmixing_scaling": "CONTINUOUS_EXPANDED",
    },
    "GROUP_2_DENSE_PERENNIAL": {
        "group_id": "GROUP_2_DENSE_PERENNIAL",
        "name_ar": "الأشجار الدائمة الكثيفة والمروية",
        "crops": ["citrus", "orange", "lemon", "palm", "date_palm", "mango", "حمضيات", "برتقال", "حامض", "نخيل", "مانجو"],
        "is_perennial": True,
        "pv_min_threshold": 0.15,
        "bsi_bare_cutoff": 0.10,
        "ndre_chlorophyll_min": 0.08,
        "unmixing_scaling": "HIGH_DENSITY",
    },
    "GROUP_3_FIELD_CROPS": {
        "group_id": "GROUP_3_FIELD_CROPS",
        "name_ar": "المحاصيل الحقلية الاستراتيجية",
        "crops": ["wheat", "barley", "alfalfa", "clover", "corn", "قمح", "شعير", "فصّة", "برسيم", "ذرة"],
        "is_perennial": False,
        "pv_min_threshold": 0.18,
        "bsi_bare_cutoff": 0.05,
        "ndre_chlorophyll_min": 0.05,
        "unmixing_scaling": "BELL_CURVE",
    },
    "GROUP_4_ANNUAL_VEGETABLES_BARE": {
        "group_id": "GROUP_4_ANNUAL_VEGETABLES_BARE",
        "name_ar": "الخضروات والمحاصيل المكشوفة والبور",
        "crops": ["tomato", "potato", "watermelon", "melon", "bare", "fallow", "طماطم", "بطاطس", "بطيخ", "بور", "فارغ"],
        "is_perennial": False,
        "pv_min_threshold": 0.20,
        "bsi_bare_cutoff": 0.02,
        "ndre_chlorophyll_min": 0.04,
        "unmixing_scaling": "STRICT_BARE_SOIL",
    }
}

def resolve_crop_profile(crop_type: Optional[str]) -> Dict[str, Any]:
    """Resolves crop type string to its corresponding Crop Group profile."""
    if not crop_type:
        return CROP_GROUPS["GROUP_1_BORI_TREES"]

    c_lower = crop_type.lower()
    for group_key, group in CROP_GROUPS.items():
        for matched_name in group["crops"]:
            if matched_name in c_lower:
                return group

    # Default fallback to Group 1 (Bori Trees)
    return CROP_GROUPS["GROUP_1_BORI_TREES"]
