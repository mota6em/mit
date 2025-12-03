export interface Program {
  id: string;
  img: string;
  titleKey: string;
  descKey: string;
  date: string;
  status: "upcoming" | "past";
}

export const programs: Program[] = [
  {
    id: "youth-leadership",
    img: "/imgs/hero/hero-bg-1.jpg",
    titleKey: "programs.youthLeadership.title",
    descKey: "programs.youthLeadership.desc",
    date: "Dec 15, 2025",
    status: "upcoming",
  },
  {
    id: "community-football",
    img: "/imgs/hero/hero-bg-3.jpg",
    titleKey: "programs.communityFootball.title",
    descKey: "programs.communityFootball.desc",
    date: "Dec 20, 2025",
    status: "upcoming",
  },
  {
    id: "winter-charity",
    img: "/imgs/hero/hero-bg-4.jpg",
    titleKey: "programs.winterCharity.title",
    descKey: "programs.winterCharity.desc",
    date: "Dec 25, 2025",
    status: "upcoming",
  },
  {
    id: "ramadan-iftar",
    img: "/imgs/hero/hero-bg-2.jpg",
    titleKey: "programs.ramadanIftar.title",
    descKey: "programs.ramadanIftar.desc",
    date: "Nov 10, 2025",
    status: "past",
  },
  {
    id: "quran-study",
    img: "/imgs/hero/hero-bg-5.jpg",
    titleKey: "programs.quranStudy.title",
    descKey: "programs.quranStudy.desc",
    date: "Nov 5, 2025",
    status: "past",
  },
  {
    id: "charity-drive",
    img: "/imgs/hero/hero-bg-6.jpg",
    titleKey: "programs.charityDrive.title",
    descKey: "programs.charityDrive.desc",
    date: "Oct 28, 2025",
    status: "past",
  },
];
