import { BookOpen, Microscope, Cpu, FileText } from 'lucide-react';

const researchAreas = [
  {
    icon: Cpu,
    title: 'Reinforcement Learning',
    description: 'Developing multi-agent systems for complex decision-making environments. Focus on reward shaping, policy optimization, and transfer learning.'
  },
  {
    icon: Microscope,
    title: 'Computer Vision',
    description: 'Advanced image processing and object detection systems. Specializing in real-time applications for industrial automation.'
  },
  {
    icon: BookOpen,
    title: 'Multi-Agent Systems',
    description: 'Coordination and communication protocols for autonomous agents. Research in collective intelligence and emergent behavior.'
  }
];

const publications = [
  {
    title: 'Efficient Multi-Agent Reinforcement Learning with Reward Shaping',
    venue: 'International Conference on AI Research (Submitted)',
    year: '2024',
    status: 'Under Review'
  },
  {
    title: 'Real-time Object Detection for Industrial Quality Control',
    venue: 'Journal of Computer Vision Applications',
    year: '2023',
    status: 'Published'
  }
];

export default function ResearchWindow() {
  return (
    <div className="p-6 h-full">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Research</h1>
      </div>

      <div className="space-y-6 overflow-y-auto">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Research Areas</h2>
          <div className="grid grid-cols-1 gap-4">
            {researchAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{area.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Publications & Papers</h2>
          <div className="space-y-3">
            {publications.map((pub, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-base font-medium text-gray-900 flex-1 pr-2">{pub.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    pub.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pub.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{pub.venue}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{pub.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}