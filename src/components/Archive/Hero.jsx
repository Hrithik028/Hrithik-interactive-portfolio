import { Download, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-slate-100 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
          Hrithik Jadhav
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-normal text-gray-700 mb-8">
          Master of IT (AI) | Software Engineer & Data Analyst
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Building end-to-end AI systems that transform data into intelligent solutions. 
          Specializing in production-ready applications, robust data pipelines, and cutting-edge 
          machine learning implementations for real-world impact.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
            <span>View Projects</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          
          <button className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
            <Download className="mr-2 w-5 h-5" />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </section>
  );
}