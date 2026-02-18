import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Intelligent Traffic Management System',
    description: 'Real-time traffic optimization using computer vision and reinforcement learning algorithms.',
    techStack: ['Python', 'PyTorch', 'OpenCV', 'React', 'PostgreSQL'],
    status: 'Production'
  },
  {
    title: 'Multi-Agent Trading Platform',
    description: 'Autonomous trading agents using deep Q-learning for cryptocurrency market analysis.',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'Redis', 'Docker'],
    status: 'Research'
  },
  {
    title: 'Customer Sentiment Analysis Pipeline',
    description: 'End-to-end NLP pipeline processing 1M+ reviews with 94% accuracy classification.',
    techStack: ['Python', 'Transformers', 'Apache Kafka', 'MongoDB', 'AWS'],
    status: 'Production'
  },
  {
    title: 'Predictive Maintenance Dashboard',
    description: 'IoT sensor data analysis with machine learning for equipment failure prediction.',
    techStack: ['Python', 'Scikit-learn', 'React', 'InfluxDB', 'Grafana'],
    status: 'Demo'
  },
  {
    title: 'Computer Vision Quality Control',
    description: 'Automated defect detection system reducing manual inspection time by 85%.',
    techStack: ['Python', 'YOLO', 'Flask', 'SQL Server', 'Azure'],
    status: 'Production'
  },
  {
    title: 'Natural Language Query Interface',
    description: 'SQL query generation from natural language using transformer models.',
    techStack: ['Python', 'T5', 'FastAPI', 'Vue.js', 'MySQL'],
    status: 'Beta'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600">Production-ready solutions and research implementations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  project.status === 'Production' ? 'bg-green-100 text-green-800' :
                  project.status === 'Research' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'Beta' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  <span>View Details</span>
                  <ExternalLink className="ml-1 w-4 h-4" />
                </button>
                <button className="inline-flex items-center text-gray-600 hover:text-gray-700 transition-colors duration-200">
                  <Github className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}