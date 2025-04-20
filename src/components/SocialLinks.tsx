
import { Mail, Instagram, Github } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="fixed bottom-8 left-0 right-0 z-20 flex justify-center gap-6 text-white">
      <a
        href="mailto:owen@owencoutts.com"
        className="transition-transform hover:scale-110"
        aria-label="Email"
      >
        <Mail className="h-5 w-5 opacity-75 hover:opacity-100" />
      </a>
      <a
        href="https://github.com/github"
        className="transition-transform hover:scale-110"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <Github className="h-5 w-5 opacity-75 hover:opacity-100" />
      </a>
      <a
        href="https://instagram.com/tallowen"
        className="transition-transform hover:scale-110"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <Instagram className="h-5 w-5 opacity-75 hover:opacity-100" />
      </a>
    </div>
  );
};

export default SocialLinks;
