import { Award, Calendar, ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: 'AWS Certified Machine Learning - Specialty',
    issuer: 'Amazon Web Services',
    date: 'March 2024',
    status: 'Active',
    credentialId: 'AWS-MLS-2024-001'
  },
  {
    title: 'Google Cloud Professional Data Engineer',
    issuer: 'Google Cloud',
    date: 'January 2024',
    status: 'Active',
    credentialId: 'GCP-PDE-2024-001'
  },
  {
    title: 'Microsoft Azure AI Engineer Associate',
    issuer: 'Microsoft',
    date: 'November 2023',
    status: 'Active',
    credentialId: 'MS-AI-102-2023'
  },
  {
    title: 'TensorFlow Developer Certificate',
    issuer: 'TensorFlow',
    date: 'September 2023',
    status: 'Active',
    credentialId: 'TF-DEV-2023-001'
  }
];

export default function CertificationsWindow() {
  return (
    <div className="p-6 h-full">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Certifications</h1>
      </div>

      <div className="space-y-4 overflow-y-auto">
        {certifications.map((cert, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{cert.title}</h3>
                  <p className="text-blue-600 font-medium text-sm">{cert.issuer}</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                {cert.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Issued: {cert.date}</span>
              </div>
              <button className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                <span>Verify</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Credential ID: {cert.credentialId}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}