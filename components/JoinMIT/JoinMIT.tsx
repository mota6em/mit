"use client";
import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaHeart } from "react-icons/fa";
import { HiOutlineMail, HiSparkles, HiArrowRight } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

type SectionTagColor = "green" | "gold" | "blue";

const SectionTag = ({
  text,
  color = "green",
}: {
  text: string;
  color?: SectionTagColor;
}) => {
  const colorClasses: Record<SectionTagColor, string> = {
    green: "bg-green-100 text-green-600",
    gold: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
  };

  return (
    <div
      className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 ${colorClasses[color]}`}
    >
      {text}
    </div>
  );
};

export default function JoinMIT() {
  const [mounted, setMounted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "exists" | "error">(
    "idle"
  );
  const t = useTranslations("joinMIT");
  const tNav = useTranslations("nav");

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/muszlimifjusag/",
      color: "text-blue-800",
      bg: "bg-blue-50",
      name: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/muszlimifjusag/",
      color: "text-pink-800",
      bg: "bg-pink-50",
      name: "Instagram",
    },
    {
      icon: HiOutlineMail,
      href: "#",
      color: "text-yellow-800",
      bg: "bg-yellow-50",
      name: "Email",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/123456789",
      color: "text-green-800",
      bg: "bg-green-50",
      name: "WhatsApp",
    },
  ];

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText("muszlimifjusag@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) {
        setStatus("success");
        setFormData({ name: "", email: "" });
      } else if (res.status === 409) setStatus("exists");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };
  if (!mounted) return null;

  return (
    <div className="relative w-full min-h-screen  overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute top-[40%] left-0 w-[400px] h-[400px] bg-yellow-100/40 rounded-full blur-3xl -translate-x-1/3" />

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl relative md:w-full lg:max-w-7xl md:mt-32 lg:mt-0 md:ms-2 mx-auto px-2 sm:px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center  z-10 mt-10 md:mt-0"
          >
            <SectionTag
              text={t("joinUsTag") || "Be Part of Us"}
              color="green"
            />

            <h1 className="text-5xl md:text-7xl font-bold Carena-font mb-2 leading-tight">
              <span className="text-[#e8b030] drop-shadow-sm">
                {t("title").split(" ")[0] || "Join"}{" "}
              </span>
              <span className="text-[#11b505] drop-shadow-sm">
                {t("title").split(" ")[1] || "The"}
              </span>{" "}
              <span className="text-[#4d93fb] drop-shadow-sm">
                {t("title").split(" ")[2] || "Family"}
              </span>
            </h1>

            {/* Image Collage - mobile screens view */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] md:h-[500px] md:hidden"
            >
              {/* Image 1 - Tilted Left */}
              <div className="absolute top-0 left-4 sm:left-14 w-64 h-80 rotate-[-6deg] z-10">
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src="/imgs/mit-pecs.jpg"
                    alt="Youth"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Image 2 - Tilted Right */}
              <div className="absolute top-28 md:top-20 left-26 sm:left-58 w-60 h-60 rotate-[12deg] z-20">
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src="/imgs/join/join-mit-2.jpg"
                    alt="Community"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative Leaf Icon similar to screenshot */}
                <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-full shadow-md z-30">
                  <HiSparkles className="text-[#e8b030] text-2xl" />
                </div>
              </div>
            </motion.div>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-4 max-w-lg mx-auto lg:mx-0">
              {t("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mx-10 md:mx-0">
              <a
                href="#volunteer"
                className="px-8 py-3 bg-[#11b505] text-white rounded-full font-semibold hover:bg-[#0f9e04] transition-all duration-300 shadow-lg shadow-green-200"
              >
                {t("volunteer.button") || "Start Volunteering"}
              </a>
              <a
                href="#socials"
                className="px-8 py-3 bg-white text-gray-600 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-transition-all duration-300"
              >
                {t("connect") || "Connect With Us"}
              </a>
            </div>
          </motion.div>{" "}
          {/* Image Collage - big screens view */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] hidden md:hidden lg:block"
          >
            {/* Image 1 - Tilted Left */}
            <div className="absolute top-12 left-2 md:left-24 lg:left-10 w-80 h-90 lg:w-70 lg-84 rotate-[-10deg] z-10">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/imgs/mit-pecs.jpg"
                  alt="Youth"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image 2 - Tilted Right */}
            <div className="absolute top-45 left-26 md:left-72 lg:left-50 w-72 h-72 lg:w-64 lg:h-68 rotate-[12deg] z-20">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/imgs/join/join-mit-2.jpg"
                  alt="Community"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Leaf Icon similar to screenshot */}
              <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-full shadow-md z-30">
                <HiSparkles className="text-[#e8b030] text-2xl" />
              </div>
            </div>
          </motion.div>
        </div>{" "}
        <div className="absolute top-10 right-20 w-72 h-72 bg-[#4d93fb] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#11b505] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-72 h-72 bg-[#f1c34c] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* --- VOLUNTEER SECTION ---   */}
      <div id="volunteer" className="max-w-6xl mx-auto px-4 py-25 pb-0">
        <div className="text-center mb-8">
          <SectionTag text={t("impactTag") || "Make an Impact"} color="gold" />
          <h2 className="text-4xl md:text-5xl font-bold Carena-font text-[#e8b030] mb-4">
            {t("volunteer.title")}
          </h2>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden"
        >
          {/* Decorative Corner Icon */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-[#e8b030]/10 rounded-br-[4rem] -z-0" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
              <FaHeart className="text-4xl text-red-500" />
            </div>

            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Become a Volunteer
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t("volunteer.description")}
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSd6KJuRRaifHAoZTEBxKaawimJBzj_pAaU7zBnSgMuq_BQBvA/viewform"
                target="_blank"
                className="inline-flex items-center gap-2 text-[#11b505] font-bold hover:gap-4 transition-all"
              >
                {t("volunteer.button")} <HiArrowRight />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      {/* --- SOCIAL MEDIA SECTION --- */}
      <div
        id="socials"
        className="max-w-7xl mx-auto px-4 py-14 md:py-10 bg-white/50 scroll-mt-10 rounded-[2rem] md:rounded-[3rem] my-6 md:my-10"
      >
        <div className="text-center mb-6 md:mb-10">
          <SectionTag text={t("socialTag") || "Stay Connected"} color="blue" />
          <h2 className="text-3xl md:text-5xl font-bold Carena-font text-[#4d93fb]">
            {t("connectWithUs")}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            const isEmail = social.name === "Email";

            const isWhatsApp = social.name === "WhatsApp";

            const cardStyles = isWhatsApp
              ? "opacity-60 grayscale cursor-not-allowed bg-gray-50 border-gray-200"
              : "bg-white hover:shadow-xl hover:-translate-y-2 cursor-pointer border-gray-100";

            const iconWrapperStyles = isWhatsApp
              ? "bg-gray-200 text-gray-400"
              : `${social.bg} group-hover:scale-110`;

            const content = (
              <div
                className={`h-full rounded-2xl md:rounded-3xl p-4 md:p-8 text-center shadow-[0_2px_10px_rgba(0,0,0,0.03)] md:shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all duration-300 group flex flex-col items-center justify-center ${cardStyles}`}
              >
                {/* Compact Icon Container */}
                <div
                  className={`w-10 h-10 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 transition-transform ${iconWrapperStyles}`}
                >
                  <Icon
                    className={`text-lg md:text-3xl ${
                      isWhatsApp ? "text-gray-500" : social.color
                    }`}
                  />
                </div>

                {/* Compact Title */}
                <h3
                  className={`text-sm md:text-xl font-bold mb-1 md:mb-2 ${
                    isWhatsApp ? "text-gray-400" : "text-gray-800"
                  }`}
                >
                  {social.name}
                </h3>

                {/* Compact Description */}
                <p className="text-gray-500 text-[10px] md:text-sm mb-2 md:mb-4 line-clamp-2 leading-relaxed">
                  {t(`socialText.${social.name.toLowerCase()}`)}
                </p>

                {/* Action Text */}
                <div
                  className={`text-[10px] md:text-sm font-semibold mt-auto transition-opacity ${
                    isWhatsApp
                      ? "text-gray-400 uppercase tracking-widest text-[9px]"
                      : `${social.color} opacity-80 group-hover:opacity-100`
                  }`}
                >
                  {isWhatsApp ? (
                    <span className="bg-gray-200 px-2 py-1 animate-pulse rounded text-green-600">
                      Available Soon
                    </span>
                  ) : isEmail && emailCopied ? (
                    tNav("copied")
                  ) : isEmail ? (
                    "Copy Email"
                  ) : (
                    "Follow Us"
                  )}
                </div>
              </div>
            );

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                {isWhatsApp ? (
                  <div className="h-full block">{content}</div>
                ) : isEmail ? (
                  <button
                    onClick={handleEmailCopy}
                    className="w-full h-full block text-left"
                  >
                    {content}
                  </button>
                ) : (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {content}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- NEWSLETTER SECTION ---   */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#1a2332] rounded-[2.5rem] p-8 md:p-16 overflow-hidden text-center md:text-left"
        >
          {/* Background Patterns for the dark card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8b030]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4d93fb]/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                <HiOutlineMail className="text-[#e8b030]" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">
                  {t("newsletterTag") || "Newsletter"}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold Carena-font text-white leading-tight">
                {t("stayUpdated") || "Stay In The Loop"}
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                {t("subscriptionDescription") ||
                  "Join our community newsletter to receive updates on events, workshops, and volunteer opportunities."}
              </p>

              {/* Feature List  */}
              <ul className="space-y-3 text-sm text-gray-300 hidden md:block">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e8b030]" />
                  <span>Weekly community updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e8b030]" />
                  <span>Exclusive event registrations</span>
                </li>
              </ul>
            </div>

            {/* Right: Subscription Form */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10"
                  >
                    <HiSparkles className="text-[#e8b030] text-5xl mx-auto mb-4" />
                    <h3 className="text-white text-xl font-bold">
                      {t("successMessage")}
                    </h3>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-400 outline-none focus:border-[#e8b030] transition-colors"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-400 outline-none focus:border-[#e8b030] transition-colors"
                    />

                    {status === "exists" && (
                      <p className="text-[#e8b030] text-sm">
                        {t("alreadySubscribed")}
                      </p>
                    )}
                    {status === "error" && (
                      <p className="text-red-400 text-sm">
                        {t("errorMessage")}
                      </p>
                    )}

                    <button
                      disabled={submitting}
                      type="submit"
                      className="w-full cursor-pointer py-4 bg-[#e8b030] text-[#1a2332] font-bold rounded-xl hover:bg-[#f1c34c] transition-all disabled:opacity-50"
                    >
                      {submitting ? "Joining..." : "Subscribe"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
