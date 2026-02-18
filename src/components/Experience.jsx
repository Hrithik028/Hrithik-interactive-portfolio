import { Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    role: 'AI Research Assistant',
    company: 'University of Technology Sydney',
    location: 'Sydney, Australia',
    period: 'Feb 2023 - Present',
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
    description: 'Led a team of 8 developers building web applications and organizing technical workshops for 200+ students.',
    achievements: [
      'Managed development of 3 major web applications',
      'Organized 12+ technical workshops on modern development practices',
      'Increased club membership by 150% through innovative programs'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Professional Experience</h2>
          <p className="text-lg text-gray-600">Leadership roles and technical contributions</p>
        </div>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{exp.role}</h3>
                  <h4 className="text-lg text-blue-600 font-medium mb-2">{exp.company}</h4>
                </div>
                
                <div className="flex flex-col lg:items-end gap-2">
                  <div className="inline-flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="inline-flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>
              
              <div className="space-y-2">
                <h5 className="font-medium text-gray-900 mb-3">Key Achievements:</h5>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}