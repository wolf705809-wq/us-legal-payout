import pandas as pd
import os

# 파일 경로 설정
input_file = 'uszips.csv'  # 아까 압축 푼 파일명
output_file = 'top_3000_cities.csv'

def filter_top_cities():
    if not os.path.exists(input_file):
        print(f"❌ 에러: '{input_file}' 파일이 없습니다. 루트 폴더에 있는지 확인하세요!")
        return

    print("🚀 데이터 로딩 중...")
    # csv 읽기
    df = pd.read_csv(input_file)

    # 1. 인구가 어느 정도 있는 도시만 필터링 (너무 작으면 광고 효율 안 나옴)
    # SimpleMaps 데이터의 컬럼명은 'population'입니다.
    # 인구 5,000명 이상인 도시만 남기고 인구순으로 정렬
    filtered_df = df[df['population'] > 5000].sort_values(by='population', ascending=False)

    # 2. 상위 3,000개 도시만 추출
    top_3000 = filtered_df.head(3000)

    # 3. 저장
    top_3000.to_csv(output_file, index=False)
    
    print("-" * 30)
    print(f"✅ 성공! 'top_3000_cities.csv' 생성 완료.")
    print(f"📍 대상 도시 수: {len(top_3000)}개")
    print(f"📈 최대 인구 도시: {top_3000.iloc[0]['city']} ({top_3000.iloc[0]['state_name']})")
    print("-" * 30)

if __name__ == "__main__":
    filter_top_cities()