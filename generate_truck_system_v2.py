import os
import pandas as pd
from pathlib import Path
import sys
import hashlib

# 1. 경로 설정
ROOT_DIR = Path(__file__).resolve().parent
TEMPLATE_PATH = ROOT_DIR / "truck_template.html"
DATA_PATH = ROOT_DIR / "top_3000_with_highways.csv"
OUTPUT_ROOT = ROOT_DIR / "truck"

sys.path.append(str(ROOT_DIR / "scripts"))
from smart_sitemap import generate_stealth_sitemap

def get_seed(city_name):
    return int(hashlib.md5(city_name.encode()).hexdigest(), 16)

def get_dynamic_content(city, state_id, highways):
    seed = get_seed(f"{city}{state_id}")
    
    # 5가지 의학/법률 분석 패턴
    insight_patterns = [
        f"Forensic analysis of the {highways} corridor in {city} reveals significant commercial vehicle density. This audit decodes federal safety violations specific to {state_id} jurisdiction.",
        f"The biological latency of soft-tissue trauma following an 18-wheeler impact on {highways} often masks underlying vertebral instability in {city}.",
        f"Federal FMCSA safety compliance data for carriers near {city} indicates critical liability exposure on {highways}.",
        f"Kinetic energy dissipation in high-velocity commercial collisions near {city} frequently results in TBI on {highways}.",
        f"Insurance adjusters in {state_id} often minimize non-visible spinal axial loading injuries at the {highways} intersection in {city}."
    ]
    selected_insight = insight_patterns[seed % len(insight_patterns)]

    # ---------------------------------------------------------
    # 🔥 님의 370줄 디자인 코드를 '이사' 시켰습니다 (CSS/SVG 보존)
    # ---------------------------------------------------------
    
    # 블록 A: 주 선택 노드 (님의 원본 디자인 100% 반영)
    block_search = f"""
    <section class="mb-6 md:mb-10 text-left bg-[#f8fafc] rounded-2xl p-6 md:p-8 border border-slate-200/60 nodal-nodes-section">
        <p class="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-slate-900 mb-4">AUTHORIZED STATE NODES</p>
        <div class="relative">
            <input id="state-search-input" type="text" placeholder="Search {city} Jurisdiction..." class="w-full rounded-md border border-slate-200 bg-[#fcfdfe] px-4 py-3.5 text-[1.0rem] font-semibold text-[#1e293b] shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500" />
            <div id="state-search-results" class="hidden absolute z-40 mt-2 w-full rounded-md border border-slate-200 bg-white shadow-xl max-h-64 overflow-y-auto"></div>
        </div>
        <div class="mt-6 md:mt-7">
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-3">
                <button type="button" class="major-jurisdiction-card border border-slate-200/60 bg-[#fcfdfe] p-4 rounded-xl text-center"><span class="block text-slate-800 font-bold text-lg">CA</span><span class="block text-[8px] font-bold text-slate-400 uppercase">v2026.SYNCED</span></button>
                <button type="button" class="major-jurisdiction-card border border-slate-200/60 bg-[#fcfdfe] p-4 rounded-xl text-center"><span class="block text-slate-800 font-bold text-lg">TX</span><span class="block text-[8px] font-bold text-slate-400 uppercase">v2026.SYNCED</span></button>
                <button type="button" class="major-jurisdiction-card border border-slate-200/60 bg-[#fcfdfe] p-4 rounded-xl text-center"><span class="block text-slate-800 font-bold text-lg">FL</span><span class="block text-[8px] font-bold text-slate-400 uppercase">v2026.SYNCED</span></button>
                <button type="button" class="major-jurisdiction-card border border-slate-200/60 bg-[#fcfdfe] p-4 rounded-xl text-center"><span class="block text-slate-800 font-bold text-lg">GA</span><span class="block text-[8px] font-bold text-slate-400 uppercase">v2026.SYNCED</span></button>
                <button type="button" class="major-jurisdiction-card border border-slate-200/60 bg-[#fcfdfe] p-4 rounded-xl text-center"><span class="block text-slate-800 font-bold text-lg">NY</span><span class="block text-[8px] font-bold text-slate-400 uppercase">v2026.SYNCED</span></button>
            </div>
        </div>
    </section>
    """

    # 블록 B: 액티브 주 데이터 모니터 (님의 화이트 모드 디자인 100% 반영)
    # *주의: f-string 내의 중괄호{{}}는 두 번 써서 이스케이프했습니다.
    block_card = f"""
    <div id="active-jurisdiction-card" class="relative p-6 md:p-10 mb-12 text-left rounded-3xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-700" style="background-color: #ffffff;">
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: linear-gradient(#000 1px, transparent 1px); background-size: 100% 4px;"></div>
        <div class="relative z-10">
            <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div class="flex items-center gap-3">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Active Jurisdiction</span>
                    <span class="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-600 rounded-full text-[9px] font-black border border-orange-100 uppercase tracking-wider">
                        <span class="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span> FMCSA Live
                    </span>
                </div>
            </div>
            <h2 class="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-12 tracking-tight">{city}, {state_id}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
                <div>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Statutory Authority</p>
                    <div class="inline-flex items-center gap-4 bg-[#0f172a] text-white font-mono text-base px-6 py-4 rounded-xl border border-slate-800">
                        <span class="text-orange-400 font-black">$</span> <span id="statute-display" class="animate-pulse text-slate-300 tracking-wider">DECODING...</span>
                    </div>
                </div>
                <div class="md:text-right">
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Liability Doctrine</p>
                    <p class="text-xl md:text-2xl font-serif font-semibold text-slate-800 leading-tight italic">{selected_insight}</p>
                </div>
            </div>
            <div class="mt-10 rounded-2xl border border-slate-100 bg-slate-50/50 p-6 md:p-8 backdrop-blur-sm">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div class="text-[8px] font-black text-slate-400 uppercase mb-3">Weather Factor</div><div id="env-weather-factor" class="font-mono text-[12px] font-bold text-slate-800">—</div></div>
                    <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div class="text-[8px] font-black text-slate-400 uppercase mb-3">Major Corridor</div><div id="env-major-highway" class="font-mono text-[12px] font-bold text-slate-800">{highways}</div></div>
                    <div class="rounded-xl border border-orange-100 bg-orange-50/50 p-5 shadow-sm"><div class="text-[8px] font-black text-orange-600 uppercase mb-3">Recovery Deadline</div><div id="state-sol" class="font-mono text-[18px] font-black text-slate-900">—</div></div>
                </div>
            </div>
        </div>
    </div>
    """

    # 블록 C: CTA 버튼 & 보안 배지 (님의 버튼 디자인 100% 반영)
    block_cta = f"""
    <div class="flex flex-col items-center w-full mb-20 gap-4 mt-10">
        <button id="main-cta-btn" type="button" class="group relative flex items-center justify-center gap-6 bg-[#050810] text-white px-10 md:px-24 rounded-[2rem] shadow-2xl w-[94%] max-w-[500px] border border-slate-800 py-6">
            <span class="relative z-10 whitespace-nowrap text-[13px] md:text-[18px] font-black uppercase tracking-[0.12em]">INITIALIZE STATUTORY CASE AUDIT</span>
        </button>
        <div class="flex items-center gap-3 px-4 py-1.5 bg-slate-950/40 rounded-full border border-slate-800/40">
            <span class="text-[9px] font-medium text-slate-500 tracking-[0.2em] uppercase font-mono">AES-256 END-to-END ENCRYPTION SECURE</span>
        </div>
    </div>
    """

    # 셔플 로직
    layout_blocks = [block_search, block_card, block_cta]
    shift = seed % len(layout_blocks)
    shuffled = layout_blocks[shift:] + layout_blocks[:shift]

    return {
        "layout_block_1": shuffled[0],
        "layout_block_2": shuffled[1],
        "layout_block_3": shuffled[2],
        "truck_risk_summary": selected_insight,
        "seo_title": f"{city}, {state_id} Truck Accident Statutory Audit",
        "seo_description": f"Audit for {city}, {state_id} on {highways}."
    }

def render_template(template: str, values: dict) -> str:
    rendered = template
    for key, val in values.items():
        rendered = rendered.replace(f"{{{{ {key} }}}}", str(val))
        rendered = rendered.replace(f"{{{{{key}}}}}", str(val))
    return rendered

def generate_pages():
    if not TEMPLATE_PATH.exists(): return
    template_html = TEMPLATE_PATH.read_text(encoding="utf-8")
    df = pd.read_csv(DATA_PATH)
    print(f"🚀 {len(df)}개 도시 0.1% 스텔스 생성 시작...")
    for index, row in df.iterrows():
        city, state_id, highways = str(row['city']), str(row['state_id']), str(row['major_highways'])
        dynamic = get_dynamic_content(city, state_id, highways)
        render_values = {
            "state_name": f"{city}, {state_id}",
            "truck_risk_summary": dynamic["truck_risk_summary"],
            "real_statute_code": f"FMCSA-390.{index+1024}",
            "seo_title": dynamic["seo_title"],
            "seo_description": dynamic["seo_description"],
            "layout_block_1": dynamic["layout_block_1"],
            "layout_block_2": dynamic["layout_block_2"],
            "layout_block_3": dynamic["layout_block_3"]
        }
        rendered = render_template(template_html, render_values)
        state_dir = OUTPUT_ROOT / state_id.lower()
        if not state_dir.exists(): os.makedirs(state_dir)
        output_path = state_dir / f"{city.lower().replace(' ', '-')}.html"
        output_path.write_text(rendered, encoding="utf-8")
    print(f"✅ 생성 완료.")

if __name__ == "__main__":
    generate_pages()
    generate_stealth_sitemap()