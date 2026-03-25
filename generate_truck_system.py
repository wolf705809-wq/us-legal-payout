import os
import sys
from pathlib import Path
from supabase import create_client

# 1. 환경 변수 체크 (가장 유력한 범인)
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_API_KEY") or os.getenv("SUPABASE_ANON_KEY")

if not url or not key:
    print("❌ 에러: SUPABASE_URL 또는 API_KEY 환경 변수가 없습니다.")
    print("Vercel Settings -> Environment Variables를 확인하세요.")
    sys.exit(1)

try:
    # 2. 파일 존재 확인
    ROOT_DIR = Path(__file__).resolve().parent
    TEMPLATE_PATH = ROOT_DIR / "truck_template.html"
    
    if not TEMPLATE_PATH.exists():
        print(f"❌ 에러: 템플릿 파일을 찾을 수 없습니다: {TEMPLATE_PATH}")
        sys.exit(1)

    # 3. 실제 로직 실행 (생략 - 기존 로직 유지)
    print("🚀 빌드 시작...")
    # ... 기존 generate_pages() 호출 ...
    
except Exception as e:
    print(f"🚨 실행 중 예상치 못한 에러 발생: {e}")
    import traceback
    traceback.print_exc() # 에러의 상세 경로를 로그에 출력
    sys.exit(1)
