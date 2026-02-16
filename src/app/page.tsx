'use client';

import { FaCamera, FaChartLine, FaCode, FaDatabase, FaChartBar, FaServer } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import Image from 'next/image';

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
  date: string; // e.g., "May 2025" or "Dec 2024 – Present"
  details: string[];
};

// ---- Sorting helper: most-recent first (by year, then month if present)
const MONTHS: Record<string, number> = {
  Jan: 1, January: 1,
  Feb: 2, February: 2,
  Mar: 3, March: 3,
  Apr: 4, April: 4,
  May: 5,
  Jun: 6, June: 6,
  Jul: 7, July: 7,
  Aug: 8, August: 8,
  Sep: 9, Sept: 9, September: 9,
  Oct: 10, October: 10,
  Nov: 11, November: 11,
  Dec: 12, December: 12,
};

function parseDateToSortKey(dateStr: string): number {
  // Handles:
  // "May 2025"
  // "Dec 2024 – Present"
  // "Jan 2023 – Feb 2023"
  const cleaned = dateStr.replace(/&ndash;|–/g, '-').trim();

  // If range, sort primarily by END date (Present = far future), else by the single date
  const parts = cleaned.split('-').map((s) => s.trim());
  const target = parts.length > 1 ? parts[1] : parts[0];

  if (/present/i.test(target)) {
    return 9999 * 100 + 12;
  }

  // Try "Mon YYYY" or just "YYYY"
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

export default function Home() {
  const projects = [
    {
      title: 'VinoSage: AI-Driven Wine Recommendation',
      description:
        'AI chatbot powered by XGBoost, FAISS, and DistilBERT for personalized wine suggestions based on user taste and intent.',
      tech: ['XGBoost', 'FAISS', 'DistilBERT', 'Elasticsearch'],
      link: 'https://github.com/ShivamJoshi89/ai_wine_recommendor_chatbot',
    },
    {
      title: 'License Plate Detection',
      description:
        'YOLOv5-based detection system trained on 800+ annotated plates, optimized for real-time inference.',
      tech: ['YOLOv5', 'OpenCV', 'Python'],
    },
    {
      title: 'Fake News Detection',
      description:
        'Built a real-time classifier using NLP with CountVectorizer and PassiveAggressiveClassifier. Achieved 91% accuracy.',
      tech: ['Scikit-learn', 'NewsAPI', 'NLP'],
    },
    {
      title: 'Agricultural Yield Prediction',
      description:
        'Analyzed agri datasets and trained regression models. Achieved R&sup2; score of 0.83 using Decision Tree &amp; Linear Regression.',
      tech: ['Seaborn', 'Pandas', 'Regression Models'],
    },
  ];

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
        'Developed and deployed a data-driven recommendation engine using TF-IDF, Firestore queries, and geolocation filtering; ensured data quality across multiple sources.',
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

  const sortedTimeline = [...timeline].sort((a, b) => parseDateToSortKey(b.date) - parseDateToSortKey(a.date));

  return (
    <main className="scroll-smooth min-h-screen bg-gradient-to-b from-[#a4bcc2] via-[#e8f5e9] to-[#ffffff] dark:via-gray-900 dark:to-gray-900 px-4 sm:px-12 md:px-24 space-y-0">
      {/* Hero Section */}
      <motion.section
        id="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col md:flex-row items-center gap-10"
      >
        <div className="flex-1 text-left">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-black dark:text-white leading-tight tracking-tight font-sans">
            Shivam Joshi
          </h1>

          <p className="mt-4 text-xl text-gray-800 dark:text-gray-300 max-w-xl">
            I&apos;m a Data Scientist focused on building production-ready ML systems—recommendation engines, NLP classifiers, and agentic AI workflows—end to end.
          </p>
          <p className="mt-2 text-md text-gray-600 dark:text-gray-400 max-w-xl">
            Experienced with Python, SQL, Spark, AWS/GCP, and MLOps tooling (Docker, GitHub Actions). Currently a Data Science Intern at 99 Yards.
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/Profile.jpeg"
            alt="Shivam Joshi"
            width={288}
            height={288}
            priority
            sizes="(max-width: 768px) 220px, 288px"
            className="
              w-72 h-72
              object-cover
              object-top
              scale-90
              rounded-3xl
              shadow-md
              cursor-pointer
              transition-all
              duration-300
              hover:scale-95
              hover:shadow-xl
            "
          />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-5 md:mt-10 flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-black dark:text-white tracking-tight font-sans">
          About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Professional Snapshot">
            I&apos;m <span className="font-semibold text-black dark:text-white">Shivam Joshi</span>, a Data Scientist who builds end-to-end ML products—data pipelines, modeling, evaluation, deployment, and iteration.
          </Card>
          <Card title="What I Build">
            Recommendation engines, NLP classifiers, and agentic assistants. I care about strong baselines, clean experimentation, and production constraints (latency, monitoring, and data quality).
          </Card>
          <Card title="Beyond Work">
            Outside work, I enjoy exploring new places, cars & bikes, and experimenting with new ideas. Curiosity keeps me learning fast and building better systems.
          </Card>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-5 md:mt-10 flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-black dark:text-white tracking-tight font-sans">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCard
            title="Programming & ML / NLP"
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

      {/* Experience + Education Timeline (Education left, Work right, sorted) */}
      <motion.section
        id="experience"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-5 md:mt-10 flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white tracking-tight">
          Experience &amp; Education
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-300 dark:bg-gray-700" />

          <div className="space-y-10">
            {sortedTimeline.map((item, idx) => {
              const isWork = item.type === 'work';

              return (
                <div key={`${item.type}-${idx}`} className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Dot */}
                  <div className="absolute left-1/2 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-blue-600 border-2 border-white dark:border-gray-900" />

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

          {/* Mobile legend (optional) */}
          <div className="mt-10 flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-300 md:hidden">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-blue-600" /> Work</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-gray-500" /> Education</span>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-5 md:mt-10"
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="h-full">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}

function TimelineCard({ item, tone }: { item: TimelineItem; tone: 'work' | 'education' }) {
  const badge =
    tone === 'work'
      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100'
      : 'bg-gray-100 text-gray-900 dark:bg-gray-800/60 dark:text-gray-100';

  return (
    <div className="bg-[#edf8fa] dark:bg-[#1f2937] shadow-md rounded-xl p-6 transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-black dark:text-white">{item.title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {item.company} &bull; {item.location}
          </p>
        </div>

        <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${badge}`}>
          {item.date}
        </span>
      </div>

      <ul className="mt-3 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
        {item.details.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

// Reusable Card for About Section
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[#edf8fa] dark:bg-[#1f2937] shadow-md rounded-xl p-6 flex flex-col justify-between h-full transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
    <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">{title}</h3>
    <p className="text-justify text-gray-800 dark:text-gray-300 text-md leading-relaxed">{children}</p>
  </div>
);

// Reusable Card for Skill Sections
const SkillCard = ({
  title,
  icon,
  skills,
}: {
  title: string;
  icon: React.ReactNode;
  skills: [React.ReactNode, string][];
}) => (
  <div className="bg-[#c9d9dd] shadow-md rounded-xl p-6 h-full hover:shadow-xl hover:scale-105 cursor-pointer transition-transform">
    <h3 className="text-2xl font-semibold mb-4 text-black flex items-center gap-2">
      <span className="text-black">{icon}</span> {title}
    </h3>
    <div className="flex flex-wrap gap-3">
      {skills.map(([ic, label], i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded-full font-medium hover:scale-105 transition-transform text-black"
        >
          <span className="text-black">{ic}</span>
          <span className="text-black">{label}</span>
        </div>
      ))}
    </div>
  </div>
);
