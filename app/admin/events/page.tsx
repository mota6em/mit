"use client";
import { useEvents } from "../../../hooks/useEvents";
import EventForm from "../../../components/Events/EventForm";
import EventList from "../../../components/Events/EventList";

export default function AdminEvents() {
  const {
    events,
    loading,
    createOrUpdateEvent,
    form,
    setForm,
    isEditing,
    setIsEditing,
    handleEdit,
    handleCancel,
    resetForm,
  } = useEvents();

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto gap-4 flex flex-col">
        <EventForm
          form={form}
          setForm={setForm}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSubmit={createOrUpdateEvent}
          onCancel={handleCancel}
          loading={loading}
          resetForm={resetForm}
        />
        <EventList events={events} onEdit={handleEdit} />
      </div>
    </div>
  );
}
