const skillCategories = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'JavaScript', 'SQL', 'C++', 'C']
  },
  {
    title: 'AI & Machine Learning',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras', 'OpenCV', 'Transformers', 'MLflow']
  },
  {
    title: 'Data & Databases',
    skills: ['PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    title: 'Tools & Platforms',
    skills: ['AWS', , 'Docker', 'Git', 'React', 'FastAPI']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Technical Expertise</h2>
          <p className="text-lg text-gray-600">Comprehensive technical stack for modern AI development</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="bg-white px-4 py-2 rounded-lg text-gray-700 text-center shadow-sm border border-gray-100"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}