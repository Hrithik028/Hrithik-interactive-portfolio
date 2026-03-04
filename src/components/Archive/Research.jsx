import { BookOpen, Microscope, Cpu } from 'lucide-react';

const researchAreas = [
  {
    icon: Cpu,
    title: 'Reinforcement Learning',
    description: 'Developing multi-agent systems for complex decision-making environments. Focus on reward shaping, policy optimization, and transfer learning between different domains.'
  },
  {
    icon: Microscope,
    title: 'Computer Vision',
    description: 'Advanced image processing and object detection systems. Specializing in real-time applications for industrial automation and quality control processes.'
  },
  {
    icon: BookOpen,
    title: 'Multi-Agent Systems',
    description: 'Coordination and communication protocols for autonomous agents. Research in collective intelligence and emergent behavior in distributed AI systems.'
  }
];

const publications = [
  {
    title: 'Efficient Multi-Agent Reinforcement Learning with Reward Shaping',
    venue: 'International Conference on AI Research (Submitted)',
    year: '2024'
  },
  {
    title: 'Real-time Object Detection for Industrial Quality Control',
    venue: 'Journal of Computer Vision Applications',
    year: '2023'
  }
];

export default function Research() {
  return (
    <section id="research" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Research & AI Focus</h2>
          <p className="text-lg text-gray-600">Advancing artificial intelligence through focused research</p>
        </div>
        
        {/* Research Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {researchAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">{area.title}</h3>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
              </div>
            );
          })}
        </div>
        
        {/* Publications */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">Publications & Papers</h3>
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-100">
                <h4 className="text-lg font-medium text-gray-900 mb-2">{pub.title}</h4>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>{pub.venue}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{pub.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}