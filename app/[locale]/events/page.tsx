import EventsSection from "@/components/Events/EventsSection";

const page = () => {
  return (
    <div className="flex flex-col gap-8">
      <EventsSection type="upcoming" />
      <EventsSection type="past" />
    </div>
  );
};

export default page;
