'use client';

import { FaCamera, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import {
  SiPython, SiTensorflow, SiScikitlearn, SiKeras, SiNumpy, SiPandas, SiPostgresql,
  SiMongodb, SiFirebase, SiAmazon, SiGooglecloud, SiDocker, SiGit, SiJupyter,
  SiTableau, SiOpencv, SiFastapi, SiHuggingface, SiStreamlit
} from 'react-icons/si';
import { FaDatabase, FaChartBar, FaCode } from 'react-icons/fa';
import Image from 'next/image';

export default function Home() {

  const projects = [
    {
      title: 'VinoSage: AI-Driven Wine Recommendation',
      description:
        'AI chatbot powered by XGBoost, FAISS, and DistilBERT for personalized wine suggestions based on user taste and intent.',
      tech: ['XGBoost', 'FAISS', 'DistilBERT', 'Elasticsearch'],
      link: 'https://github.com/yourusername/vinosage',
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
        'Analyzed agri datasets and trained regression models. Achieved R² score of 0.83 using Decision Tree & Linear Regression.',
      tech: ['Seaborn', 'Pandas', 'Regression Models'],
    },
  ];

  const timeline = [
    {
      type: 'education',
      title: 'MS in Data Science',
      company: 'Pace University',
      location: 'New York, NY',
      date: 'May 2025',
      details: ['GPA: 3.80', 'Courses: ML, Big Data, Deep Learning, Data Engineering'],
    },
    {
      type: 'work',
      title: 'Data Science Intern',
      company: '99 Yards',
      location: 'New York, NY',
      date: 'Dec 2024 – Present',
      details: [
        'Built a personalized recommendation engine using TF-IDF, geolocation, and Firestore queries.',
        'Increased engagement by 20% and improved B2B targeting efficiency by 35%.',
      ],
    },
    {
      type: 'education',
      title: 'PG Diploma in Predictive Analytics',
      company: 'Mumbai University - BSE Institute',
      location: 'Mumbai, IN',
      date: 'Jun 2023',
      details: ['GPA: 4.00', 'Focus: Forecasting, Data Mining, Advanced Analytics'],
    },
    {
      type: 'work',
      title: 'Data Science Intern',
      company: 'Scienox Technologies',
      location: 'Mumbai, IN',
      date: 'Jan 2023 – Feb 2023',
      details: [
        'Time series analysis on 500K+ stock records to identify trends.',
        'Improved forecasting accuracy by 20% using Python + Statsmodels.',
      ],
    },
  ];

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
    I&apos;m a Data Scientist passionate about solving real-world problems through ML, NLP, and AI. I specialize in designing scalable data pipelines and deploying intelligent systems end-to-end.
    </p>
    <p className="mt-2 text-md text-gray-600 dark:text-gray-400 max-w-xl">
      Skilled in GCP, AWS, MLOps, and production-grade ML apps, always exploring the edge of tech with curiosity.
    </p>
  </div>
  <div className="flex-1 flex justify-center">
  <Image
  src="/profile.jpeg"
  alt="Shivam Joshi"
  width={288}
  height={288}
  className="w-72 h-72 object-cover rounded-3xl shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
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
  <h2 className="text-4xl font-bold mb-8 text-center text-black dark:text-white tracking-tight font-sans">About Me</h2>  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card title="Professional Snapshot">
      I'm <span className="font-semibold text-black dark:text-white">Shivam Joshi</span>, a Data Scientist passionate about building intelligent, scalable systems. I’ve developed recommender engines, forecasting pipelines, and NLP apps, taking them from notebooks to production.
    </Card>
    <Card title="The Future of AI">
      What excites me about AI is its potential to solve problems before we even know they exist. I'm focused on ethical, explainable AI and how MLOps + LLMs will drive the next wave of innovation.
    </Card>
    <Card title="Beyond Code">
      Outside work, I enjoy exploring new places, competitive gaming, and experimental cooking. Curiosity fuels both my code and creativity.
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
  className="mt-5 md:mt-10 flex flex-col justify-center"  // Reduced from pt-28 to pt-16
>
  <h2 className="text-4xl font-bold mb-8 text-center text-black dark:text-white tracking-tight font-sans">Skills</h2>  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <SkillCard title="Programming & ML" icon={<FaCode />} skills={[
      [<SiPython />, 'Python'],
      [<SiNumpy />, 'NumPy'],
      [<SiPandas />, 'Pandas'],
      [<SiScikitlearn />, 'Scikit-learn'],
      [<SiTensorflow />, 'TensorFlow'],
      [<SiKeras />, 'Keras'],
      [<SiOpencv />, 'OpenCV'],
      [<FaCamera />, 'YOLOv5'],
      [<SiHuggingface />, 'Hugging Face'],
    ]} />
    <SkillCard title="Databases & Cloud" icon={<FaDatabase />} skills={[
      [<SiPostgresql />, 'PostgreSQL'],
      [<SiMongodb />, 'MongoDB'],
      [<SiFirebase />, 'Firebase'],
      [<SiAmazon />, 'AWS'],
      [<SiGooglecloud />, 'GCP'],
      [<SiDocker />, 'Docker'],
      [<SiGit />, 'Git'],
      [<SiJupyter />, 'Jupyter'],
      [<SiFastapi />, 'FastAPI'],
    ]} />
    <SkillCard title="Visualization & Tools" icon={<FaChartBar />} skills={[
      [<SiTableau />, 'Tableau'],
      [<FaChartLine />, 'Power BI'],
      [<SiStreamlit />, 'Streamlit'],
      [<SiDocker />, 'Docker'],
      [<SiGit />, 'Git'],
      [<SiJupyter />, 'Jupyter'],
    ]} />
  </div>
</motion.section>

      {/* Experience Section */}
      <motion.section
  id="experience"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
  className="mt-5 md:mt-10 flex flex-col justify-center"
>
  <h2 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white tracking-tight">
    Experience & Education
  </h2>
  <div className="relative border-l border-gray-300 dark:border-gray-700 ml-4">
    {timeline.map((item, idx) => (
      <div key={idx} className="mb-12 ml-4">
        <div className="absolute -left-2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white dark:border-gray-800" />
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {item.company} • {item.location} • {item.date}
        </p>
        <ul className="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          {item.details.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</motion.section>


      {/* Projects Section */}
      <motion.section
  id="projects"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
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

// 💡 Reusable Card for About Section
const Card = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-[#edf8fa] dark:bg-[#1f2937] shadow-md rounded-xl p-6 flex flex-col justify-between h-full transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
    <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">{title}</h3>
    <p className="text-justify text-gray-800 dark:text-gray-300 text-md leading-relaxed">
      {children}
    </p>
  </div>
);

// 💡 Reusable Card for Skill Sections
const SkillCard = ({ title, icon, skills }: {
  title: string;
  icon: React.ReactNode;
  skills: [React.ReactNode, string][];
}) => (
  <div className="bg-[#c9d9dd] shadow-md rounded-xl p-6 h-full hover:shadow-xl hover:scale-105 cursor-pointer transition-transform">
    <h3 className="text-2xl font-semibold mb-4 text-black flex items-center gap-2">
      <span className="text-black">{icon}</span> {title}
    </h3>
    <div className="flex flex-wrap gap-3">
      {skills.map(([icon, label], i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded-full font-medium hover:scale-105 transition-transform text-black"
        >
          <span className="text-black">{icon}</span>
          <span className="text-black">{label}</span>
        </div>
      ))}
    </div>
  </div>
);
