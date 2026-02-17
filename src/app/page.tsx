'use client';

import React, { useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';

import {
  FaCamera,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaChartBar,
  FaServer,
  FaBolt,
  FaShieldAlt,
  FaRoute,
  FaRobot,
  FaTimes,
  FaBriefcase,
  FaGraduationCap,
} from 'react-icons/fa';

import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

import {
  SiPython,
  SiTensorflow,
  SiScikitlearn,
  SiKeras,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiAmazon,
  SiGooglecloud,
  SiDocker,
  SiGit,
  SiJupyter,
  SiTableau,
  SiOpencv,
  SiFastapi,
  SiHuggingface,
  SiStreamlit,
  SiR,
  SiMysql,
  SiOracle,
  SiApachespark,
  SiGithubactions,
  SiPlotly,
} from 'react-icons/si';

type TimelineItem = {
  type: 'education' | 'work';
  title: string;
  company: string;
  location: string;
  date: string;
  details: string[];
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  tags?: string[];
  impact?: string[];
  links?: { label: string; href: string }[];
  caseStudy?: {
    problem: string[];
    approach: string[];
    architecture: string[];
    metrics: string[];
    nextSteps: string[];
  };
};

const MONTHS: Record<string, number> = {
  Jan: 1,
  January: 1,
  Feb: 2,
  February: 2,
  Mar: 3,
  March: 3,
  Apr: 4,
  April: 4,
  May: 5,
  Jun: 6,
  June: 6,
  Jul: 7,
  July: 7,
  Aug: 8,
  August: 8,
  Sep: 9,
  Sept: 9,
  September: 9,
  Oct: 10,
  October: 10,
  Nov: 11,
  November: 11,
  Dec: 12,
  December: 12,
};

function parseDateToSortKey(dateStr: string): number {
  const cleaned = dateStr.replace(/&ndash;|–/g, '-').trim();
  const parts = cleaned.split('-').map((s) => s.trim());
  const target = parts.length > 1 ? parts[1] : parts[0];

  if (/present/i.test(target)) return 9999 * 100 + 12;

  const tokens = target.split(/\s+/).filter(Boolean);
  if (tokens.length === 1) {
    const y = Number(tokens[0]);
    return isNaN(y) ? 0 : y * 100 + 1;
  }

  const maybeMonth = tokens[0];
  const maybeYear = tokens[tokens.length - 1];
  const month = MONTHS[maybeMonth] ?? 1;
  const year = Number(maybeYear);
  if (isNaN(year)) return 0;
  return year * 100 + month;
}

/** Rotating role text under your name */
const roles = [
  'Production ML Systems',
  'Recommendation Engines',
  'NLP Classifiers',
  'Agentic AI Workflows',
];

function RotatingRole() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div className="mt-3 text-lg sm:text-xl font-semibold text-[var(--color-accent-1)]">
        {roles[0]}
      </div>
    );
  }

  return (
    <div className="mt-3 h-8 sm:h-9 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={roles[index]}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="text-lg sm:text-xl font-semibold text-[var(--color-accent-1)]"
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();

  // --- Subtle Hero Interactivity (tilt + float)
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotY = ((x - midX) / midX) * 6;
    const rotX = -((y - midY) / midY) * 6;

    rotateX.set(rotX);
    rotateY.set(rotY);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const projects: Project[] = useMemo(
    () => [
      {
        title: 'On-Platform Message Blocker (DistilBERT)',
        description:
          'Fine-tuned a DistilBERT classifier to detect off-platform contact-sharing intent (phone/email/social handles) in chat messages.',
        tech: ['DistilBERT', 'Transformers', 'FastAPI', 'Python'],
        tags: ['NLP', 'Trust & Safety', 'Production'],
        impact: ['Trained on 16K+ labeled messages', 'Designed to handle obfuscation + spacing patterns'],
        links: [
          { label: 'GitHub', href: 'https://github.com/ShivamJoshi89' },
        ],
        caseStudy: {
          problem: [
            'Users attempt to share contact info to move off-platform (phone/email/social handles).',
            'Patterns include Unicode tricks, spacing, slang, and partial cues.',
          ],
          approach: [
            'Trained a DistilBERT intent classifier on labeled chat data.',
            'Built API-first inference service (FastAPI) suitable for real-time moderation.',
            'Focused on robustness against obfuscation and short text.',
          ],
          architecture: [
            'Client chat → Backend moderation call → Model inference API → Allow/Block decision.',
            'Logged decisions for evaluation + future retraining.',
          ],
          metrics: [
            '16K+ labeled messages used for training.',
            'Tracked false positives/negatives and iterated thresholds.',
          ],
          nextSteps: [
            'Add hard-negative mining from production data.',
            'Introduce multilingual augmentation + adversarial examples.',
            'Add drift monitoring + periodic retraining.',
          ],
        },
      },
      {
        title: 'VinoSage: AI-Driven Wine Recommendation Chatbot',
        description:
          'Built a production-style chatbot combining ranking + retrieval + LLM responses for personalized wine recommendations.',
        tech: ['XGBoost', 'Elasticsearch', 'FAISS', 'RAG', 'DistilBERT', 'NER'],
        tags: ['RAG', 'Recsys', 'NLP'],
        impact: ['Hybrid retrieval (vector + keyword) improves relevance', 'Intent + NER drive structured conversation'],
        links: [
          { label: 'GitHub', href: 'https://github.com/ShivamJoshi89' },
        ],
        caseStudy: {
          problem: [
            'Users ask vague pairing questions; raw catalog search isn’t enough.',
            'Need consistent recommendations with explainability (why this wine).',
          ],
          approach: [
            'Hybrid retrieval: Elasticsearch + FAISS for semantic + lexical matching.',
            'RAG prompt construction using structured wine attributes + user context.',
            'Intent detection + NER to identify food, region, grape, sweetness preferences.',
          ],
          architecture: [
            'User query → NLU (intent/NER) → Hybrid retrieval → Rerank/filters → RAG response generator.',
            'Stored user context for personalization over time (optional).',
          ],
          metrics: [
            'Improved relevance qualitatively via hybrid retrieval vs single method.',
            'Reduced “generic” answers by grounding responses in retrieved entries.',
          ],
          nextSteps: [
            'Add offline eval set + ranking metrics (NDCG/MRR).',
            'Add user feedback loop for continual improvement.',
            'Add caching + latency tuning for production.',
          ],
        },
      },
      {
        title: 'Recommendation Engine (TF-IDF + Geo Filtering)',
        description:
          'Deployed a marketplace recommendation engine using TF-IDF similarity + Firestore filters + ZIP proximity ranking.',
        tech: ['TF-IDF', 'Firestore', 'geopy', 'Python'],
        tags: ['Recsys', 'Ranking', 'Data Quality'],
        impact: ['Reduced irrelevant matches by ~35% using proximity ranking', 'Offer tiering improved B2B decision clarity'],
        links: [
          { label: 'GitHub', href: 'https://github.com/ShivamJoshi89' },
        ],
        caseStudy: {
          problem: [
            'Users see too many irrelevant matches due to weak ranking and location mismatch.',
            'Needed a lightweight recommender compatible with existing infra.',
          ],
          approach: [
            'TF-IDF similarity over item text + Firestore filters for eligibility.',
            'ZIP proximity ranking with geopy to prioritize local matches.',
            'Offer categorization (price banding) for decision clarity.',
          ],
          architecture: [
            'Query → Candidate fetch (Firestore) → TF-IDF similarity → Geo rerank → Output tiers.',
          ],
          metrics: [
            'Reduced irrelevant matches by ~35% after proximity ranking integration.',
          ],
          nextSteps: [
            'Add learning-to-rank using implicit feedback.',
            'Add embeddings-based semantic match for longer text.',
          ],
        },
      },
      {
        title: 'AI Trip-Planner Agent',
        description:
          'Developed an autonomous travel-planning agent using tools + LLM orchestration to generate itineraries based on user constraints.',
        tech: ['OpenAI API', 'LangChain', 'Agentic AI', 'RAG', 'APIs'],
        tags: ['Agentic', 'Tools', 'Personalization'],
        impact: ['Dynamic prompts based on constraints', 'Tool-calling workflows for itinerary building'],
        links: [
          { label: 'GitHub', href: 'https://github.com/ShivamJoshi89' },
        ],
        caseStudy: {
          problem: [
            'Travel planning is constraint-heavy: budget, dates, style, pace, preferences.',
            'Users want a complete itinerary, not scattered suggestions.',
          ],
          approach: [
            'Agentic plan generation: gather constraints → propose itinerary → refine on feedback.',
            'Use tool outputs / retrieved context to ground suggestions.',
          ],
          architecture: [
            'User constraints → Planner agent → Tools/RAG → Draft itinerary → Feedback loop → Final plan.',
          ],
          metrics: [
            'Focused on usefulness + structure (day-by-day + time blocks).',
          ],
          nextSteps: [
            'Add structured output schema validation.',
            'Add itinerary export (PDF/calendar) + caching.',
          ],
        },
      },
    ],
    []
  );

  // Featured project (first one — you can change the index)
  const featured = projects[0];

  const timeline: TimelineItem[] = [
    {
      type: 'education',
      title: 'MS in Data Science',
      company: 'Pace University, Seidenberg School of Computer Science and Information',
      location: 'New York, NY',
      date: 'May 2025',
      details: ['GPA: 3.82/4.00'],
    },
    {
      type: 'education',
      title: 'Post Graduate Diploma in Predictive Analytics (PGDPA)',
      company: 'Mumbai University, BSE Institute Ltd',
      location: 'Mumbai, IN',
      date: 'Jun 2023',
      details: ['GPA: 4.00/4.00'],
    },
    {
      type: 'education',
      title: 'Bachelors in Commerce (Banking & Insurance)',
      company: 'Mumbai University, VES College Of Arts, Science & Commerce',
      location: 'Mumbai, IN',
      date: 'Jun 2021',
      details: ['GPA: 3.12/4.00'],
    },
    {
      type: 'work',
      title: 'Data Science Intern',
      company: '99 YARDS',
      location: 'New York, NY',
      date: 'Dec 2024 – Present',
      details: [
        'Developed and deployed a recommendation engine using TF-IDF, Firestore queries, and geolocation filtering; ensured data quality across multiple sources.',
        'Integrated geopy ZIP proximity ranking to prioritize recommendations, reducing irrelevant matches by 35%.',
        'Designed multi-tiered offer categorization logic using price banding to improve B2B decision-making clarity.',
        'Built an agentic AI-powered chatbot using OpenAI APIs for intelligent conversation flows and automated customer support.',
        'Designed and fine-tuned a DistilBERT-based message blocker to prevent contact-sharing attempts; trained on 16K+ labeled messages.',
      ],
    },
    {
      type: 'work',
      title: 'Data Science Intern',
      company: 'Scienox Technologies',
      location: 'Mumbai, IN',
      date: 'Jan 2023 – Feb 2023',
      details: [
        'Conducted time series analysis on 500,000+ stock market records using Pandas + Statsmodels; improved forecasting accuracy by 20%.',
        'Engineered features and applied regression/classification models to improve stability, increasing reliability by 18% in investment risk analysis.',
        'Experimented with RAG techniques to enrich forecasting models with external economic indicators for context-aware insights.',
      ],
    },
    {
      type: 'work',
      title: 'Data Analyst Intern',
      company: 'Pipara & Co. LLP',
      location: 'Mumbai, IN',
      date: 'Jan 2022 – Mar 2022',
      details: [
        'Optimized data management for annual revenues exceeding INR 5000 Cr by implementing an analytics framework under IBC 2016, reducing decision-making time by 15%.',
        'Identified compliance gaps and improved reporting workflows by 30%.',
      ],
    },
    {
      type: 'work',
      title: 'Data Analyst Intern',
      company: 'M/s Utangale & Co. Advocates & Solicitor',
      location: 'Mumbai, IN',
      date: 'Oct 2021 – Dec 2021',
      details: ['Analyzed and maintained financial records for 50+ clients; delivered actionable insights to improve client satisfaction.'],
    },
  ];

  const sortedTimeline = [...timeline].sort(
    (a, b) => parseDateToSortKey(b.date) - parseDateToSortKey(a.date)
  );

  // ---- Project modal state
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <main className="scroll-smooth min-h-screen bg-gradient-to-b from-[var(--color-background)] via-[var(--color-surface-2)] to-[var(--color-surface-3)] px-4 sm:px-12 md:px-24">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <motion.section
          id="hero"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-[calc(100vh-84px)] pt-8 md:pt-12 flex flex-col md:flex-row items-center gap-10"
        >
          <div className="flex-1 text-left pl-0 md:pl-6 lg:pl-12">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-[var(--color-text-1)] leading-tight tracking-tight font-sans">
              Shivam Joshi
            </h1>

            <RotatingRole />

            {/* quick “recruiter chips” */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                'Open to: Data Scientist / ML Engineer',
                'NYC / Anywhere USA / Remote',
                'Available: Immediate',
              ].map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-surface-1)] border border-[var(--color-border)] text-[var(--color-text-2)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-4 text-xl text-[var(--color-text-2)] max-w-xl">
              I&apos;m a Data Scientist focused on building production-ready ML systems—recommendation engines, NLP
              classifiers, and agentic AI workflows—end to end.
            </p>

            <p className="mt-2 text-md text-[var(--color-text-3)] max-w-xl">
              Experienced with Python, SQL, Spark, AWS/GCP, and MLOps tooling (Docker, GitHub Actions). Currently a Data
              Science Intern at 99 Yards.
            </p>

            {/* CTA row */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl font-semibold bg-[var(--color-accent-1)] text-[var(--color-text-dark)] hover:opacity-90 transition"
              >
                Download Resume
              </a>

              <a
                href="#projects"
                className="px-5 py-2.5 rounded-xl font-semibold border border-[var(--color-border)] text-[var(--color-text-1)] hover:border-[var(--color-accent-1)] transition"
              >
                View Projects
              </a>

              <a
                href="mailto:joshishivam047@gmail.com"
                className="px-5 py-2.5 rounded-xl font-semibold border border-[var(--color-border)] text-[var(--color-text-1)] hover:border-[var(--color-accent-1)] transition"
              >
                Contact
              </a>
            </div>

            {/* Proof / highlights */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
              {[
                ['16K+', 'Labeled messages'],
                ['35%', 'Less irrelevant matches'],
                ['500K+', 'Time-series records'],
                ['RAG', 'Search + LLM systems'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-xl p-3"
                >
                  <div className="text-xl font-extrabold text-[var(--color-text-1)]">{k}</div>
                  <div className="text-xs text-[var(--color-text-3)] mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="flex-1 flex justify-center">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="relative"
            >
              <motion.div
                aria-hidden
                className="absolute -inset-8 rounded-[2rem] blur-3xl opacity-25"
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [1, 1.06, 1], rotate: [0, 6, 0] }
                }
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(213,184,147,0.35), transparent 55%), radial-gradient(circle at 70% 60%, rgba(97,120,145,0.35), transparent 55%), radial-gradient(circle at 60% 20%, rgba(111,77,56,0.30), transparent 55%)',
                }}
              />

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
                style={{ transform: 'translateZ(20px)' }}
              >
                <Image
                  src="/Profile.jpeg"
                  alt="Shivam Joshi"
                  width={288}
                  height={288}
                  priority
                  sizes="(max-width: 768px) 220px, 288px"
                  className="
                    w-72 h-72
                    object-cover object-top
                    scale-90
                    rounded-3xl
                    shadow-md
                    cursor-pointer
                    transition-all duration-300
                    hover:shadow-xl
                  "
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ABOUT */}
        <motion.section
          id="about"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12"
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-[var(--color-text-1)] tracking-tight">
            About Me
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Professional Snapshot">
              I&apos;m <span className="font-semibold text-[var(--color-text-1)]">Shivam Joshi</span>, a Data Scientist who
              builds end-to-end ML products—data pipelines, modeling, evaluation, deployment, and iteration.
            </Card>
            <Card title="What I Build">
              Recommendation engines, NLP classifiers, and agentic assistants. I care about strong baselines, clean
              experimentation, and production constraints (latency, monitoring, and data quality).
            </Card>
            <Card title="Beyond Work">
              Outside work, I enjoy exploring new places, cars & bikes, and experimenting with new ideas. Curiosity keeps
              me learning fast and building better systems.
            </Card>
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          id="skills"
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-14"
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-[var(--color-text-1)] tracking-tight">
            Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard
              title="Programming & ML / NLP"
              subtitle="Modeling, NLP, training pipelines, and experimentation."
              icon={<FaCode />}
              skills={[
                [<SiPython key="python" />, 'Python'],
                [<SiR key="r" />, 'R'],
                [<SiNumpy key="numpy" />, 'NumPy'],
                [<SiPandas key="pandas" />, 'Pandas'],
                [<SiScikitlearn key="sklearn" />, 'Scikit-learn'],
                [<SiTensorflow key="tf" />, 'TensorFlow'],
                [<SiKeras key="keras" />, 'Keras'],
                [<SiHuggingface key="hf" />, 'Transformers'],
                [<SiOpencv key="opencv" />, 'OpenCV'],
                [<FaCamera key="yolov5" />, 'YOLOv5'],
              ]}
            />

            <SkillCard
              title="Big Data, Cloud & Databases"
              subtitle="Data pipelines, warehouses, scalable processing, and storage."
              icon={<FaDatabase />}
              skills={[
                [<SiApachespark key="spark" />, 'Apache Spark (PySpark)'],
                [<FaServer key="hadoop" />, 'Hadoop'],
                [<SiGooglecloud key="gcp" />, 'GCP'],
                [<SiAmazon key="aws" />, 'AWS (S3/EC2/Lambda)'],
                [<SiPostgresql key="postgres" />, 'PostgreSQL'],
                [<SiMysql key="mysql" />, 'MySQL'],
                [<SiOracle key="oracle" />, 'Oracle'],
                [<SiMongodb key="mongo" />, 'MongoDB'],
                [<SiFirebase key="firebase" />, 'Firebase'],
              ]}
            />

            <SkillCard
              title="Visualization & Tooling"
              subtitle="Dashboards, reporting, shipping APIs, CI/CD, and dev workflow."
              icon={<FaChartBar />}
              skills={[
                [<FaChartLine key="powerbi" />, 'Power BI'],
                [<SiTableau key="tableau" />, 'Tableau'],
                [<SiPlotly key="plotly" />, 'Plotly'],
                [<SiStreamlit key="streamlit" />, 'Streamlit'],
                [<SiDocker key="docker" />, 'Docker'],
                [<SiGit key="git" />, 'Git'],
                [<SiGithubactions key="gha" />, 'GitHub Actions'],
                [<SiJupyter key="jupyter" />, 'Jupyter'],
                [<SiFastapi key="fastapi" />, 'REST APIs (FastAPI)'],
              ]}
            />
          </div>
        </motion.section>

        {/* HOW I BUILD ML SYSTEMS (Pipeline) */}
        <motion.section
          id="pipeline"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-14"
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-[var(--color-text-1)] tracking-tight">
            How I Build ML Systems
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <PipelineStep
              icon={<FaBolt />}
              title="Data"
              points={['Validate sources', 'Handle missingness', 'Sanity checks']}
            />
            <PipelineStep
              icon={<FaCode />}
              title="Model"
              points={['Baselines first', 'Iterate + ablate', 'Hyperparam tuning']}
            />
            <PipelineStep
              icon={<FaChartLine />}
              title="Evaluate"
              points={['Confusion matrix', 'ROC/AUC', 'Error analysis']}
            />
            <PipelineStep
              icon={<FaServer />}
              title="Ship"
              points={['FastAPI services', 'Dockerized runtime', 'CI checks']}
            />
            <PipelineStep
              icon={<FaShieldAlt />}
              title="Monitor"
              points={['Drift signals', 'Feedback loop', 'Retrain schedule']}
            />
          </div>
        </motion.section>

{/* EXPERIENCE */}
<motion.section
  id="experience"
  initial={reduceMotion ? false : { opacity: 0 }}
  whileInView={reduceMotion ? undefined : { opacity: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
  className="mt-10 md:mt-14"
>
  <h2 className="text-4xl font-bold mb-4 text-center text-[var(--color-text-1)] tracking-tight">
    Experience &amp; Education
  </h2>

  {/* Legend */}
  <div className="flex items-center justify-center gap-5 mb-10">
    <div className="flex items-center gap-2 text-sm text-[var(--color-text-2)]">
      <span
        className="
          inline-flex items-center justify-center
          w-7 h-7 rounded-full
          bg-[var(--color-accent-2)]
          border-2 border-[var(--color-background)]
          shadow-md
        "
        aria-hidden
      >
        {/* Work icon */}
        <FaBriefcase className="text-[10px] text-[var(--color-foreground)]" />
      </span>
      Experience 
    </div>

    <div className="flex items-center gap-2 text-sm text-[var(--color-text-2)]">
      <span
        className="
          inline-flex items-center justify-center
          w-7 h-7 rounded-full
          bg-[var(--color-accent-1)]
          border-2 border-[var(--color-background)]
          shadow-md
        "
        aria-hidden
      >
        {/* Education icon */}
        <FaGraduationCap className="text-[10px] text-[var(--color-text-dark)]" />
      </span>
      Education 
    </div>
  </div>

  <div className="relative max-w-6xl mx-auto">
    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-border)]" />

    <div className="space-y-10">
      {sortedTimeline.map((item, idx) => {
        const isWork = item.type === 'work';

        const dotBg = isWork
          ? 'bg-[var(--color-accent-2)]' // coffee for work
          : 'bg-[var(--color-accent-1)]'; // tan for education

        const dotIcon = isWork ? (
          <FaBriefcase className="text-[10px] text-[var(--color-foreground)]" />
        ) : (
          <FaGraduationCap className="text-[10px] text-[var(--color-text-dark)]" />
        );

        return (
          <div
            key={`${item.type}-${idx}`}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-8 group"
          >
            {/* DOT (polished) */}
            <motion.div
              initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.25 }}
              className={`
                absolute left-1/2 top-6 z-10
                w-7 h-7
                -translate-x-1/2
                rounded-full
                border-2 border-[var(--color-background)]
                shadow-md
                flex items-center justify-center
                transition-all duration-300
                group-hover:scale-125
                group-hover:shadow-lg
                ${dotBg}
              `}
            >
              {dotIcon}
            </motion.div>

            {/* Left column (Education) */}
            <div className={`md:pr-10 ${isWork ? 'md:col-start-1 md:opacity-40' : 'md:col-start-1'}`}>
              {!isWork && <TimelineCard item={item} tone="education" />}
            </div>

            {/* Right column (Work) */}
            <div className={`md:pl-10 ${isWork ? 'md:col-start-2' : 'md:col-start-2 md:opacity-40'}`}>
              {isWork && <TimelineCard item={item} tone="work" />}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</motion.section>
        {/* PROJECTS */}
        <motion.section
          id="projects"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-14"
        >
          <h2 className="text-4xl font-bold mb-10 text-center text-[var(--color-text-1)] tracking-tight">
            Projects
          </h2>

          {/* Featured Project Banner */}
          <div className="mb-8">
            <FeaturedProject project={featured} onOpen={() => setSelected(featured)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="h-full">
                <ProjectCard {...project} onOpen={() => setSelected(project)} />
              </div>
            ))}
          </div>
        </motion.section>

        <Footer />
      </div>

      {/* Sticky Contact Pill */}
      <motion.a
        href="mailto:joshishivam047@gmail.com"
        className="
          fixed bottom-6 right-6 z-40
          px-4 py-3 rounded-full
          bg-[var(--color-accent-1)] text-[var(--color-text-dark)]
          font-semibold shadow-lg
          hover:opacity-90 transition
          flex items-center gap-2
        "
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <FaRobot /> Let’s talk
      </motion.a>

      {/* Project Case Study Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function FeaturedProject({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const icon =
    project.title.includes('Blocker') ? <FaShieldAlt /> :
    project.title.includes('Trip') ? <FaRoute /> :
    project.title.includes('Vino') ? <FaRobot /> :
    <FaBolt />;

  return (
    <div className="bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-2xl p-6 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="text-[var(--color-accent-1)] text-2xl mt-1">{icon}</div>
          <div>
            <div className="text-xs font-semibold text-[var(--color-text-3)]">FEATURED</div>
            <h3 className="text-2xl font-extrabold text-[var(--color-text-1)] mt-1">
              {project.title}
            </h3>
            <p className="text-[var(--color-text-2)] mt-2 max-w-2xl">
              {project.description}
            </p>
            {!!project.tags?.length && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-2)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onOpen}
          className="px-5 py-2.5 rounded-xl font-semibold bg-[var(--color-accent-1)] text-[var(--color-text-dark)] hover:opacity-90 transition w-fit"
        >
          Open Case Study →
        </button>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[color:rgba(0,0,0,0.55)] backdrop-blur-sm flex items-center justify-center p-4"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="
          w-full max-w-3xl
          bg-[var(--color-surface-1)]
          border border-[var(--color-border)]
          rounded-2xl shadow-xl
          p-6 md:p-8
          max-h-[85vh] overflow-y-auto
        "
        initial={reduceMotion ? false : { y: 18, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        exit={reduceMotion ? undefined : { y: 18, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold text-[var(--color-text-1)]">
              {project.title}
            </h3>
            <p className="text-[var(--color-text-2)] mt-2">{project.description}</p>

            {!!project.tags?.length && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-2)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-[var(--color-text-2)] hover:text-[var(--color-accent-1)] transition text-xl"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <CaseBlock title="Problem" items={project.caseStudy?.problem ?? []} />
          <CaseBlock title="Approach" items={project.caseStudy?.approach ?? []} />
          <CaseBlock title="Architecture" items={project.caseStudy?.architecture ?? []} />
          <CaseBlock title="Metrics" items={project.caseStudy?.metrics ?? []} />
        </div>

        <div className="mt-6">
          <CaseBlock title="Next Steps" items={project.caseStudy?.nextSteps ?? []} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!!project.links?.length &&
            project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl font-semibold border border-[var(--color-border)] text-[var(--color-text-1)] hover:border-[var(--color-accent-1)] transition"
              >
                {l.label} →
              </a>
            ))}

          <div className="ml-auto text-xs text-[var(--color-text-3)]">
            Tech: {project.tech.join(', ')}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CaseBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-[var(--color-surface-3)] border border-[var(--color-border)] rounded-xl p-4">
      <div className="text-sm font-extrabold text-[var(--color-text-1)]">{title}</div>
      <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-[var(--color-text-2)]">
        {items.length ? items.map((x) => <li key={x}>{x}</li>) : <li>—</li>}
      </ul>
    </div>
  );
}

function PipelineStep({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <div className="bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-2xl p-5 shadow-md hover:shadow-lg transition">
      <div className="flex items-center gap-2 text-[var(--color-accent-1)] text-lg">
        {icon}
        <div className="text-[var(--color-text-1)] font-extrabold">{title}</div>
      </div>
      <ul className="mt-3 text-sm text-[var(--color-text-2)] space-y-1 list-disc list-inside">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function TimelineCard({ item, tone }: { item: TimelineItem; tone: 'work' | 'education' }) {
  const badge =
    tone === 'work'
      ? 'bg-[var(--color-accent-2)] text-[var(--color-foreground)]'
      : 'bg-[var(--color-accent-1)] text-[#25344F]';

  return (
    <div className="bg-[var(--color-surface-1)] border border-[var(--color-border)] shadow-md rounded-xl p-6 transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-text-1)]">{item.title}</h3>
          <p className="mt-1 text-sm text-[var(--color-text-3)]">
            {item.company} &bull; {item.location}
          </p>
        </div>

        <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${badge}`}>
          {item.date}
        </span>
      </div>

      <ul className="mt-3 list-disc list-inside text-[var(--color-text-2)] space-y-1">
        {item.details.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[var(--color-surface-1)] border border-[var(--color-border)] shadow-md rounded-xl p-6 flex flex-col justify-between h-full transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
    <h3 className="text-2xl font-semibold mb-4 text-[var(--color-text-1)]">{title}</h3>
    <p className="text-justify text-[var(--color-text-2)] text-md leading-relaxed">{children}</p>
  </div>
);

const SkillCard = ({
  title,
  subtitle,
  icon,
  skills,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  skills: [React.ReactNode, string][];
}) => (
  <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] shadow-md rounded-xl p-6 h-full hover:shadow-xl hover:scale-105 cursor-pointer transition-transform">
    <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-1)] flex items-center gap-2">
      <span className="text-[var(--color-accent-1)]">{icon}</span> {title}
    </h3>
    <p className="text-sm text-[var(--color-text-3)] mb-4">{subtitle}</p>
    <div className="flex flex-wrap gap-3">
      {skills.map(([ic, label], i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3 py-2 rounded-full font-medium hover:scale-105 transition-transform text-[var(--color-text-2)]"
        >
          <span className="text-[var(--color-accent-1)]">{ic}</span>
          <span className="text-[var(--color-text-2)]">{label}</span>
        </div>
      ))}
    </div>
  </div>
);
