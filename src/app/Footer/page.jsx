

const Footer = () => {
    return (
        <div><footer className="bg-black text-white py-10">

  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

    <div>
      <h2 className="text-2xl font-bold text-violet-500">
        AbidStore
      </h2>

      <p className="text-gray-400 mt-4">
        Modern e-commerce experience for everyone.
      </p>
    </div>

    <div>
      <h3 className="font-bold mb-4">Quick Links</h3>

      <ul className="space-y-2 text-gray-400">
        <li>Home</li>
        <li>Products</li>
        <li>Contact</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold mb-4">Support</h3>

      <ul className="space-y-2 text-gray-400">
        <li>Privacy Policy</li>
        <li>Terms</li>
        <li>Help Center</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold mb-4">Contact</h3>

      <p className="text-gray-400">
        abidstore@gmail.com
      </p>
    </div>

  </div>

  <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500">
    © 2026 AbidStore. All rights reserved.
  </div>

</footer>
            
        </div>
    );
};

export default Footer;