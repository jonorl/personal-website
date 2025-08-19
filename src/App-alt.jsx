import  { useState, useEffect } from 'react';
import {  Mail, ExternalLink, ChevronDown, Moon, Sun } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const PersonalWebsite = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState({});
  
  const fullText = "Full Stack Developer";
  
  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack application with React, Node.js, and PostgreSQL. Features user authentication, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "#",
      demo: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["React", "Express", "Socket.io", "MongoDB"],
      github: "#",
      demo: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather application with location-based forecasts, historical data visualization, and responsive design.",
      tech: ["React", "API Integration", "Chart.js", "Tailwind"],
      github: "#",
      demo: "#"
    }
  ];

  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "Tailwind CSS", level: 88 },
    { name: "Express.js", level: 82 }
  ];

  const FloatingIcon = ({ children, delay = 0 }) => (
    <div 
      className={`absolute animate-bounce transition-all duration-1000 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s'
      }}
    >
      {children}
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 max-w-screen z-50 backdrop-blur-md transition-all duration-300 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Your Name
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all hover:scale-110 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}></div>
          <FloatingIcon delay={0}>
            <div className="top-20 left-10 text-4xl opacity-20">⚛️</div>
          </FloatingIcon>
          <FloatingIcon delay={1}>
            <div className="top-40 right-20 text-3xl opacity-20">🚀</div>
          </FloatingIcon>
          <FloatingIcon delay={2}>
            <div className="bottom-40 left-20 text-3xl opacity-20">💻</div>
          </FloatingIcon>
          <FloatingIcon delay={0.5}>
            <div className="bottom-20 right-10 text-4xl opacity-20">⭐</div>
          </FloatingIcon>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Hello, I'm [Your Name]
          </h1>
          <div className="text-2xl md:text-3xl mb-8 h-12">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} border-r-2 border-blue-400 pr-1`}>
              {displayText}
            </span>
          </div>
          <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Passionate about creating beautiful, functional web applications that solve real-world problems. 
            Currently mastering the PERN stack and always eager to learn new technologies.
          </p>
          <div className="flex gap-6 justify-center mb-12">
            <a href="#projects" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              View My Work
            </a>
            <a href="#contact" className={`border-2 ${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-400 hover:border-gray-600'} px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105`}>
              Get In Touch
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-blue-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} data-animate>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-4xl font-bold text-center mb-16 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-300 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm a self-taught developer who discovered my passion for coding through The Odin Project. 
                What started as curiosity has evolved into a deep love for problem-solving and creating 
                digital experiences that make a difference.
              </p>
              <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
                or sharing knowledge with fellow developers in the community.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <FaGithub size={24} />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <FaLinkedin size={24} />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
            
            {/* Skills */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-2xl font-semibold mb-8">Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{skill.level}%</span>
                    </div>
                    <div className={`h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out group-hover:scale-105"
                        style={{ 
                          width: isVisible.about ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 100 + 700}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`} data-animate>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-4xl font-bold text-center mb-16 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className={`group ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FaGithub size={18} />
                      Code
                    </a>
                    <a 
                      href={project.demo}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={18} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} data-animate>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-4xl font-bold mb-8 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Let's Work Together
          </h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-all duration-1000 delay-300 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            I'm always interested in new opportunities and exciting projects. 
            Let's connect and build something amazing together!
          </p>
          
          <div className={`grid md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-500 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a 
              href="mailto:your.email@example.com"
              className={`group p-8 rounded-xl transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Mail size={32} className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>your.email@example.com</p>
            </a>
            
            <a 
              href="#"
              className={`group p-8 rounded-xl transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <FaGithub size={32} className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">GitHub</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>@yourusername</p>
            </a>
            
            <a 
              href="#"
              className={`group p-8 rounded-xl transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <FaLinkedin size={32} className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>/in/yourprofile</p>
            </a>
          </div>

          {/* Call to Action */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a 
              href="mailto:your.email@example.com"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 text-center ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-100 border-t border-gray-200'}`}>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          © 2025 Your Name. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
};

export default PersonalWebsite;