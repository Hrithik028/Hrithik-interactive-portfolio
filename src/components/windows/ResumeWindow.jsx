import { Download, FileText, Eye } from 'lucide-react';

export default function ResumeWindow() {
  return (
    <div className="p-6 h-full">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resume</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Hrithik Jadhav - Resume</h2>
          <p className="text-gray-600 mb-6">Master of IT (AI) | Software Engineer & Data Analyst</p>
          
          <div className="flex gap-3 justify-center">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Highlights</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Master of Information Technology (AI Specialization) - UTS</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">3+ years experience in AI/ML development and research</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Published researcher in reinforcement learning and computer vision</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Proficient in Python, PyTorch, TensorFlow, and cloud platforms</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Experience with production ML systems and data pipelines</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Formats</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="font-medium text-gray-900">PDF Format</div>
              <div className="text-sm text-gray-600">Standard resume format</div>
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="font-medium text-gray-900">Word Document</div>
              <div className="text-sm text-gray-600">Editable format</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}