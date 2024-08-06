import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-200 p-6 md:py-12 w-full" style={{backgroundColor:'black'}}>
      <div className="container mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold" style={{color:'#EBD96B'}}>Company</h3>
          <a href="/" style={{color:'white'}}>About Us</a>
          <a href="/" style={{color:'white'}}>Our Team</a>
          <a href="/" style={{color:'white'}}>Careers</a>
          <a href="/" style={{color:'white'}}>News</a>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold" style={{color:'#EBD96B'}}>Partnerships</h3>
          <a href="/" style={{color:'white'}}>For Businesses</a>
          <a href="/" style={{color:'white'}}>For Creators</a>
          <a href="/" style={{color:'white'}}>Success Stories</a>
          <a href="/" style={{color:'white'}}>FAQs</a>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold" style={{color:'#EBD96B'}}>Resources</h3>
          <a href="/" style={{color:'white'}}>Blog</a>
          <a href="/" style={{color:'white'}}>Guides</a>
          <a href="/" style={{color:'white'}}>Webinars</a>
          <a href="/" style={{color:'white'}}>Templates</a>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold" style={{color:'#EBD96B'}}>Legal</h3>
          <a href="/" style={{color:'white'}}>Privacy Policy</a>
          <a href="/" style={{color:'white'}}>Terms of Service</a>
          <a href="/" style={{color:'white'}}>Cookie Policy</a>
        </div>
        <div className="grid gap-1" style={{color:'#EBD96B'}}>
          <h3 className="font-semibold">Contact</h3>
          <a href="/" style={{color:'white'}}>Support</a>
          <a href="/" style={{color:'white'}}>Sales</a>
          <a href="/" style={{color:'white'}}>Partnerships</a>
          <a href="/" style={{color:'white'}}>Media</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
