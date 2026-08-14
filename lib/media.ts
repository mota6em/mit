export const PHOTO = {
  mosqueTalk: "/imgs/community/mosque-talk.jpg",
  parkPicnic: "/imgs/community/park-picnic.jpg",
  springOuting: "/imgs/community/spring-outing.jpg",
  techWorkshop: "/imgs/community/tech-workshop.jpg",
  studyCircle: "/imgs/community/study-circle.jpg",
  summerProgram: "/imgs/community/summer-program.jpg",
  winterMeetup: "/imgs/community/winter-meetup.jpg",
  openFloor: "/imgs/community/open-floor.jpg",
  quranSession: "/imgs/community/quran-session.jpg",
  internshipGraduation: "/imgs/community/internship-graduation.jpg",
  femysoAward: "/imgs/community/femyso-award.jpg",
  mitBadgePecs: "/imgs/community/mit-badge-pecs.jpg",
} as const;

export const BRAND = {
  logoWordmark: "/imgs/icons/mit-nav-logo.png",
  logoWordmarkLight: "/imgs/icons/mit-nav-logo-light.png",
  logoLight: "/imgs/icons/mit-logo-light.png",
  logoSquare: "/imgs/icons/mit-logo-full-resized.png",
  mark: "/imgs/icons/icon.jpg",
} as const;

export type PhotoKey = keyof typeof PHOTO;

export const HOME_STAGE: PhotoKey[] = [
  "mosqueTalk",
  "parkPicnic",
  "springOuting",
  "techWorkshop",
  "studyCircle",
];
