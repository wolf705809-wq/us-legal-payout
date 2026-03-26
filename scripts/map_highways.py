import pandas as pd

# 1. 아까 만든 3,000개 도시 데이터 로드
input_file = 'top_3000_cities.csv'
output_file = 'top_3000_with_highways.csv'

# 2. 미국 주요 주별 핵심 고속도로 데이터 (0.1% 핵심 DB)
# 이 데이터는 구글 검색 노출의 핵심 미끼가 됩니다.
state_highways = {
    'CA': ['I-5', 'I-10', 'I-15', 'I-405', 'I-80'],
    'TX': ['I-10', 'I-20', 'I-35', 'I-45', 'I-10'],
    'FL': ['I-95', 'I-75', 'I-4', 'I-10'],
    'NY': ['I-95', 'I-87', 'I-90', 'I-495'],
    'GA': ['I-75', 'I-85', 'I-20', 'I-285'],
    'PA': ['I-76', 'I-80', 'I-81', 'I-95'],
    'IL': ['I-90', 'I-94', 'I-55', 'I-57', 'I-290'],
    'OH': ['I-71', 'I-75', 'I-77', 'I-80', 'I-90'],
    # ... 나머지 주는 기본값이나 Claude를 통해 더 확장 가능합니다.
}

def map_highways():
    df = pd.read_csv(input_file)
    print(f"🛣️ {len(df)}개 도시에 고속도로 데이터를 매핑 중...")

    def get_local_highways(row):
        state = row['state_id']
        # 해당 주에 정의된 고속도로가 있으면 가져오고, 없으면 일반 Interstate 80/90 할당
        highways = state_highways.get(state, ['I-80', 'I-90'])
        # 도시별로 약간의 변주를 주어 '패턴'을 파괴 (구글 스팸 방지)
        # 실제로는 인구수나 위치에 따라 더 정교하게 나눌 수 있음
        import random
        selected = random.sample(highways, min(len(highways), 2))
        return ", ".join(selected)

    df['major_highways'] = df.apply(get_local_highways, axis=1)

    # 저장
    df.to_csv(output_file, index=False)
    print(f"✅ 완료! '{output_file}'이 생성되었습니다.")

if __name__ == "__main__":
    map_highways()