import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1 */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <img
                src="/images/logo.png"
                alt="Go Ukraina"
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A Los Angeles-based 501(c)(3) nonprofit delivering essential aid and rebuilding infrastructure in war-affected Ukraine.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/goukraina/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/go.ukraina.inc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/go-ukraine-inc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@goukrainafund" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Programs</h3>
            <ul className="space-y-4">
              <li><Link href="/initiatives/reh2o" className="text-gray-400 hover:text-white transition-colors text-sm">ReH2O Clean Water</Link></li>
              <li><Link href="/initiatives/power-generators" className="text-gray-400 hover:text-white transition-colors text-sm">Power Generators</Link></li>
              <li><Link href="/initiatives/modular-homes" className="text-gray-400 hover:text-white transition-colors text-sm">Modular Homes</Link></li>
              <li><Link href="/initiatives/ukraine-dreamzzz" className="text-gray-400 hover:text-white transition-colors text-sm">Ukraine Dreamzzz</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Organization</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/impact" className="text-gray-400 hover:text-white transition-colors text-sm">Transparency & Impact</Link></li>
              <li><Link href="/summit" className="text-gray-400 hover:text-white transition-colors text-sm">Reconstruction Summit</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog & Field Reports</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Contact & Legal</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>Los Angeles, California 90001</li>
              <li><a href="tel:+13235326855" className="hover:text-white transition-colors">+1 (323) 532-6855</a></li>
              <li><a href="mailto:info@goukraina.com" className="hover:text-white transition-colors">info@goukraina.com</a></li>
            </ul>
            <div className="mt-6 flex items-center gap-2 text-accent text-sm font-semibold">
              <Heart className="w-4 h-4" fill="currentColor" />
              <span>501(c)(3) Tax-Exempt</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Go Ukraina Inc. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>EIN: Available upon request</span>
            <Link href="/" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
