import { Code, Database, Cloud, Cpu } from 'lucide-react';

const skillCategories = [
  {
    icon: Code,
    title: 'Programming Languages',
    skills: ['Python', 'JavaScript/TypeScript', 'R', 'SQL', 'Java', 'C++', 'Go']
  },
  {
    icon: Cpu,
    title: 'AI & Machine Learning',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras', 'OpenCV', 'Transformers', 'MLflow']
  },
  {
    icon: Database,
    title: 'Data & Databases',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka', 'InfluxDB', 'BigQuery', 'Snowflake']
  },
  {
    icon: Cloud,
    title: 'Tools & Platforms',
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'React', 'FastAPI', 'Apache Spark']
  }
];

export default function SkillsWindow() {
  return (
    <div className="p-6 h-full">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Technical Skills</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {skillCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="bg-white px-3 py-2 rounded border border-gray-200 text-gray-700 text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}