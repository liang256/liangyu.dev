import { CMS_NAME } from "@/lib/constants";
import { ChevronDown } from "lucide-react";

export function Intro() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="space-y-8 fade-in">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight">
              <span className="text-gradient">Blog</span>
              <span className="text-white">.</span>
            </h1>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Thoughts on <span className="text-gradient font-semibold">technology</span>, 
                <span className="text-gradient font-semibold"> development</span>, and 
                <span className="text-gradient font-semibold"> creative solutions</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="glass px-6 py-3 rounded-full">
              <p className="text-sm text-gray-400">
                Built with{" "}
                <a
                  href="https://nextjs.org/"
                  className="link-gradient font-semibold hover:filter hover:brightness-110 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js
                </a>
                {" "}& {CMS_NAME}
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
}
