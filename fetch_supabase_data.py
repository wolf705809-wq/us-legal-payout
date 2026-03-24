import os
from typing import Any, Dict, List

from supabase import Client, create_client


def get_supabase_client() -> Client:
    supabase_url = os.getenv("SUPABASE_URL", "").strip()
    supabase_key = (
        os.getenv("SUPABASE_API_KEY", "").strip()
        or os.getenv("SUPABASE_ANON_KEY", "").strip()
        or os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    )

    if not supabase_url or not supabase_key:
        raise ValueError(
            "Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_API_KEY "
            "(or SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY)."
        )

    return create_client(supabase_url, supabase_key)


def fetch_truck_data(table_name: str = "truck_state_profiles") -> List[Dict[str, Any]]:
    client = get_supabase_client()
    truck_data = (
        client.table(table_name)
        .select("*")
        .eq("is_active", True)
        .order("state_key", desc=False)
        .limit(50)
        .execute()
        .data
        or []
    )
    return truck_data


if __name__ == "__main__":
    rows = fetch_truck_data()
    print(f"Fetched rows: {len(rows)}")
    for row in rows:
        print(row)
