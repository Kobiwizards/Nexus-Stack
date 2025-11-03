import { companyInfo } from '@/data/companyInfo'

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Nexus Stack
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Transforming visions into reality with cutting-edge technology solutions. 
              We build scalable, secure, and innovative digital products that drive business growth.
            </p>
            <div className="text-gray-400 space-y-1">
              <p>{companyInfo.headquarters}</p>
              <p>{companyInfo.location}</p>
              <p>Email: {companyInfo.email}</p>
              {companyInfo.phones.map((phone, index) => (
                <p key={index}>Phone: {phone}</p>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="/work" className="text-gray-400 hover:text-white transition-colors">Our Work</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services#custom-software" className="text-gray-400 hover:text-white transition-colors">Custom Software</a></li>
              <li><a href="/services#mobile-apps" className="text-gray-400 hover:text-white transition-colors">Mobile Apps</a></li>
              <li><a href="/services#ai-automation" className="text-gray-400 hover:text-white transition-colors">AI Automation</a></li>
              <li><a href="/services#cloud-devops" className="text-gray-400 hover:text-white transition-colors">Cloud & DevOps</a></li>
              <li><a href="/services#ui-ux" className="text-gray-400 hover:text-white transition-colors">UI/UX Design</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Nexus Stack. All rights reserved.
          </p>
          <p className="text-gray-400 mt-2 md:mt-0">
            Founded by {companyInfo.founder}
          </p>
        </div>
      </div>
    </footer>
  )
}