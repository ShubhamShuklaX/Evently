import MyEventsHeader from "../../components/Organizer/MyEvents/MyEventsHeader";
import MyEventsStats from "../../components/Organizer/MyEvents/MyEventsStats";
import MyEventsFilters from "../../components/Organizer/MyEvents/MyEventsFilters";
import EventsTable from "../../components/Organizer/MyEvents/EventsTable";
import Sidebar from "./Sidebar";

const EventsManagement = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-10 flex flex-col gap-8">
        <MyEventsHeader />
        <MyEventsStats />
        <MyEventsFilters />
        <EventsTable />
      </div>
    </div>
  );
};

export default EventsManagement;
