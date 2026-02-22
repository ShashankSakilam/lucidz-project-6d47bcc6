import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Award, Code, Briefcase, GraduationCap, ChevronDown, Star, Sun, Moon } from 'lucide-react';

// Types
interface Skill {
  name: string;
  category: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  icon: string;
}

// Scroll Animation Hook
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Skill Card Component
function SkillCard({ skill, isDark }: { skill: Skill; isDark: boolean }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
        isDark
          ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]'
          : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]'
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{
        transitionDelay: isVisible ? '0ms' : '0ms',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-lg font-bold font-rajdhani ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>{skill.name}</h3>
        <Code className="w-5 h-5 text-orange-500" />
      </div>
      <p className={`text-sm mb-3 ${
        isDark ? 'text-zinc-400' : 'text-gray-600'
      }`}>{skill.category}</p>
      <div className={`w-full rounded-full h-2 ${
        isDark ? 'bg-zinc-700' : 'bg-gray-300'
      }`}>
        <div
          className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, isDark }: { project: Project; isDark: boolean }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`group rounded-xl overflow-hidden border transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]'
          : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]'
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {project.image && (
        <div className={`relative h-48 overflow-hidden ${
          isDark ? 'bg-zinc-800' : 'bg-gray-200'
        }`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isDark
              ? 'bg-gradient-to-t from-zinc-900 to-transparent'
              : 'bg-gradient-to-t from-white to-transparent'
          }`} />
        </div>
      )}
      <div className="p-6">
        <h3 className={`text-2xl font-bold mb-2 font-orbitron ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>{project.title}</h3>
        <p className={`mb-4 text-sm leading-relaxed ${
          isDark ? 'text-zinc-300' : 'text-gray-700'
        }`}>{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 text-xs rounded-full border font-rajdhani ${
                isDark
                  ? 'bg-orange-500/20 text-orange-400 border-orange-500/50'
                  : 'bg-orange-100 text-orange-700 border-orange-300'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 text-sm font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              View
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-semibold ${
                isDark
                  ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
              }`}
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Timeline Item Component
function TimelineItem({ experience, index, isDark }: { experience: Experience; index: number; isDark: boolean }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`relative pl-8 pb-8 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      } transition-all duration-500`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
      }}
    >
      <div className={`absolute left-0 top-0 w-4 h-4 rounded-full border-4 shadow-[0_0_15px_rgba(249,115,22,0.8)] bg-orange-500 ${
        isDark ? 'border-zinc-950' : 'border-white'
      }`} />
      {index < 3 && (
        <div className="absolute left-1.5 top-4 w-1 h-12 bg-gradient-to-b from-orange-500 to-transparent" />
      )}
      <div className={`p-6 rounded-lg border transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]'
          : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]'
      }`}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className={`text-xl font-bold font-orbitron ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{experience.title}</h3>
            <p className="text-orange-400 font-rajdhani font-semibold">{experience.company}</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full ${
            isDark
              ? 'text-zinc-400 bg-zinc-800'
              : 'text-gray-600 bg-gray-200'
          }`}>{experience.period}</span>
        </div>
        <p className={`mb-3 text-sm ${
          isDark ? 'text-zinc-300' : 'text-gray-700'
        }`}>{experience.description}</p>
        <ul className="space-y-1">
          {experience.highlights.map((highlight, idx) => (
            <li key={idx} className={`text-sm flex items-start gap-2 ${
              isDark ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              <span className="text-amber-500 mt-1">▸</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Achievement Badge Component
function AchievementBadge({ achievement, isDark }: { achievement: Achievement; isDark: boolean }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center p-6 rounded-lg border transition-all duration-300 transform hover:scale-105 ${
        isDark
          ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-amber-500 hover:shadow-[0_0_20px_rgba(217,119,6,0.6)]'
          : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-amber-500 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]'
      } ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(217,119,6,0.8)]">
        <Award className="w-6 h-6 text-white" />
      </div>
      <h3 className={`text-sm font-bold mb-1 font-rajdhani ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>{achievement.title}</h3>
      <p className={`text-xs mb-2 ${
        isDark ? 'text-zinc-400' : 'text-gray-600'
      }`}>{achievement.issuer}</p>
      <p className="text-xs text-amber-400 font-semibold">{achievement.date}</p>
    </div>
  );
}

// Hero Section
function Hero({ isDark }: { isDark: boolean }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-20 ${
        isDark
          ? 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950'
          : 'bg-gradient-to-b from-white via-gray-50 to-white'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          isDark ? 'bg-orange-500/10' : 'bg-orange-500/5'
        }`} />
        <div className={`absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          isDark ? 'bg-amber-500/10' : 'bg-amber-500/5'
        }`} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text and Buttons */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div
              className={`mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <h1
                className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-orbitron ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                style={{
                  textShadow: isDark ? '0 0 30px rgba(249,115,22,0.6)' : '0 0 15px rgba(249,115,22,0.3)',
                }}
              >
                Shashank Sakilam
              </h1>
            </div>
            <p
              className={`text-2xl md:text-3xl text-orange-400 mb-6 font-rajdhani font-semibold transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Founder@Lucidz
            </p>
            <p
              className={`text-lg mb-8 leading-relaxed transition-all duration-700 delay-300 ${
                isDark ? 'text-zinc-300' : 'text-gray-700'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Crafting elegant solutions to complex problems. Passionate about building scalable applications and pushing the boundaries of web technology.
            </p>
            <div
              className={`flex gap-4 flex-wrap transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-105 font-rajdhani"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className={`px-8 py-3 border-2 border-orange-500 font-bold rounded-lg transition-all duration-300 hover:scale-105 font-rajdhani ${
                  isDark
                    ? 'text-orange-400 hover:bg-orange-500/10'
                    : 'text-orange-600 hover:bg-orange-100'
                }`}
              >
                View My Work
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className={`flex justify-center items-center transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className={`relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-4 ${
              isDark
                ? 'border-orange-500/50 shadow-[0_0_40px_rgba(249,115,22,0.8)]'
                : 'border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.4)]'
            }`}>
              <img
                src="https://hionydjpudzafhxjvfsb.supabase.co/storage/v1/object/public/project-assets/assets/93fbf3bf-3485-472a-a315-18f71fd12b0f_ChatGPT%20Image%20Feb%2016,%202026,%2007_36_16%20PM.png"
                alt="Shashank Sakilam"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 ${
                isDark ? 'bg-orange-500' : 'bg-orange-400'
              }`} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`flex justify-center mt-16 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Prologue Section
function Prologue({ isDark }: { isDark: boolean }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} className={`py-20 px-4 ${
      isDark ? 'bg-zinc-950' : 'bg-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-5xl font-bold mb-12 text-center font-orbitron ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="text-orange-500">Prologue</span> - The Story
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            className={`p-8 rounded-lg border transition-all duration-500 ${
              isDark
                ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700'
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
            } ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-4 font-rajdhani ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>About Me</h3>
            <p className={`leading-relaxed mb-4 ${
              isDark ? 'text-zinc-300' : 'text-gray-700'
            }`}>
              I'm a passionate full-stack developer with a deep love for creating beautiful, functional web applications. With expertise in modern JavaScript frameworks and cloud technologies, I transform ideas into reality.
            </p>
            <p className={`leading-relaxed ${
              isDark ? 'text-zinc-300' : 'text-gray-700'
            }`}>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
          <div
            className={`p-8 rounded-lg border transition-all duration-500 delay-100 ${
              isDark
                ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700'
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
            } ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-4 font-rajdhani flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <GraduationCap className="w-6 h-6 text-orange-500" />
              Education
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-orange-400 font-semibold font-rajdhani">Bachelor of Technology in Computer Science</p>
                <p className={`text-sm ${
                  isDark ? 'text-zinc-400' : 'text-gray-600'
                }`}>Jawaharlal Nehru Technological University, Hyderabad</p>
                <p className={`text-xs ${
                  isDark ? 'text-zinc-500' : 'text-gray-500'
                }`}>2020 - 2024</p>
              </div>
              <div>
                <p className="text-amber-400 font-semibold font-rajdhani">Full Stack Web Development Certification</p>
                <p className={`text-sm ${
                  isDark ? 'text-zinc-400' : 'text-gray-600'
                }`}>Udemy & Coursera</p>
                <p className={`text-xs ${
                  isDark ? 'text-zinc-500' : 'text-gray-500'
                }`}>2022 - 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Arsenal Section (Skills)
function Arsenal({ isDark }: { isDark: boolean }) {
  const skills: Skill[] = [
    { name: 'React', category: 'Frontend', level: 95 },
    { name: 'TypeScript', category: 'Language', level: 90 },
    { name: 'Node.js', category: 'Backend', level: 88 },
    { name: 'Python', category: 'Language', level: 85 },
    { name: 'Tailwind CSS', category: 'Styling', level: 92 },
    { name: 'PostgreSQL', category: 'Database', level: 87 },
    { name: 'AWS', category: 'Cloud', level: 80 },
    { name: 'Docker', category: 'DevOps', level: 82 },
    { name: 'GraphQL', category: 'API', level: 85 },
    { name: 'Next.js', category: 'Framework', level: 88 },
    { name: 'MongoDB', category: 'Database', level: 83 },
    { name: 'Git', category: 'Tools', level: 93 },
  ];

  return (
    <section className={`py-20 px-4 ${
      isDark
        ? 'bg-gradient-to-b from-zinc-950 to-zinc-900'
        : 'bg-gradient-to-b from-white to-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-5xl font-bold mb-12 text-center font-orbitron ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="text-orange-500">Arsenal</span> - My Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <SkillCard key={idx} skill={skill} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Forge Section (Projects)
function Forge({ isDark }: { isDark: boolean }) {
  const projects: Project[] = [
    {
      title: 'AI-Powered Task Manager',
      description: 'A smart task management application with AI-driven priority suggestions and natural language processing for task creation.',
      technologies: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'PostgreSQL'],
      link: '#',
      github: '#',
      image: 'https://placehold.co/600x400?text=Task+Manager',
    },
    {
      title: 'Real-time Collaboration Platform',
      description: 'A web-based platform enabling teams to collaborate in real-time with live code editing, video conferencing, and instant messaging.',
      technologies: ['React', 'WebSocket', 'Node.js', 'MongoDB', 'AWS'],
      link: '#',
      github: '#',
      image: 'https://placehold.co/600x400?text=Collaboration',
    },
    {
      title: 'E-Commerce Analytics Dashboard',
      description: 'Comprehensive analytics dashboard for e-commerce businesses with real-time metrics, sales forecasting, and customer insights.',
      technologies: ['Next.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Chart.js'],
      link: '#',
      github: '#',
      image: 'https://placehold.co/600x400?text=Analytics',
    },
  ];

  return (
    <section id="projects" className={`py-20 px-4 ${
      isDark ? 'bg-zinc-950' : 'bg-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-5xl font-bold mb-12 text-center font-orbitron ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="text-orange-500">Forge</span> - Featured Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Battlefield Section (Experience)
function Battlefield({ isDark }: { isDark: boolean }) {
  const experiences: Experience[] = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: '2023 - Present',
      description: 'Leading the development of scalable web applications and mentoring junior developers.',
      highlights: [
        'Architected microservices infrastructure reducing latency by 40%',
        'Led team of 5 developers in delivering 3 major projects',
        'Implemented CI/CD pipelines improving deployment efficiency',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      period: '2022 - 2023',
      description: 'Developed and maintained multiple client-facing web applications.',
      highlights: [
        'Built 8+ production applications using React and Node.js',
        'Optimized database queries improving performance by 35%',
        'Collaborated with UX team to implement responsive designs',
      ],
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Hub',
      period: '2021 - 2022',
      description: 'Contributed to various projects while learning modern web development practices.',
      highlights: [
        'Developed frontend components using React and Tailwind CSS',
        'Fixed 50+ bugs and implemented feature requests',
        'Participated in code reviews and team knowledge sharing',
      ],
    },
  ];

  return (
    <section className={`py-20 px-4 ${
      isDark
        ? 'bg-gradient-to-b from-zinc-900 to-zinc-950'
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-5xl font-bold mb-12 text-center font-orbitron ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="text-orange-500">Battlefield</span> - Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <TimelineItem key={idx} experience={exp} index={idx} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Trophies Section (Achievements)
function Trophies({ isDark }: { isDark: boolean }) {
  const achievements: Achievement[] = [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      icon: 'award',
    },
    {
      title: 'React Advanced Certification',
      issuer: 'Udemy',
      date: '2022',
      icon: 'award',
    },
    {
      title: 'Open Source Contributor',
      issuer: 'GitHub',
      date: '2023',
      icon: 'award',
    },
    {
      title: 'Tech Speaker - Web Dev Conference',
      issuer: 'DevCon 2023',
      date: '2023',
      icon: 'award',
    },
    {
      title: 'Hackathon Winner',
      issuer: 'TechFest 2022',
      date: '2022',
      icon: 'award',
    },
    {
      title: 'Employee of the Year',
      issuer: 'Tech Innovations Inc.',
      date: '2023',
      icon: 'award',
    },
  ];

  return (
    <section className={`py-20 px-4 ${
      isDark ? 'bg-zinc-950' : 'bg-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-5xl font-bold mb-12 text-center font-orbitron ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="text-amber-500">Trophies</span> - Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, idx) => (
            <AchievementBadge key={idx} achievement={achievement} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Epilogue Section (Contact)
function Epilogue({ isDark }: { isDark: boolean }) {
  return (
    <section id="contact" className={`py-20 px-4 relative overflow-hidden ${
      isDark
        ? 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950'
        : 'bg-gradient-to-b from-white via-gray-50 to-white'
    }`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          isDark ? 'bg-orange-500/5' : 'bg-orange-500/3'
        }`} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className={`text-5xl font-bold mb-6 font-orbitron ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="text-orange-500">Epilogue</span> - Let's Connect
        </h2>
        <p className={`text-xl mb-12 max-w-2xl mx-auto ${
          isDark ? 'text-zinc-300' : 'text-gray-700'
        }`}>
          I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
        </p>
        <div className="flex gap-6 justify-center flex-wrap mb-12">
          <a
            href="mailto:shashank@example.com"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            Email Me
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition-all duration-300 hover:scale-105 border ${
              isDark
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 hover:border-orange-500'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900 border-gray-300 hover:border-orange-500'
            }`}
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition-all duration-300 hover:scale-105 border ${
              isDark
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 hover:border-orange-500'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900 border-gray-300 hover:border-orange-500'
            }`}
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
        </div>
        <div className={`border-t pt-8 ${
          isDark ? 'border-zinc-700' : 'border-gray-300'
        }`}>
          <p className={`text-sm ${
            isDark ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            © 2024 Shashank Sakilam. All rights reserved. | Crafted with <span className="text-orange-500">❤</span> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}

// Theme Toggle Button
function ThemeToggle({ isDark, setIsDark }: { isDark: boolean; setIsDark: (value: boolean) => void }) {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
        isDark
          ? 'bg-zinc-800 hover:bg-zinc-700 text-yellow-400 border border-zinc-700'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-300'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-6 h-6" />
      ) : (
        <Moon className="w-6 h-6" />
      )}
    </button>
  );
}

// Main App Component
export default function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-zinc-950 text-white' : 'bg-white text-gray-900'
    }`}>
      <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
      <Hero isDark={isDark} />
      <Prologue isDark={isDark} />
      <Arsenal isDark={isDark} />
      <Forge isDark={isDark} />
      <Battlefield isDark={isDark} />
      <Trophies isDark={isDark} />
      <Epilogue isDark={isDark} />
    </div>
  );
}