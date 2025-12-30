import { FaInstagram } from "react-icons/fa";
import { HiLink } from "react-icons/hi";

export const EventActions = ({ regUrl, onShare, isCopied, dict }: any) => (
  <div className="pt-2 flex flex-col gap-3">
    {regUrl && (
      <a
        href={regUrl}
        target="_blank"
        className="py-3 rounded-lg font-bold bg-green-600 text-white flex items-center justify-center gap-2 hover:bg-green-700 transition-all"
      >
        <HiLink className="w-5 h-5" /> <span>{dict("register")}</span>
      </a>
    )}
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="https://ig.me/m/muszlimifjusag"
        target="_blank"
        className="flex-1 py-3 rounded-lg bg-linear-to-r from-purple-500 to-orange-500 text-white flex items-center justify-center gap-2"
      >
        <FaInstagram className="w-5 h-5" /> <span>{dict("dm")}</span>
      </a>
      <button
        onClick={onShare}
        className={`flex-1 py-3 rounded-lg font-bold text-white transition-all ${
          isCopied ? "bg-green-600" : "bg-blue-600"
        }`}
      >
        {isCopied ? dict("copied") : dict("share")}
      </button>
    </div>
  </div>
);
