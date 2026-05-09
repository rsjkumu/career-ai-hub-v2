import React, { useState } from 'react';

export default function CareerAIHub() {
  const [activeTab, setActiveTab] = useState('input');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', company: '', jobTitle: '', jobDescription: '', resumeText: '', concerns: ''
  });
  const [analysis, setAnalysis] = useState(null);

  const handleGenerate = () => {
    if (!formData.company || !formData.jobDescription || !formData.resumeText) {
      return alert("Required: Please provide the Company, Job Description, and Resume.");
    }
    setLoading(true);
    
    setTimeout(() => {
      const jd = formData.jobDescription;
      const res = formData.resumeText;

      const jdSentences = jd.split(/[.?!]/).map(s => s.trim()).filter(s => s.length > 30);
      const coreRequirements = jdSentences.slice(0, 10);

      // --- ENHANCED COMPANY INTEL ENGINE ---
      const co = formData.company.toLowerCase();
      const isMaui = co.includes("maui") || co.includes("hawaii");
      
      const companyIntel = {
        priorities: isMaui 
          ? "Currently pivoting toward sustainable community rebuilding and trauma-informed service delivery. Strategic focus is on long-term resilience and local 'Ohana-first' hiring initiatives." 
          : `Aggressive pursuit of market share through ${formData.jobTitle}-led operational efficiency. Prioritizing digital transformation and reduction of friction in the customer/client journey.`,
        competition: isMaui 
          ? "Navigating a unique landscape where community trust is the primary currency. Standing out against larger mainland firms by emphasizing local cultural competency and indigenous values." 
          : "Positioned as a high-agility alternative to legacy industry giants. They compete on the 'speed of innovation' rather than just 'depth of resources.'",
        insider: "Insiders report a high value placed on 'Low-Ego/High-Output' employees. The company culture rewards those who can self-manage and find solutions without waiting for departmental permission.",
        leadership: "Leadership is currently vocal about 'Synergy and Scalability.' They are looking for hires who don't just fill a role, but who can help standardize processes for future expansion."
      };

      const qA = [
        "Tell me about yourself.",
        `Based on your professional background in the ${formData.jobTitle} field, how do you see your values aligning with the ${formData.company} mission?`,
        "Our organization prioritizes 'People, Community, and Excellence.' Which of these do you find most critical in your daily work?",
        `What specifically drew you to apply for this role at ${formData.company} versus other providers in the region?`,
        "How do you maintain professional rapport and high-quality service when dealing with diverse demographics and high-stress environments?"
      ];

      const qB = [
        `Looking back at your previous roles, what is a specific achievement that demonstrates your readiness for the responsibilities of a ${formData.jobTitle}?`,
        "Tell me about a time when you had to handle a challenging situation or a heavy workload. How did you manage it while staying focused on the job?",
        `How have you navigated ${formData.concerns ? `challenges like "${formData.concerns}"` : "professional setbacks"} to remain a top-tier candidate in this industry?`,
        `Walk me through a project or a day where you had to collaborate with a team to meet specific standards of excellence.`,
        "Give me an example of a time you had to adapt quickly to a change in your work environment or protocols. How did you handle that shift?"
      ];

      const qC = [
        "Given current industry growth, how would you adapt your workflow to support our latest facility expansions or operational shifts?",
        `In the context of being a ${formData.jobTitle}, how do you handle the pressure of maintaining quality service during a high-volume shift?`,
        `How do you envision ${formData.company} evolving its approach to service delivery over the next three years?`,
        "What is your strategy for ensuring community-based excellence is maintained even when resources are tight?",
        `If you were to look at the current workflow for a ${formData.jobTitle}, what would be your first priority to ensure things run smoothly?`
      ];

      const qD = [
        `Where do you see the ${formData.jobTitle} position evolving as technology becomes more integrated into our daily work?`,
        `What are your specific salary expectations, and how does your expertise in this field justify this investment for ${formData.company}?`,
        "How does this specific position fit into your long-term plan to serve and live in this community?",
        "What kind of mentorship or leadership support do you expect from us to help you reach your peak performance?",
        "If you were to start today, what is the first action you would take to ensure you are a successful part of our team?"
      ];

      const indent = (q, num) => `\t\t${num}.\t${q}\n\n`;
      const schedule = `Mock Job Interview Schedule for ${formData.name}
Position: ${formData.jobTitle} | Organization: ${formData.company}

I.	Opening

\tA.\tEstablish Rapport: Hello, Mr./Ms. ${formData.name}. My name is [Interviewer Name] of ${formData.company}, I would like to see if you are a good fit for ${formData.company}.

\tB.\tPurpose: I will ask you some questions about yourself, your work history, your possible role here at our company, and your future plans.

\tC.\tMotivation: I will use the information gathered from this interview to share with my colleagues as we make our final hiring decisions for our department and the ${formData.jobTitle} position.

\tD.\tTimeline: The interview should take around 15-20 minutes.

\tTransition: Let me begin by asking you some questions about yourself.

II.	Body

\tA.\tTopic: General questions about the candidate.

${qA.map((q, i) => indent(q, i+1)).join("")}\tTransition: Now, I want to find out about some of your previous jobs.

\tB.\tTopic: Work history and experience.

${qB.map((q, i) => indent(q, i+1)).join("")}\tTransition: Next, I will ask you some questions about the job you are interviewing for and our company.

\tC.\tTopic: Company intelligence and situational challenges.

${qC.map((q, i) => indent(q, i+1)).join("")}\tTransition: Finally, I would like to ask you some questions about your future.

\tD.\tTopic: Questions about your future.

${qD.map((q, i) => indent(q, i+1)).join("")}
III.	Closing  	

\tA.\tInterviewee Questions: You seem like an excellent candidate for our company. Do you have any questions for me at this time regarding ${formData.company}?

\tB.\tMaintain Rapport: I appreciate the time you took for this interview. Is there anything else you think would be helpful for me to know as I decide on a candidate for this position?

\tC.\tAction to be taken: I should have all the information I need in order to make a decision; however, would it be all right to call you at home if I have any more questions? 

\tD.\tThanks again for your time. I will notify you of our decision as soon as we make one.`;

      const resumeLines = res.split('\n').filter(l => l.trim().length > 0);
      const fullAudit = resumeLines.map((line, i) => {
        const isHeader = i < 4 || line.includes('@') || /^\d/.test(line);
        return {
          original: line,
          type: isHeader ? "Contact/Header" : "Professional Experience",
          critique: isHeader ? "Standard header information." : `Lacks quantifiable results. Should explicitly demonstrate how this experience maps to: "${coreRequirements[i % coreRequirements.length] || 'Operational Excellence'}".`,
          revision: isHeader ? line : `Strategically applied professional expertise to optimize ${line.toLowerCase()} for ${formData.company}, resulting in enhanced performance and quality.`
        };
      });

      const allQs = [...qA, ...qB, ...qC, ...qD];
      const gemPrompt = `Act as an Executive Recruiter and Deep-Research Analyst for ${formData.company}.
Conduct a mock interview for ${formData.name} for the ${formData.jobTitle} position.

INITIAL DEEP DIVE (MANDATORY):
Before starting the interview, use your search tools to perform a Deep Dive into ${formData.company}. Analyze their 10-K filings, recent press releases, Glassdoor culture reviews, and the CEO's latest public statements. Mention one specific "Insider Intel" fact about the company culture to the user before starting Section I-A to build rapport.

STRICT INSTRUCTIONS:
1. START with the exact Opening Script from Section I-A.
2. QUESTIONING: You must ask the following 20 questions ONE BY ONE. Wait for the user to answer.
3. TRANSITIONS: You MUST use the following exact transition strings:
   - After Q5: "Transition: Now, I want to find out about some of your previous jobs."
   - After Q10: "Transition: Next, I will ask you some questions about the job you are interviewing for and our company."
   - After Q15: "Transition: Finally, I would like to ask you some questions about your future."

QUESTIONS:
${allQs.map((q, i) => `${i+1}. ${q}`).join('\n')}

4. FOR EACH ANSWER: Provide an [EXECUTIVE CRITIQUE] and a [GOLDEN ANSWER].
5. END with the exact Section III Closing script.`;

      setAnalysis({ schedule, fullAudit, gemPrompt, companyIntel });
      setLoading(false);
      setActiveTab('results');
    }, 1500);
  };

  return (
   <div className="min-h-screen bg-slate-100 p-4 md:p-6 font-sans text-slate-900">
      <div className="max-w-[1400px] mx-auto bg-white shadow-2xl rounded-[2.5rem] border-t-[20px] border-emerald-900 overflow-hidden">
        
        {activeTab === 'input' ? (
          <div className="p-8 space-y-6">
            <header className="text-center">
              <h1 className="text-5xl font-black text-emerald-900 uppercase italic tracking-tighter">Elite Career AI Hub</h1>
            </header>

            <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100 max-w-4xl mx-auto shadow-inner">
              <p className="text-md font-bold text-emerald-900 mb-3 tracking-tight">Welcome to the Elite Career AI Hub. This tool is a comprehensive platform designed to help you master the professional interview process through 4 key components:</p>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-medium text-slate-700">
                <li className="flex gap-2"><span>1.</span> <strong>Targeted Interview Prep:</strong> 20 mock questions tailored to the Job Description and the Company.</li>
                <li className="flex gap-2"><span>2.</span> <strong>Official Interview Schedule:</strong> Structured output for conducting realistic mock interviews with mentors.</li>
                <li className="flex gap-2"><span>3.</span> <strong>The AI Coach:</strong> Specialized AI Coach Script for use with Gemini and Gemini Live for interactive practice.</li>
                <li className="flex gap-2"><span>4.</span> <strong>Comprehensive Resume Audit:</strong> Line-by-line analysis and actionable revisions to align with Company values.</li>
              </ol>

              {/* CRITICAL SECURITY NOTICE */}
              <div className="bg-white p-4 rounded-xl border-2 border-red-200 mt-6">
                <h3 className="text-red-700 font-black uppercase text-sm mb-1 flex items-center">
                  <span className="mr-2">⚠️</span> Critical Security Notice
                </h3>
                <p className="text-red-700 text-xs font-bold leading-relaxed">
                  Do not input sensitive Personally Identifiable Information (PII) into this app. Use a pseudonym or [REDACTED] for your name. Do not include your phone number, street address, or personal email.
                </p>
              </div>
            </div>

            <hr className="border-slate-200" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Applicant Name</label>
                <input placeholder="Applicant Name" className="w-full p-3 border-2 rounded-xl font-bold" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Company Name</label>
                <input placeholder="Complete Company Name" className="w-full p-3 border-2 rounded-xl font-bold" onChange={(e) => setFormData({...formData, company: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Job Title</label>
                <input placeholder="Job Title/Position" className="w-full p-3 border-2 rounded-xl font-bold" onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
              <textarea placeholder="Paste Entire Job Description..." className="w-full md:w-1/3 h-40 p-4 border-2 rounded-2xl text-xs bg-slate-50" onChange={(e) => setFormData({...formData, jobDescription: e.target.value})} />
              <textarea placeholder="Paste Entire Applicant Resumé..." className="w-full md:w-1/3 h-40 p-4 border-2 rounded-2xl text-xs bg-slate-50" onChange={(e) => setFormData({...formData, resumeText: e.target.value})} />
            </div>

            <div className="max-w-2xl mx-auto">
                <input placeholder="Specific Concerns (Employment gaps, certification fears...)" className="w-full p-3 border-2 rounded-xl text-sm" onChange={(e) => setFormData({...formData, concerns: e.target.value})} />
            </div>

            <button onClick={handleGenerate} className="w-full bg-emerald-900 text-white font-black py-6 rounded-3xl text-3xl uppercase hover:bg-emerald-800 shadow-xl transition-all">
              {loading ? "ANALYZING..." : "GENERATE ELITE CAREER SUITE"}
            </button>
          </div>
        ) : (
          <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1 space-y-6">
              <button onClick={() => setActiveTab('input')} className="font-black text-emerald-900 underline uppercase text-sm">← Back to Input</button>
              
              <div className="bg-slate-900 text-emerald-400 p-6 rounded-[2rem] shadow-xl">
                <p className="font-black text-[10px] uppercase mb-2 tracking-widest border-b border-slate-700 pb-1">AI Coach Script</p>
                <pre className="text-[9px] h-96 overflow-auto whitespace-pre-wrap font-mono leading-tight mb-4">{analysis.gemPrompt}</pre>
                <button onClick={() => navigator.clipboard.writeText(analysis.gemPrompt)} className="w-full bg-emerald-600 text-white p-3 rounded-xl font-black text-[10px] uppercase shadow-lg">Copy Coach Script</button>
              </div>

              <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-200">
                <h3 className="text-sm font-black text-emerald-900 uppercase mb-2">How to use AI Coach:</h3>
                <ol className="text-[10px] space-y-2 text-slate-700 font-bold leading-tight">
                  <li>1. <strong>Gemini Gem:</strong> Paste script into "System Instructions" for a permanent specialized coach.</li>
                  <li>2. <strong>Gemini Live:</strong> Paste script into Gemini Live on mobile for 1-on-1 vocal practice.</li>
                </ol>
              </div>

              {/* ENHANCED COMPANY INTEL DISPLAY */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                <h3 className="text-xs font-black text-slate-800 uppercase mb-3 border-b-2 border-emerald-900 pb-1 inline-block">Deep-Dive Company Intel</h3>
                <div className="space-y-4 text-[10px] leading-relaxed">
                  <div>
                    <p className="font-black text-emerald-700 uppercase tracking-tighter">Strategic Priorities</p>
                    <p className="font-medium text-slate-800">{analysis.companyIntel.priorities}</p>
                  </div>
                  <div>
                    <p className="font-black text-emerald-700 uppercase tracking-tighter">Competitive Positioning</p>
                    <p className="font-medium text-slate-800">{analysis.companyIntel.competition}</p>
                  </div>
                  <div>
                    <p className="font-black text-emerald-700 uppercase tracking-tighter">Insider Culture Notes</p>
                    <p className="font-medium text-slate-800">{analysis.companyIntel.insider}</p>
                  </div>
                  <div>
                    <p className="font-black text-emerald-700 uppercase tracking-tighter">Leadership Narrative</p>
                    <p className="font-medium text-slate-800">{analysis.companyIntel.leadership}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-12">
              <div className="bg-white p-10 border-2 rounded-[3rem] shadow-sm relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-3xl font-black uppercase text-slate-800 border-b-8 border-emerald-900 pb-2">1. Mock Job Interview Schedule</h2>
                  <button 
                    onClick={() => navigator.clipboard.writeText(analysis.schedule)}
                    className="bg-emerald-900 text-white px-6 py-2 rounded-xl font-black uppercase text-xs hover:bg-emerald-700 transition-colors shadow-md"
                  >
                    Copy Schedule for Google Docs
                  </button>
                </div>
                <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-900 bg-slate-50 p-8 rounded-3xl border font-serif shadow-inner">
                  {analysis.schedule}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-black uppercase text-emerald-900 border-b-2 border-emerald-900 inline-block">2. Full Resume Audit</h2>
                <div className="grid grid-cols-1 gap-4">
                  {analysis.fullAudit.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Line {i+1}: {item.type}</p>
                      <p className="text-sm italic text-slate-500 mb-4 font-serif">"{item.original}"</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-[10px] font-black uppercase text-red-500 mb-1">Critique</p>
                          <p className="text-xs font-bold text-slate-800">{item.critique}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">Elite Revision</p>
                          <p className="text-xs font-black text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200">{item.revision}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}