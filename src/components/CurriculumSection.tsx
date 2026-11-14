import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, GraduationCap, ShieldAlert } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const CurriculumSection = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<'computing' | 'mental' | 'urdu'>('computing');

  const curricula = {
    computing: {
      title: 'Computing & Technology Study Lab',
      subtitle: 'Independent Units 1–6 Digital Study Companion • All Curriculum Rights Reserved NBF',
      authors: 'National Book Foundation (Curriculum Owner) • Software by f0undr',
      url: 'https://f-e-book.vercel.app/',
      badge: 'INDEPENDENT STUDY LAB',
      units: [
        { num: 'Unit 1', title: 'ICT Fundamentals & Hardware IPO Cycle', desc: 'Decomposing computational machines through the unified Input-Process-Output-Storage model.' },
        { num: 'Unit 2', title: 'Digital Skills & Document Publishing', desc: 'Typography hierarchies, automated table of contents, and corporate publishing standards.' },
        { num: 'Unit 3', title: 'Algorithmic Thinking & Flowchart Logic', desc: 'Decomposition, pattern recognition, abstraction, trace tables, and standard flowchart symbols.' },
        { num: 'Unit 4', title: 'Programming & Visual Block Coding', desc: 'Variables, conditional branching logic, iteration loops, and event-driven architectures.' },
        { num: 'Unit 5', title: 'Digital Citizenship & Cyber Hygiene', desc: '2FA authentication, malware taxonomy, digital footprints, and cyber legislation (PECA).' },
        { num: 'Unit 6', title: 'Entrepreneurship in the Digital Age', desc: 'Lean Canvas mindset, rapid MVP prototyping, unit economics, and customer problem empathy.' },
      ],
      takeaways: [
        'Unifies hardware realities with algorithmic software engineering.',
        'Features interactive quizzes with live score badges and instant auto-grading.',
        'Includes browser-autosaving student lab workbooks for permanent retention.',
      ],
    },
    mental: {
      title: 'The Art of Mental Mastery Lab',
      subtitle: 'Accelerated Learning, Memory Palaces & Cognitive Diagnostics',
      authors: 'Muhammad Huzaifa Zahid (Founder)',
      url: 'https://fmm-e-book.vercel.app/',
      badge: 'COGNITIVE SCIENCE LAB',
      units: [
        { num: 'Unit 1', title: 'Accelerated Learning & Neuroplasticity', desc: 'Synaptic LTP mechanics, Feynman technique, and Ultralearning principles.' },
        { num: 'Unit 2', title: 'Memory Architecture & The Mind Palace', desc: 'Method of Loci spatial journeys and Person-Action-Object (PAO) encoding.' },
        { num: 'Unit 3', title: 'Non-Verbal Mind Reading & Body Language', desc: 'Paul Ekman 7 microexpressions and FBI limbic truth leakage.' },
        { num: 'Unit 4', title: 'Behavioral Profiling & Deception Detection', desc: 'Cognitive load weaponization, reverse-chronological interviews, and SCAN analysis.' },
        { num: 'Unit 5', title: 'Persuasion & Dark Psychology Defense', desc: 'Cialdini influence vectors, cognitive bias shields, and frame control.' },
        { num: 'Unit 6', title: 'Mental Models & Rapid Decisions', desc: 'First principles thinking, inversion heuristics, and second-order deduction.' },
      ],
      takeaways: [
        'Synthesizes frontier neuroscience and elite behavioral profiling.',
        'Includes 30 interactive multiple-choice diagnostic tests.',
        'Interactive 3D flashcard suites for permanent concept mastery.',
      ],
    },
    urdu: {
      title: 'صحیفۂ اردو: درسی معاون و ادبی پلیٹ فارم',
      subtitle: 'وفاقی تعلیمی بورڈ (FBISE) / این بی ایف کے نصاب پر مبنی آزاد ڈیجیٹل معاون پورٹل',
      authors: 'Curriculum Reference (FBISE / NBF) • Platform by f0undr',
      url: 'https://f0undrteam.site/urdu-book/',
      badge: 'INDEPENDENT STUDY AID',
      units: [
        { num: 'باب 1', title: 'حمد باری تعالیٰ (حمد و ثنا)', desc: 'خالقِ کائنات کی عظمت اور معرفت کا شعری اور ادبی مطالعہ۔' },
        { num: 'باب 2', title: 'نعت رسولِ مقبول ﷺ', desc: 'حضور سرورِ کونین ﷺ کی سیرتِ طیبہ اور بارگاہِ رسالت میں گلہائے عقیدت۔' },
        { num: 'باب 3', title: 'طبِّ نبوی اور جدید حفظانِ صحت', desc: 'اسلامی تعلیمات اور جدید طبی سائنس کے مشترکہ اصولِ صحت۔' },
        { num: 'باب 4', title: 'بابائے اردو مولوی عبد الحق', desc: 'اردو زبان و ادب کی بقا کے لیے مولوی عبد الحق کی تاریخی خدمات۔' },
        { num: 'باب 5', title: 'کلامِ اقبال و فکرِ خودی', desc: 'حکیم الامت علامہ محمد اقبال کا فلسفۂ خودی اور پیغامِ عمل۔' },
        { num: 'باب 6', title: 'قواعد و انشا، فرہنگ و لغت', desc: 'فصیح اردو قواعد، تذکیر و تانیث، محاورات اور مستند فرہنگ۔' },
      ],
      takeaways: [
        'جامع، سلیس اور مستند ادبی تشریحات و فرہنگ۔',
        'خودکار امتحانی جائزہ اور کثیر الانتخابی معروضی سوالات۔',
        'خوبصورت نفیس نستعلیق رسم الخط میں مکمل ڈیجیٹل معاون۔',
      ],
    },
  };

  const curr = curricula[selectedCurriculum];

  return (
    <section id="curriculum" className="py-24 relative overflow-hidden bg-[#0a0a0b] text-[#f4f1ea]">
      <div className="absolute top-1/2 left-1/4 w-[700px] h-[350px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start sm:items-center gap-3 text-xs text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="leading-relaxed">
            <strong className="text-white font-semibold">Sovereign Curriculum Notice:</strong> f0undr is an independent software engineering studio and does not author official curriculum textbooks. All computer science curriculum and textbook rights are strictly reserved to the <strong className="text-white">National Book Foundation (NBF)</strong>. We engineer interactive trace tables, algorithmic flowcharts, and browser-autosaving lab workbooks as an independent digital study aid.
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(244,241,234,0.14)] bg-[#111114] text-xs font-mono text-cyan-400">
                <GraduationCap className="w-3.5 h-3.5" />
                DIGITAL STUDY PLATFORMS &bull; NBF REFERENCE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#f4f1ea] tracking-[-0.04em]">
              Interactive <span className="text-cyan-300">Study Labs &amp; Tools</span>
            </h2>
            <p className="text-[#8d8b86] text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Independent digital study workbooks engineered by f0undr featuring algorithmic trace diagrams, interactive testing batteries, and browser-autosaving lab workbooks.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-full border border-[rgba(244,241,234,0.12)] bg-[#111114]">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedCurriculum('computing');
              }}
              onMouseEnter={playHoverSound}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-normal transition-all cursor-pointer ${
                selectedCurriculum === 'computing'
                  ? 'bg-[#f4f1ea] text-[#0a0a0b] shadow-sm'
                  : 'text-[#8d8b86] hover:text-[#f4f1ea]'
              }`}
            >
              Computing Lab
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedCurriculum('mental');
              }}
              onMouseEnter={playHoverSound}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-normal transition-all cursor-pointer ${
                selectedCurriculum === 'mental'
                  ? 'bg-[#f4f1ea] text-[#0a0a0b] shadow-sm'
                  : 'text-[#8d8b86] hover:text-[#f4f1ea]'
              }`}
            >
              Mental Mastery
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedCurriculum('urdu');
              }}
              onMouseEnter={playHoverSound}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-normal transition-all cursor-pointer ${
                selectedCurriculum === 'urdu'
                  ? 'bg-[#f4f1ea] text-[#0a0a0b] shadow-sm'
                  : 'text-[#8d8b86] hover:text-[#f4f1ea]'
              }`}
            >
              صحیفۂ اردو
            </button>
          </div>
        </div>

        <div className="rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-[#111114] border border-[rgba(244,241,234,0.12)] shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[rgba(244,241,234,0.08)] mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-mono border border-cyan-500/20 font-bold">
                  {curr.badge}
                </span>
                <span className="text-xs font-mono text-[#8d8b86]">
                  {curr.authors}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal text-[#f4f1ea] mb-2 tracking-[-0.03em]">
                {curr.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#8d8b86] font-light">
                {curr.subtitle}
              </p>
            </div>

            <a
              href={curr.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#f4f1ea] text-[#0a0a0b] text-xs font-semibold tracking-tight transition-all cursor-pointer group shadow-lg hover:bg-white"
            >
              <span>Launch Live Lab</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {curr.units.map((unit, uIdx) => (
              <div
                key={uIdx}
                onMouseEnter={playHoverSound}
                className="rounded-2xl p-5 bg-[#0a0a0b] border border-[rgba(244,241,234,0.08)] hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest mb-1.5">
                  {unit.num}
                </div>
                <h4 className="text-sm font-semibold text-[#f4f1ea] mb-2">
                  {unit.title}
                </h4>
                <p className="text-xs text-[#8d8b86] font-light leading-relaxed">
                  {unit.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.08)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#f4f1ea] mb-3 flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Pedagogical Standards &amp; Architecture
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {curr.takeaways.map((takeaway, tIdx) => (
                <div key={tIdx} className="flex items-start gap-2 text-xs text-[#8d8b86] leading-relaxed font-light">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
