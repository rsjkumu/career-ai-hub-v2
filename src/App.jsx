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

      // 1. Contextual Extraction (Used for Audit & Future Trends)
      const jdSentences = jd.split(/[.?!]/).map(s => s.trim()).filter(s => s.length > 30 && !s.includes('$'));
      const coreRequirements = jdSentences.slice(0, 10);

      // 2. Synthesize 20 Questions (TOPIC B REFINED TO BE CONVERSATIONAL)
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
        `In the context of being a ${formData.jobTitle}, how do you handle the pressure of maintaining quality care or service during a high-volume shift?`,
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

      // 3. The Schedule (Exact Transitions & Motivation Line)
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

      // 4. Full Line-by-Line Resume Audit (Maintained)
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

      // 5. Gem Coach Prompt (Mirrors Schedule Transitions)
      const allQs = [...qA, ...qB, ...qC, ...qD];
      const gemPrompt = `Act as an Executive Recruiter at ${formData.company}.
Conduct a mock interview for ${formData.name} for the ${formData.jobTitle} position.

STRICT INSTRUCTIONS:
1. START with the exact Opening Script from Section I-A.
2. QUESTIONING: You must ask the following 20 questions ONE BY ONE. Wait for the user to answer before moving to the next question.
3. TRANSITIONS: You MUST use the following exact transition strings:
   - After Q5: "Transition: Now, I want to find out about some of your previous jobs."
   - After Q10: "Transition: Next, I will ask you some questions about the job you are interviewing for and our company."
   - After Q15: "Transition: Finally, I would like to ask you some questions about your future."

QUESTIONS:
${allQs.map((q, i) => `${i+1}. ${q}`).join('\n')}

4. FOR EACH ANSWER: Provide an [EXECUTIVE CRITIQUE] and a [GOLDEN ANSWER] that shows 2026 industry mastery.
5. END with the exact Section III Closing script.`;

      setAnalysis({ schedule, fullAudit, gemPrompt });
      setLoading(false);
      setActiveTab('results');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-[1400px] mx-auto bg-white shadow-2xl rounded-[2.5rem] border-t-[20px] border-emerald-900 overflow-hidden">
        
        {activeTab === 'input' ? (
          <div className="p-12 space-y-10">
            <header className="border-b pb-6">
              <h1 className="text-5xl font-black text-emerald-900 uppercase italic tracking-tighter">Elite Career AI Hub</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Professional Curriculum Design Specialist</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Candidate Name</label>
                <input placeholder="Enter Name..." className="w-full p-5 border-2 rounded-2xl font-bold text-xl" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Target Company</label>
                <input placeholder="Enter Company..." className="w-full p-5 border-2 rounded-2xl font-bold text-xl" onChange={(e) => setFormData({...formData, company: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Target Position</label>
                <input placeholder="Enter Job Title..." className="w-full p-5 border-2 rounded-2xl font-bold text-xl" onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <textarea placeholder="Paste Entire Job Description..." className="h-80 p-6 border-2 rounded-3xl text-sm leading-relaxed bg-slate-50" onChange={(e) => setFormData({...formData, jobDescription: e.target.value})} />
              <textarea placeholder="Paste Entire Resume..." className="h-80 p-6 border-2 rounded-3xl text-sm leading-relaxed bg-slate-50" onChange={(e) => setFormData({...formData, resumeText: e.target.value})} />
            </div>

            <input placeholder="Specific Concerns (e.g., employment gaps, lack of specific certifications)" className="w-full p-5 border-2 rounded-2xl bg-white" onChange={(e) => setFormData({...formData, concerns: e.target.value})} />

            <button onClick={handleGenerate} className="w-full bg-emerald-900 text-white font-black py-10 rounded-3xl text-4xl uppercase hover:bg-emerald-800 transition-all shadow-xl">
              {loading ? "ANALYZING INDUSTRY DATA..." : "GENERATE ELITE CAREER SUITE"}
            </button>
          </div>
        ) : (
          <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1 space-y-6">
              <button onClick={() => setActiveTab('input')} className="font-black text-emerald-900 underline uppercase text-sm tracking-widest">← New Analysis</button>
              <div className="bg-slate-900 text-emerald-400 p-6 rounded-[2rem] shadow-lg">
                <p className="font-black text-[10px] uppercase mb-2 tracking-widest border-b border-slate-700 pb-1">AI Coach Script</p>
                <pre className="text-[9px] h-96 overflow-auto whitespace-pre-wrap font-mono leading-tight">{analysis.gemPrompt}</pre>
                <button onClick={() => navigator.clipboard.writeText(analysis.gemPrompt)} className="w-full mt-4 bg-emerald-600 text-white p-3 rounded-xl font-black text-[10px] uppercase">Copy Prompt for Practice</button>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-12">
              <div className="bg-white p-10 border-2 rounded-[3rem] shadow-sm">
                <h2 className="text-3xl font-black uppercase mb-6 text-slate-800 border-b-8 border-emerald-900 pb-2 inline-block">1. Interview Schedule</h2>
                <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-900 bg-slate-50 p-8 rounded-3xl border mb-6 font-serif">
                  {analysis.schedule}
                </div>
                <button onClick={() => navigator.clipboard.writeText(analysis.schedule)} className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-900 shadow-lg">Copy to Clipboard</button>
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
                          <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">Revision</p>
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