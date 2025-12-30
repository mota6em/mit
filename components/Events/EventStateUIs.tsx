import Link from "next/link";

export const LoadingUI = ({ message }: { message: string }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
    <p className="text-primary font-semibold Carena-font tracking-wide">
      {message}
    </p>
  </div>
);

export const ErrorUI = ({ title, desc, backText, locale }: any) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
    <h1 className="text-3xl font-bold text-primary mb-3 Carena-font">
      {title}
    </h1>
    <p className="text-muted-foreground mb-6 max-w-sm text-sm">{desc}</p>
    <Link
      href={`/${locale}/events`}
      className="px-6 py-2 bg-primary text-white rounded-full font-bold shadow-md text-sm"
    >
      {backText}
    </Link>
  </div>
);
