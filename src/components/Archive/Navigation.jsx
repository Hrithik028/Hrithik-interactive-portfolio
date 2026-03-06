import { User, FolderOpen, Settings, Briefcase, Brain, Mail } from 'lucide-react';

const navigationTiles = [
  {
    icon: User,
    title: 'About Me',
    description: 'Background, education, and journey into AI'
  },
  {
    icon: FolderOpen,
    title: 'Projects',
    description: 'Featured work and technical implementations'
  },
  {
    icon: Settings,
    title: 'Technical Skills',
    description: 'Programming languages, tools, and frameworks'
  },
  {
    icon: Briefcase,
    title: 'Experience',
    description: 'Professional roles and leadership positions'
  },
  {
    icon: Brain,
    title: 'Research & AI Work',
    description: 'Machine learning and AI research focus'
  },
  {
    icon: Mail,
    title: 'Contact',
    description: 'Get in touch for opportunities'
  }
];

export default function Navigation() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Explore My Work</h2>
          <p className="text-lg text-gray-600">Navigate through different sections to learn more</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navigationTiles.map((tile, index) => {
            const IconComponent = tile.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-200">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{tile.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{tile.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}