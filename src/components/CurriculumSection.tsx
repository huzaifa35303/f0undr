import { useState } from 'react';
import { BookOpen, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const CurriculumSection = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<'computing' | 'mental' | 'urdu'>('computing');

  const curricula = {
    computing: {
      title: 'f0undr Book: Computing & Technology',
      subtitle: 'Official Units 1–6 Interactive Master Curriculum',
      authors: 'f0undr (Muhammad Huzaifa Zahid) & Rai Abdur Rehman',
      url: 'https://f-e-book.vercel.app/',
      badge: 'FLAGSHIP CURRICULUM',
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
      title: 'The Art of Mental Mastery',
      subtitle: 'Accelerated Learning, Memory Palaces & Mind Reading',
      authors: 'Muhammad Huzaifa Zahid (f0undr)',
      url: 'https://fmm-e-book.vercel.app/',
      badge: 'COGNITIVE SCIENCE HANDBOOK',
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
      title: 'صحیفۂ اردو: نصاب و ادب (جماعت ہفتم)',
      subtitle: 'وفاقی تعلیمی بورڈ (FBISE) کے نصاب پر مبنی مستند ادبی پلیٹ فارم',
      authors: 'Muhammad Huzaifa Zahid & f0undr Team',
      url: 'https://f0undr.vercel.app/urdu-book/',
      badge: 'FBISE GRADE 7 OFFICIAL',
      units: [
        { num: 'باب 1', title: 'حمد باری تعالیٰ (حمد و ثنا)', desc: 'خالقِ کائنات کی عظمت اور معرفت کا شعری اور ادبی مطالعہ۔' },
        { num: 'باب 2', title: 'نعت رسولِ مقبول ﷺ', desc: 'حضور سرورِ کونین ﷺ کی سیرتِ طیبہ اور بارگاہِ رسالت میں گلہائے عقیدت۔' },
        { num: 'باب 3', title: 'طبِّ نبوی اور جدید حفظانِ صحت', desc: 'اسلامی تعلیمات اور جدید طبی سائنس کے مشترکہ اصولِ صحت۔' },
        { num: 'باب 4', title: 'بابائے اردو مولوی عبد الحق', desc: 'اردو زبان و ادب کی بقا کے لیے مولوی عبد الحق کی تاریخی خدمات۔' },
        { num: 'باب 5', title: 'کلامِ اقبال و فکرِ خودی', desc: 'حکیم الامت علامہ محمد اقبال کا فلسفۂ خودی اور پیغامِ عمل۔' },
        { num: 'باب 6', title: 'قواعد و انشا، فرہنگ و لغت', desc: 'فصیح اردو قواعد، تذکیر و تانیث، محاورات اور مستند فرہنگ۔' },
      ],
      takeaways: [
        'وفاقی تعلیمی بورڈ کے نصاب کے مطابق سلیس اور مستند تشریحات۔',
        'خودکار امتحانی جائزہ اور کثیر الانتخابی معروضی سوالات۔',
        'خوبصورت نفیس نستعلیق رسم الخط میں مکمل ڈیجیٹل درسی کتاب۔',
      ],
    },
  };

  const curr = curricula[selectedCurriculum];

  return (
    <section id="curriculum" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                COMPUTATIONAL LITERATURE &amp; PEDAGOGY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Interactive Curricula by <span className="text-white">f0undr</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Living, interactive web curricula engineered with instant auto-grading,
              architectural diagrams, and browser-autosaving lab workbooks.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <button
              onClick={() => {
                playClickSound();
                setSelectedCurriculum('computing');
              }}
              onMouseEnter={playHoverSound}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-normal transition-all cursor-pointer ${
                selectedCurriculum === 'computing'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Computing Series
            </button>
            <button
              onClick={() => {
                playClickSound();
                setSelectedCurriculum('mental');
              }}
              onMouseEnter={playHoverSound}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-normal transition-all cursor-pointer ${
                selectedCurriculum === 'mental'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mental Mastery
            </button>
            <button
              onClick={() => {
                playClickSound();
                setSelectedCurriculum('urdu');
              }}
              onMouseEnter={playHoverSound}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-normal transition-all cursor-pointer ${
                selectedCurriculum === 'urdu'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              صحیفۂ اردو
            </button>
          </div>
        </div>

        <div className="pro-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08] mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[10px] font-mono text-slate-300 border border-white/[0.08]">
                  {curr.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  By {curr.authors}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                {curr.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light">
                {curr.subtitle}
              </p>
            </div>

            <a
              href={curr.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl btn-primary-white text-xs tracking-tight transition-all cursor-pointer"
            >
              <span>Launch Live Reader</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {curr.units.map((unit, uIdx) => (
              <div
                key={uIdx}
                onMouseEnter={playHoverSound}
                className="pro-card rounded-2xl p-5"
              >
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                  {unit.num}
                </div>
                <h4 className="text-sm font-heading font-bold text-white mb-2">
                  {unit.title}
                </h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {unit.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Pedagogical Standards &amp; Architecture
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {curr.takeaways.map((takeaway, tIdx) => (
                <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed font-light">
                  <span className="text-slate-500">•</span>
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hairline-divider mt-24" />
    </section>
  );
};
