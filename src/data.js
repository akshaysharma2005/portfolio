// All page content for M Akshay Sharma — Cricket Themed Portfolio
// Projects, milestones, and technical capabilities

export const personal = {
  name: 'M Akshay Sharma',
  firstName: 'Akshay',
  fullName: 'M Akshay Sharma',
  title: 'Data Analytics Engineer · Full-Stack Developer',
  email: 'akshaysharma200508@gmail.com',
  phone: '+91 6304698235',
  github: 'https://github.com/akshaysharma2005',
  linkedin: 'https://www.linkedin.com/in/akshaysharma',
  location: 'Amaravati, Andhra Pradesh, India',
  resume: '/M_Akshay_Sharma_Resume.pdf',
  cgpa: '8.32 / 10',
  college: 'VIT-AP University, Amaravati',
  specialization: 'B.Tech CSE (Data Analytics)'
};

export const featured = [
  {
    code: 'SND',
    name: 'SoundPulse',
    year: '2026',
    status: 'live',
    statusText: 'Live Project',
    tagline: 'High-throughput music streaming analytics & live SQL execution engine.',
    desc: 'An end-to-end music streaming analytics platform analyzing 8,000+ streaming events across 97 active users, 5,100+ songs, and 3,100+ artists. Designed to unlock listener retention trends, viral track momentum, and platform monetization patterns with high-precision database architecture.',
    stack: ['SQL', 'Python', 'Chart.js', 'HTML5', 'CSS3', 'Git', 'Render'],
    notes: [
      'Engineered 10+ complex analytical SQL queries using Window Functions (RANK, DENSE_RANK), CASE WHEN conditional logic, multi-table JOINs, and rolling aggregations.',
      'Developed an interactive analytics dashboard featuring real-time KPI metrics, listener engagement curves, and monetization cohort breakdowns.',
      'Built a live SQL query execution console allowing recruiters and data analysts to inspect and run database telemetry directly in the browser.'
    ],
    live: 'https://github.com/akshaysharma2005',
    repo: 'https://github.com/akshaysharma2005',
    shot: '/work/soundpulse.jpg'
  },
  {
    code: 'HDA',
    name: 'Healthcare Data Analysis',
    year: '2026',
    status: 'live',
    statusText: 'Analytical Study',
    tagline: 'Large-scale exploratory data analysis on the national HMIS dataset.',
    desc: 'Cleaned, wrangled, and transformed massive healthcare administration datasets using Python and Pandas. Extracted epidemiological indicators and clinical patterns to support data-driven healthcare policy and facility capacity planning.',
    stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Excel', 'Data Cleaning', 'EDA'],
    notes: [
      'Built automated data hygiene pipelines in Python to handle missing clinical values, normalize date ranges, and eliminate demographic data anomalies.',
      'Conducted extensive Exploratory Data Analysis (EDA) using Seaborn heatmaps and Matplotlib regression trends to isolate regional health disparities.',
      'Produced visual analytical reports that translate multi-dimensional raw indicators into clear executive decision dashboards.'
    ],
    live: 'https://github.com/akshaysharma2005',
    repo: 'https://github.com/akshaysharma2005',
    shot: '/work/healthcare.jpg'
  },
  {
    code: 'CPX',
    name: 'CricPulse Telemetry',
    year: '2026',
    status: 'live',
    statusText: 'Featured Demo',
    tagline: 'Ball-by-ball cricket analytics & predictive match momentum engine.',
    desc: 'An interactive cricket analytics platform inspired by modern IPL telemetry. Computes live wagon wheels, Manhattan run rate charts, player strike rate shifts, and pressure indexes using modern JavaScript and data visualization techniques.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js', 'AWS S3'],
    notes: [
      'Calculates real-time wagon wheel distribution, boundary percentages, and dot ball frequency across overs.',
      'MERN stack architecture with fast query indexing for ball-by-ball match state tracking.',
      'Integrated player head-to-head match-up matrix using MongoDB aggregation pipelines.'
    ],
    live: 'https://github.com/akshaysharma2005',
    repo: 'https://github.com/akshaysharma2005',
    shot: '/work/soundpulse.jpg'
  }
];

export const more = [
  {
    code: 'AWS',
    name: 'AWS Cloud Solutions Architecture',
    year: '2025–26',
    status: 'live',
    statusText: 'Certified',
    desc: 'Architected scalable multi-tier web applications leveraging AWS EC2 compute, S3 object storage, IAM role policies, VPC networking, and cloud security best practices.',
    stack: ['AWS EC2', 'AWS S3', 'IAM', 'VPC', 'Cloud Security'],
    live: '',
    repo: 'https://github.com/akshaysharma2005'
  },
  {
    code: 'MRN',
    name: 'MERN Full-Stack Application Portal',
    year: '2025',
    status: 'live',
    statusText: 'Live',
    desc: 'Developed a robust full-stack web application featuring secure JWT authentication, password hashing with bcrypt, RESTful API routing, and MongoDB document schemas.',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT'],
    live: '',
    repo: 'https://github.com/akshaysharma2005'
  },
  {
    code: 'SQL',
    name: 'Relational Database Performance Suite',
    year: '2025',
    status: 'classic',
    statusText: 'Engine',
    desc: 'Comprehensive SQL repository demonstrating B-Tree indexing, subquery refactoring, recursive CTEs, and schema normalization up to BCNF.',
    stack: ['PostgreSQL', 'MySQL', 'Query Optimization', 'Indexes'],
    live: '',
    repo: 'https://github.com/akshaysharma2005'
  },
  {
    code: 'EDA',
    name: 'Exploratory Statistical Modeling in R & Python',
    year: '2025',
    status: 'classic',
    statusText: 'Research',
    desc: 'Comparative study evaluating linear regression, hypothesis testing, and ANOVA variance analysis on real-world socio-economic distributions.',
    stack: ['R', 'Python', 'StatsModels', 'ggplot2', 'Scipy'],
    live: '',
    repo: 'https://github.com/akshaysharma2005'
  },
  {
    code: 'RST',
    name: 'Secure RESTful Microservices API',
    year: '2024–25',
    status: 'classic',
    statusText: 'Backend',
    desc: 'Modular Node.js and Java Express/REST service featuring rate-limiting, CORS handling, payload validation, and unit-tested endpoint suites.',
    stack: ['Java', 'Node.js', 'Express', 'Postman', 'Git'],
    live: '',
    repo: 'https://github.com/akshaysharma2005'
  }
];

// Cricket Wagon Wheel Milestones
// Each milestone corresponds to an iconic cricket shot and field sector on the wagon wheel!
export const milestones = [
  {
    angle: 315, // Cover Drive (Deep Extra Cover)
    distance: 0.88,
    shot: 'Cover Drive',
    sector: 'Deep Extra Cover',
    speed: '138 km/h',
    when: '2020',
    title: 'Ridge Public School — Class 10 (97%)',
    text: 'Class 10 Board examinations completed with an outstanding 97%. Built disciplined foundations in science, analytical reasoning, and mathematics.'
  },
  {
    angle: 345, // Straight Drive (Long Off)
    distance: 0.92,
    shot: 'Straight Drive',
    sector: 'Long Off',
    speed: '142 km/h',
    when: '2022',
    title: 'Sri Chaitanya Junior College — Class 12 (94.6%)',
    text: 'Secured 94.6% in Class 12 Intermediate. Deep focus on differential calculus, linear algebra, and physics, paving the path to computer science.'
  },
  {
    angle: 15, // On Drive (Long On)
    distance: 0.90,
    shot: 'On Drive',
    sector: 'Long On',
    speed: '140 km/h',
    when: '2022–Present',
    title: 'VIT-AP University — B.Tech CSE (Data Analytics)',
    text: 'Enrolled in Computer Science with specialization in Data Analytics. Maintained a Cumulative CGPA of 8.32/10 while engineering data pipelines.'
  },
  {
    angle: 45, // Mid-Wicket Pull
    distance: 0.85,
    shot: 'Mid-Wicket Pull',
    sector: 'Deep Mid-Wicket',
    speed: '145 km/h',
    when: '2023–24',
    title: 'Data Analytics & Python Core',
    text: 'Deep dive into Python, Pandas, Matplotlib, Seaborn, and R. Discovered the power of turning messy, unstructured datasets into predictive models.'
  },
  {
    angle: 80, // Square Cut (Deep Point)
    distance: 0.82,
    shot: 'Square Cut',
    sector: 'Deep Point',
    speed: '136 km/h',
    when: '2024',
    title: 'SQL Engineering & Database Architecture',
    text: 'Mastered SQL window functions, complex joins, aggregation pipelines, and NoSQL/MongoDB schema design for scalable applications.'
  },
  {
    angle: 135, // Sweep / Fine Leg (Fine Leg)
    distance: 0.78,
    shot: 'Fine Leg Flick',
    sector: 'Deep Fine Leg',
    speed: '132 km/h',
    when: '2025',
    title: 'AWS Academy Graduate Certifications',
    text: 'Earned AWS Academy Graduate accreditation in both Cloud Architecting and Cloud Foundations (EC2, S3, IAM, Cloud Concepts).'
  },
  {
    angle: 215, // Third Man Placement
    distance: 0.80,
    shot: 'Steered Past Third Man',
    sector: 'Third Man',
    speed: '135 km/h',
    when: '2025–26',
    title: 'SoundPulse & HMIS Analytics Shipped',
    text: 'Built and deployed SoundPulse analyzing 8,000+ events with live SQL execution, and the HMIS healthcare analysis pipeline.'
  },
  {
    angle: 270, // Slog Sweep / Lofted Pull (Deep Square Leg)
    distance: 0.95,
    shot: 'Lofted Maximum (88m)',
    sector: 'Deep Square Leg',
    speed: '146 km/h',
    when: '2026 & Beyond',
    title: 'Full-Stack MERN & Internship Season',
    text: 'Completed MERN Full Stack Development (FacePrep). Actively seeking Software Development & Data Science internship roles to create impact.'
  }
];

// Capabilities read as the 4 Core Disciplines of an Elite Cricketer & Developer
// part picks the 3D element and lighting focus
export const setup = [
  {
    part: 'analytics',
    label: 'Discipline 01 · The Strike Force',
    title: 'Data Analytics & ML',
    line: 'Finding precision lines and game-changing patterns in high-velocity data.',
    items: [
      ['Python & R', 'Exploratory Modeling'],
      ['Pandas & NumPy', 'Data Wrangling'],
      ['Matplotlib & Seaborn', 'Data Visualization'],
      ['EDA Methodologies', 'Trend Detection'],
      ['Statistical Hypothesis', 'Inference & Tests']
    ]
  },
  {
    part: 'database',
    label: 'Discipline 02 · The Pitch Craft',
    title: 'Databases & SQL',
    line: 'The rock-solid pitch foundation that sustains heavy innings.',
    items: [
      ['SQL (PostgreSQL / MySQL)', 'Relational Schemas'],
      ['Window Functions', 'Rank, Lead/Lag, Over'],
      ['Aggregations & Joins', 'Multi-table queries'],
      ['MongoDB & NoSQL', 'Document Stores'],
      ['Data Cleaning', 'ETL Pipelines']
    ]
  },
  {
    part: 'fullstack',
    label: 'Discipline 03 · The All-Rounder',
    title: 'Full-Stack Web Systems',
    line: 'Mastery across the front foot (UI) and back foot (Backend services).',
    items: [
      ['React.js', 'Interactive Interfaces'],
      ['Node.js & Express.js', 'RESTful Microservices'],
      ['JavaScript (ES6+) & Java', 'Application Logic'],
      ['HTML5 & Modern CSS3', 'Glassmorphism & UX'],
      ['JWT Authentication', 'Secure Sessions']
    ]
  },
  {
    part: 'cloud',
    label: 'Discipline 04 · Ground Deployment',
    title: 'Cloud & Infrastructure',
    line: 'High-availability stadium coverage and resilient deployments.',
    items: [
      ['AWS EC2 & S3', 'Compute & Cloud Storage'],
      ['AWS IAM & Security', 'Role-based Access'],
      ['Cloud Concepts', 'AWS Academy Graduate'],
      ['Git & Version Control', 'CI/CD Workflow'],
      ['Render & Cloud Hosting', 'Production Deploys']
    ]
  }
];
