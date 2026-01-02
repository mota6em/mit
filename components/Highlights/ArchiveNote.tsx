import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  bgColor: string;
  hoverColor: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/muszlimifjusag/",
    icon: <FaFacebook className="w-5 h-5" />,
    bgColor: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/muszlimifjusag/",
    icon: <FaInstagram className="w-5 h-5" />,
    bgColor: "bg-pink-600",
    hoverColor: "hover:bg-pink-700",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@muszlimifjusagitarsasag/",
    icon: <FaYoutube className="w-5 h-5" />,
    bgColor: "bg-red-600",
    hoverColor: "hover:bg-red-700",
  },
];

export default function ArchiveNote() {
  return (
    <div className="px-4 md:px-10 text-center max-w-4xl mx-auto">
      <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Website Launched in Late 2025
        </h3>
        <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
          Content from 2024 and earlier years is documented on our social media
          platforms. The MIT website was officially launched at the end of 2025,
          so all highlights and announcements from previous years can be found
          on our social media channels.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 ${link.bgColor} ${link.hoverColor} text-white rounded-lg transition-colors`}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
