export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <div>
        © {new Date().getFullYear()} Shivam Joshi. Built using Next.js & Tailwind CSS.
      </div>
      <div className="mt-1 text-xs text-gray-600 dark:text-gray-500">
      Designed & Developed by <a 
          href="https://www.linkedin.com/in/manas-mandlecha/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-blue-700 underline"
        >
          Manas Mandlecha
        </a>
      </div>
    </footer>
  );
}
