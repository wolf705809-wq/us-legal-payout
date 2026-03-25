import os
import sys
import traceback
from pathlib import Path
from supabase import create_client

def generate_pages():
    try:
        # 1. 환경 변수 확인
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_API_KEY") or os.getenv("SUPABASE_ANON_KEY")
        
        if not url or not key:
            print("❌ 에러: SUPABASE 환경 변수를 찾을 수 없습니다!")
            sys.exit(1)

        # 2. 템플릿 파일 확인
        ROOT_DIR = Path(__file__).resolve().parent
        TEMPLATE_PATH = ROOT_DIR / "truck_template.html"
        
        if not TEMPLATE_PATH.exists():
            print(f"❌ 에러: 템플릿 파일이 없습니다: {TEMPLATE_PATH}")
            # 현재 폴더에 뭐가 있는지 출력 (경로 확인용)
            print(f"현재 폴더 파일 목록: {os.listdir(ROOT_DIR)}")
            sys.exit(1)

        # 3. Supabase 연결 테스트
        print("🌐 Supabase 연결 시도 중...")
        supabase = create_client(url, key)
        
        # 여기에 기존 페이지 생성 로직을 넣으세요.
        # 데이터가 비어있는지도 꼭 확인해야 합니다!
        print("✅ 모든 조건 충족. 페이지 생성을 시작합니다.")
        
        # ... (기존 로직 수행) ...

    except Exception as e:
        print(f"🚨 치명적 에러 발생: {str(e)}")
        traceback.print_exc() # 에러의 상세 위치와 원인을 로그에 출력
        sys.exit(1)

if __name__ == "__main__":
    generate_pages()
