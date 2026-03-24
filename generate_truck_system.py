import os
import re
from pathlib import Path
from typing import Any, Dict, List

from supabase import Client, create_client


ROOT_DIR = Path(__file__).resolve().parent
TEMPLATE_PATH = ROOT_DIR / "truck_template.html"
OUTPUT_ROOT = ROOT_DIR / "truck"


def get_supabase_client() -> Client:
    supabase_url = os.getenv("SUPABASE_URL", "").strip()
    supabase_key = (
        os.getenv("SUPABASE_API_KEY", "").strip()
        or os.getenv("SUPABASE_ANON_KEY", "").strip()
        or os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    )
    if not supabase_url or not supabase_key:
        raise ValueError(
            "Missing Supabase credentials. Set SUPABASE_URL and "
            "SUPABASE_API_KEY (or SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY)."
        )
    return create_client(supabase_url, supabase_key)


def slugify(value: str) -> str:
    clean = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return clean or "unknown-state"


def build_risk_summary(row: Dict[str, Any]) -> str:
    highway = row.get("major_highway", "primary freight corridors")
    crash_stats = row.get("crash_stats", "regional truck incident data")
    weather = row.get("weather_factor", "local road hazard factors")
    return (
        f"High-risk freight exposure across {highway}; {crash_stats}; "
        f"weather threat profile: {weather}."
    )


def render_template(template: str, values: Dict[str, str]) -> str:
    rendered = template
    for key, val in values.items():
        rendered = rendered.replace(f"{{{{ {key} }}}}", val)
    return rendered


def fetch_truck_data(client: Client) -> List[Dict[str, Any]]:
    truck_rows = (
        client.table("truck_state_profiles")
        .select("*")
        .eq("is_active", True)
        .order("state_name", desc=False)
        .limit(50)
        .execute()
        .data
        or []
    )

    state_rows = (
        client.table("state_profiles")
        .select("state_key, statute_authority")
        .eq("is_active", True)
        .execute()
        .data
        or []
    )
    statute_map = {
        str(row.get("state_key", "")).strip().lower(): str(row.get("statute_authority", "")).strip()
        for row in state_rows
    }

    for row in truck_rows:
        key = str(row.get("state_key", "")).strip().lower()
        row["statute_code"] = statute_map.get(key, "Statutory reference pending")

    return truck_rows


def generate_pages() -> None:
    if not TEMPLATE_PATH.exists():
        raise FileNotFoundError(f"Template not found: {TEMPLATE_PATH}")

    template_html = TEMPLATE_PATH.read_text(encoding="utf-8")
    client = get_supabase_client()
    truck_data = fetch_truck_data(client)
    if len(truck_data) != 50:
        raise RuntimeError(f"Expected 50 active states, found {len(truck_data)}.")

    for row in truck_data:
        state_name = str(row.get("state_name", "")).strip()
        state_slug = str(row.get("state_key", "")).strip() or slugify(state_name)
        statute_code = str(row.get("statute_code", "")).strip() or "Statutory reference pending"
        truck_risk_summary = build_risk_summary(row)
        seo_title = f"{state_name} Truck Specialist Audit | Nodal" if state_name else "Truck Specialist Audit | Nodal"

        output_dir = OUTPUT_ROOT / state_slug
        os.makedirs(output_dir, exist_ok=True)

        rendered = render_template(
            template_html,
            {
                "state_name": state_name,
                "statute_code": statute_code,
                "truck_risk_summary": truck_risk_summary,
                "seo_title": seo_title,
            },
        )

        (output_dir / "index.html").write_text(rendered, encoding="utf-8")

    print("50 States Truck Audit Pages Generated Successfully")


if __name__ == "__main__":
    generate_pages()
