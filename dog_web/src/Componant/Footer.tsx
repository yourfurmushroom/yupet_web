export default function Footer()
{
    return (
        <footer className="bg-gray-900 text-white py-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Yupet</h3>
                <p>
                  An AI-powered pet arrhythmia analysis platform dedicated to providing precise health monitoring and analysis services.
                </p>
              </div>
    
              <div>
                <h3 className="text-xl font-bold mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="index.html" className="hover:underline">Home</a></li>
                  <li><a href="pages/about.html" className="hover:underline">About Us</a></li>
                  <li><a href="pages/services.html" className="hover:underline">Services</a></li>
                  <li><a href="pages/contact.html" className="hover:underline">Contact Us</a></li>
                </ul>
              </div>
    
              <div>
                <h3 className="text-xl font-bold mb-3">Services</h3>
                <ul className="space-y-2">
                  <li><a href="pages/services.html#analysis" className="hover:underline">Heart rhythm analysis</a></li>
                  <li><a href="pages/services.html#monitoring" className="hover:underline">Health monitoring</a></li>
                  <li><a href="pages/services.html#consultation" className="hover:underline">Professional consultation</a></li>
                  <li><a href="pages/services.html#reports" className="hover:underline">Health report</a></li>
                </ul>
              </div>
    
              <div>
                <h3 className="text-xl font-bold mb-3">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-envelope mr-2"></i>
                    m16131072@gs.ncku.edu.com
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-phone mr-2"></i>
                    (06) 1234567
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                     1 University Road,Tainan City, 70101
                  </li>
                </ul>
              </div>
            </div>
    
            <div className="text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
              &copy; 2025 Yupet. All rights reserved.
            </div>
          </div>
        </footer>
      );
}