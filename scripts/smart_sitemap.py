name: Daily Stealth Sitemap Update

on:
  schedule:
    - cron: '0 18 * * *' # 매일 한국 시간 새벽 3시 자동 실행
  workflow_dispatch: # 직접 실행 버튼 활성화 (테스트용)

jobs:
  update-sitemap:
    runs-on: ubuntu-latest
    permissions:
      contents: write # 깃허브가 스스로 파일을 수정하고 푸시할 권한
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12' # 안정적인 버전 사용
          
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install pandas
          
      - name: Run Sitemap Generator
        run: python scripts/smart_sitemap.py
        
      - name: Commit and Push changes
        run: |
          git config --global user.name 'GitHub Action Bot'
          git config --global user.email 'action@github.com'
          git add sitemap.xml
          git commit -m "Auto-update sitemap: $(date)" || echo "No changes to commit"
          git push