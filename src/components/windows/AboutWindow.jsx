import { User, MapPin, GraduationCap, Calendar } from 'lucide-react';

export default function AboutWindow() {
  return (
    <div className="p-6 h-full">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hrithik Jadhav</h1>
          <p className="text-gray-600">Master of IT (AI) Graduate</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-gray-700">Sydney, NSW, Australia</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-gray-700">University of New South Wales Sydney</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-gray-700">Expected Graduation: 2026</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            I'm a passionate AI engineer with a Master's degree in Information Technology specializing in
            Artificial Intelligence. My expertise lies in building end-to-end AI systems that transform
            complex data into intelligent, production-ready solutions.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Throughout my academic and professional journey, I've developed a strong foundation in machine
            learning, deep learning, and data engineering. I'm particularly interested in reinforcement
            learning, computer vision, and multi-agent systems.
          </p>
          <p className="text-gray-700 leading-relaxed">
            I thrive in collaborative environments where I can apply cutting-edge AI techniques to solve
            real-world problems and create meaningful impact through technology.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {['Machine Learning', 'Computer Vision', 'Data Science', 'Software Engineering', 'Research', 'Innovation'].map((interest) => (
              <span key={interest} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}