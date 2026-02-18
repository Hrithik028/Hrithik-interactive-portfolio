import { ExternalLink, Github, Play } from 'lucide-react';

const projects = [
  {
    title: 'Intelligent Traffic Management System',
    description: 'Real-time traffic optimization using computer vision and reinforcement learning algorithms.',
    techStack: ['Python', 'PyTorch', 'OpenCV', 'React'],
    status: 'Production',
    type: 'AI/ML'
  },
  {
    title: 'Multi-Agent Trading Platform',
    description: 'Autonomous trading agents using deep Q-learning for cryptocurrency market analysis.',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'Redis'],
    status: 'Research',
    type: 'AI/ML'
  },
  {
    title: 'Customer Sentiment Analysis Pipeline',
    description: 'End-to-end NLP pipeline processing 1M+ reviews with 94% accuracy classification.',
    techStack: ['Python', 'Transformers', 'Apache Kafka', 'MongoDB'],
    status: 'Production',
    type: 'Data Science'
  },
  {
    title: 'Computer Vision Quality Control',
    description: 'Automated defect detection system reducing manual inspection time by 85%.',
    techStack: ['Python', 'YOLO', 'Flask', 'Azure'],
    status: 'Production',
    type: 'Computer Vision'
  }
];

export default function ProjectsWindow() {
  return (
    <div className="p-6 h-full">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
      </div>

      <div className="space-y-4 overflow-y-auto">
        {projects.map((project, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{project.type}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                project.status === 'Production' ? 'bg-green-100 text-green-800' :
                project.status === 'Research' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-gray-600 mb-3 text-sm leading-relaxed">{project.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {project.techStack.map((tech, techIndex) => (
                <span key={techIndex} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Play className="w-3 h-3 mr-1" />
                Demo
              </button>
              <button className="inline-flex items-center text-gray-600 hover:text-gray-700 text-sm">
                <Github className="w-3 h-3 mr-1" />
                Code
              </button>
              <button className="inline-flex items-center text-gray-600 hover:text-gray-700 text-sm">
                <ExternalLink className="w-3 h-3 mr-1" />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}