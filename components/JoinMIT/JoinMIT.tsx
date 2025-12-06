"use client";

import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaUsers,
  FaCalendarAlt,
  FaHeart,
} from "react-icons/fa";
import { HiOutlineMail, HiSparkles } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function JoinMIT() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const t = useTranslations("joinMIT");

  // Parallax effect for hero
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/muszlimifjusag/",
      gradient: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-600",
      name: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/muszlimifjusag/",
      gradient: "from-pink-600 via-purple-600 to-orange-500",
      bgColor: "bg-pink-600",
      name: "Instagram",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/123456789",
      gradient: "from-green-500 to-green-700",
      bgColor: "bg-green-600",
      name: "WhatsApp",
    },
    {
      icon: HiOutlineMail,
      href: "mailto:muszlimifjusag@gmail.com",
      gradient: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-600",
      name: "Email",
    },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  const stats = [
    { icon: FaUsers, value: "500+", label: t("stats.members") },
    { icon: FaCalendarAlt, value: "50+", label: t("stats.events") },
    { icon: FaHeart, value: "100%", label: t("stats.dedication") },
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <motion.div
          style={{ y: mounted ? heroY : 0 }}
          className="absolute inset-0"
        >
          <Image
            src="/imgs/patterns/quba-alsakhra-lowres.jpg"
            alt="Join MIT Background"
            fill
            className="object-cover brightness-[0.45]"
            priority
          />
        </motion.div>

        {/* Animated pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(77,147,251,0.3),transparent_50%)] animate-pulse" />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: mounted ? heroOpacity : 1 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-[#4d93fb]/30 blur-3xl rounded-full animate-pulse" />
            <Image
              src="/imgs/hero/mit-logo-full.png"
              alt="MIT Logo"
              width={200}
              height={200}
              className="w-36 h-36 md:w-56 md:h-56 drop-shadow-2xl relative z-10"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-8xl font-bold Carena-font mb-4"
          >
            <span className="text-[#4d93fb] drop-shadow-[0_4px_20px_rgba(77,147,251,0.6)] inline-block hover:scale-110 transition-transform duration-300">
              {t("title").split(" ")[0]}{" "}
            </span>
            <span className="text-[#f1c34c] drop-shadow-[0_4px_20px_rgba(241,195,76,0.6)] inline-block hover:scale-110 transition-transform duration-300">
              {t("title").split(" ")[1]}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white font-medium max-w-3xl drop-shadow-lg mb-8"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 space-y-16 md:px-10">
        {/* Social Media Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4d93fb]/10 via-[#11b505]/10 to-[#f1c34c]/10 px-6 py-2 rounded-full mb-4"
            >
              <HiSparkles className="text-[#f1c34c] text-xl" />
              <span className="text-sm font-semibold text-gray-700">
                {t("followTag")}
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold Carena-font leading-tight">
              <span className="text-[#4d93fb] inline-block hover:scale-105 transition-transform">
                {t("connectWithUs").split(" ")[0]}{" "}
              </span>
              <span className="text-[#11b505] inline-block hover:scale-105 transition-transform">
                {t("connectWithUs").split(" ")[1]}{" "}
              </span>
              <span className="text-[#f1c34c] inline-block hover:scale-105 transition-transform">
                {t("connectWithUs").split(" ")[2]}
              </span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("socialDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-100 hover:border-transparent">
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
                    </div>

                    <div className="relative p-8 flex flex-col items-center text-center space-y-4 transform group-hover:-translate-y-1 transition-transform duration-300">
                      <div
                        className={`p-6 rounded-full ${social.bgColor} text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                      >
                        <Icon size={36} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                        {social.name}
                      </h3>
                      <p className="text-gray-600 text-sm group-hover:text-white/90 transition-colors duration-300 line-clamp-2">
                        {t(`socialText.${social.name.toLowerCase()}`)}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                        <span>{t("followUs")}</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Newsletter Section with Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Images Grid */}
            <div className="relative h-[400px] md:h-[500px] hidden lg:block">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-4">
                  <div className="relative h-1/2 rounded-2xl overflow-hidden">
                    <Image
                      src="/imgs/hero/hero-bg-1.jpg"
                      alt="Community"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative h-1/2 rounded-2xl overflow-hidden">
                    <Image
                      src="/imgs/hero/hero-bg-3.jpg"
                      alt="Events"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-1/2 rounded-2xl overflow-hidden">
                    <Image
                      src="/imgs/hero/hero-bg-2.jpg"
                      alt="Activities"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative h-1/2 rounded-2xl overflow-hidden">
                    <Image
                      src="/imgs/hero/hero-bg-4.jpg"
                      alt="Gatherings"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Newsletter Form */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-4 border-[#11b505] overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#4d93fb]/5 to-[#11b505]/5 rounded-full blur-3xl -z-0" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#f1c34c]/5 to-[#11b505]/5 rounded-full blur-3xl -z-0" />

              <div className="relative z-10">
                <div className="mb-8 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#11b505]/10 to-[#4d93fb]/10 px-4 py-2 rounded-full mb-4"
                  >
                    <HiOutlineMail className="text-[#11b505]" />
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      {t("newsletterTag")}
                    </span>
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-bold Carena-font mb-4">
                    <span className="text-[#4d93fb] inline-block hover:scale-105 transition-transform">
                      {t("stayUpdated").split(" ")[0]}{" "}
                    </span>
                    <span className="text-[#f1c34c] inline-block hover:scale-105 transition-transform">
                      {t("stayUpdated").split(" ")[1]}
                    </span>
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {t("subscriptionDescription")}
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative group">
                    <HiOutlineMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#11b505] transition-colors duration-300" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      required
                      className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-[#11b505] focus:ring-4 focus:ring-[#11b505]/10 outline-none transition-all duration-300 text-gray-800 text-lg shadow-sm hover:shadow-md"
                      disabled={isLoading || isSubscribed}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading || isSubscribed}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative w-full py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-lg overflow-hidden ${
                      isSubscribed
                        ? "bg-green-600"
                        : "bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c]"
                    } disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-2xl`}
                  >
                    {/* Button shimmer effect */}
                    {!isSubscribed && !isLoading && (
                      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shine" />
                      </div>
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          {t("subscribing")}
                        </>
                      ) : isSubscribed ? (
                        <>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            ✓
                          </motion.span>
                          {t("subscribed")}
                        </>
                      ) : (
                        <>
                          {t("subscribe")}
                          <HiSparkles className="text-xl" />
                        </>
                      )}
                    </span>
                  </motion.button>

                  {isSubscribed && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl text-center text-green-700 font-semibold shadow-sm"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          🎉
                        </motion.span>
                        <span>{t("successMessage")}</span>
                      </div>
                    </motion.div>
                  )}

                  <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-1">
                    <span>🔒</span>
                    {t("privacyNote")}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Volunteer Application Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-[#4d93fb]/5 via-[#11b505]/5 to-[#f1c34c]/5 rounded-3xl shadow-xl p-8 md:p-12 overflow-hidden border border-gray-100">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#4d93fb]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-[#f1c34c]/10 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10 text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full mb-4 shadow-sm"
              >
                <FaHeart className="text-[#4d93fb] text-xl" />
                <span className="text-sm font-semibold text-gray-700">
                  {t("volunteer.subtitle")}
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold Carena-font leading-tight">
                <span className="text-[#4d93fb] inline-block hover:scale-105 transition-transform">
                  {t("volunteer.title").split(" ")[0]}{" "}
                </span>
                <span className="text-[#11b505] inline-block hover:scale-105 transition-transform">
                  {t("volunteer.title").split(" ")[1]}{" "}
                </span>
                <span className="text-[#f1c34c] inline-block hover:scale-105 transition-transform">
                  {t("volunteer.title").split(" ")[2] || ""}
                </span>
              </h2>

              <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
                {t("volunteer.description")}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <a
                  href="https://forms.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-12 py-6 bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] text-white font-bold text-xl rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {/* Button shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-shine" />
                    </div>

                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {t("volunteer.applyNow")}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </a>
                <p className="text-sm text-gray-600 mt-4">
                  {t("volunteer.formDescription")}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
