import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function MockInterviewApp() {
  const [activeTab, setActiveTab] = useState('input');
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [interviewData, setInterviewData] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setTimeout(() => {
      setInterviewData("AI Prep Guide Generated for " + company);
      setLoading(false);
      setActiveTab('results');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6 text-emerald-700">CAREER AI HUB</h1>
      {activeTab === 'input' ? (
        <div className="max-w-2xl bg-white p-6 rounded-xl border shadow-sm">
          <input className="w-full border p-3 rounded mb-4" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} />
          <textarea className="w-full border p-3 rounded h-32 mb-4" placeholder="Paste Job Description" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
          <textarea className="w-full border p-3 rounded h-32 mb-6" placeholder="Paste Your Resume" value={resumeText} onChange={e => setResumeText(e.target.value)} />
          <button onClick={handleGenerate} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold">
            {loading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mx-auto" /> : "GENERATE PREP GUIDE"}
          </button>
        </div>
      ) : (
        <div className="max-w-2xl bg-white p-6 rounded-xl border">
          <button onClick={() => setActiveTab('input')} className="mb-4 text-emerald-600 font-bold">← BACK</button>
          <div className="prose whitespace-pre-wrap">{interviewData}</div>
        </div>
      )}
    </div>
  );
}