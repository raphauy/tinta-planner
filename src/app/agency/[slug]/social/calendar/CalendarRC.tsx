"use client"

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomEvent, { Event } from './CustomEvent';
import 'moment/locale/es';


moment.locale('es');
const localizer = momentLocalizer(moment);


interface MyCalendarProps {
  events: Event[];
}

const CalendarRC: React.FC<MyCalendarProps> = ({ events }) => {

    const customEventPropGetter = (event: Event) => {
     
      return {
        style: {
          backgroundColor: "transparent",
          padding: "0px",
          //border: '1px solid',
          //borderColor: '#9ca3af',
        },
      };
    };

  return (
    <div className="flex-grow bg-white min-h-[500px]">
      {/** @ts-ignore */}
      <Calendar 
        components={{
          // @ts-ignore
          event: CustomEvent,
        }}
        localizer={localizer}
        culture='es'
        events={events}
        startAccessor="start"
        endAccessor="end"        
        eventPropGetter={customEventPropGetter}        
      />
    </div>
  );
};

export default CalendarRC;