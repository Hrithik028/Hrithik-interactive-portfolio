import { Calendar, MapPin, Building } from 'lucide-react';

const experiences = [
  {
    role: 'AI Research Assistant',
    company: 'University of Technology Sydney',
    location: 'Sydney, Australia',
    period: 'Feb 2023 - Present',
    type: 'Research',
    description: 'Leading research in multi-agent reinforcement learning systems. Published 2 papers on autonomous decision-making algorithms.',
    achievements: [
      'Developed novel reward shaping techniques improving training efficiency by 40%',
      'Collaborated with industry partners on real-world applications',
      'Mentored 5 undergraduate students in AI research projects'
    ]
  },
  {
    role: 'Data Science Intern',
    company: 'Commonwealth Bank of Australia',
    location: 'Sydney, Australia',
    period: 'Jun 2023 - Dec 2023',
    type: 'Industry',
    description: 'Built machine learning models for fraud detection and customer analytics, processing millions of transactions daily.',
    achievements: [
      'Improved fraud detection accuracy by 15% using ensemble methods',
      'Deployed ML models to production serving 10M+ customers',
      'Created automated reporting dashboards reducing manual work by 60%'
    ]
  },
  {
    role: 'Software Development Lead',
    company: 'University Tech Club',
    location: 'Sydney, Australia',
    period: 'Mar 2022 - Feb 2023',
    type: 'Leadership',
    description: 'Led a team of 8 developers building web applications and organizing technical workshops for 200+ students.',
    achievements: [
      'Managed development of 3 major web applications',
      'Organized 12+ technical workshops on modern development practices',
      'Increased club membership by 150% through innovative programs'
    ]
  }
];

export default function ExperienceWindow() {
  return (
    <div className="p-6 h-full">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Professional Experience</h1>
      </div>

      <div className="space-y-6 overflow-y-auto">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{exp.role}</h3>
                <div className="flex items-center text-blue-600 font-medium mb-2">
                  <Building className="w-4 h-4 mr-1" />
                  {exp.company}
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                exp.type === 'Industry' ? 'bg-green-100 text-green-800' :
                exp.type === 'Research' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {exp.type}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {exp.period}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {exp.location}
              </div>
            </div>
            
            <p className="text-gray-600 mb-3 text-sm leading-relaxed">{exp.description}</p>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-2 text-sm">Key Achievements:</h5>
              <ul className="space-y-1">
                {exp.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} className="flex items-start text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}