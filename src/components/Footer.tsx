const Footer = () => {
  return (
    <footer className=" px-4 md:px-8 lg:px-16 py-4 md:p-8 bg-gray-900 text-white border-t border-gray-200 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side */}
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-2xl font-bold">📚 Minimal Library</h2>
          <p className="text-sm ">
            Built with <span className="text-red-500">❤️</span> using React,
            TypeScript, Redux & MongoDB.
          </p>
        </div>

        {/* Right Side */}
        <div className="text-center md:text-right text-sm ">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">Minimal Library</span>
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
