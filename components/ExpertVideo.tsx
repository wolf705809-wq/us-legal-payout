// components/ExpertVideo.tsx
export default function ExpertVideo() {
  return (
    <div className="w-full max-w-4xl mx-auto my-12 overflow-hidden rounded-2xl border-2 border-blue-600/30 bg-slate-900 shadow-2xl">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 aspect-[9/16] bg-black">
          <iframe 
            src="https://app.heygen.com/embeds/e6799583d1c24b56ad249eaab897fd8f"
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="w-full md:w-1/2 p-8 text-white">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 text-xs font-bold uppercase">
            v9.3 Statutory Auditor Live
          </div>
          <h2 className="text-2xl font-bold mb-4">Stop Negotiating. <br/><span className="text-blue-500">Start Auditing.</span></h2>
          <p className="text-slate-400 text-sm mb-6">I am SJ Lee. Our algorithm reveals the true settlement value insurance companies hide from you.</p>
          <a href="#calculator" className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-center font-bold rounded-lg transition-all">
            RUN AUDITOR NOW →
          </a>
        </div>
      </div>
    </div>
  );
}
