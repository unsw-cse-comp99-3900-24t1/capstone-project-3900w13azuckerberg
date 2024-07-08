import React, { useState, useEffect, useRef } from "react";
import Icon from "./timelineButton";
import Calendar from "react-calendar"; // Import Calendar component
import "react-calendar/dist/Calendar.css"; // Import Calendar CSS
import "./calendar.css";
import "./button.css";
import "./slider.css";

interface TimelineSliderProps {
  onDateChange: (date: Date) => void;
  date: Date;
}

const Slider: React.FC<TimelineSliderProps> = ({ date, onDateChange }) => {
  const startDate = new Date("2020-01-01"); // Start date for the timeline
  const endDate = new Date("2023-12-31"); // End date (current date)

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [playback, setPlayback] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [playbackIcon, setPlaybackIcon] = useState<String>("play_arrow");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(event.target.value);
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + days);
    onDateChange(newDate);
  };

  const handleCalendar = (newDate: Date) => {
    onDateChange(newDate);

    setShowCalendar(false); // Close calendar after selecting date
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
  
    const updateDay = () => {
      const newDay = new Date(date);
      newDay.setDate(newDay.getDate() + 1);
  
      if (newDay <= new Date(endDate)) {
        onDateChange(newDay);
        if (playback) {
          timer = setTimeout(updateDay,500 / speed);
        }
      } else {
        onDateChange(startDate);
      }
    };
  
    if (playback) {
      timer = setTimeout(updateDay, 1000 / speed);
    }
  
    return () => clearTimeout(timer); // Clean up the timeout
  }, [playback, speed, date, onDateChange]);

  function handlePlayback(): void {
    setPlayback(current => {
      setPlaybackIcon(current ? "play_arrow" : "pause");
      return !current;
    });
  }

  // Calculate number of days between start and end dates
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
  );

  const handleDecreaseSpeed = () => {
    if (speed > 0.25) {
        setSpeed(speed - 0.25);
    }
  };

  const handleIncreaseSpeed = () => {
    if (speed < 5) {
        setSpeed(speed + 0.25);
    }
  };


  return (
    <div>
      <div className="timeline">
        <Icon
          icon="fast_rewind"
          onClick={() => handleDecreaseSpeed()}
        />
        <div style={{ padding: '5px' }}> {speed.toFixed(2)}x </div>
        <Icon
          icon="fast_forward"
          onClick={() => handleIncreaseSpeed()}
        />
        <Icon
          icon={playbackIcon}

          onClick={() => handlePlayback()}
        />
        <button
          className="button"
          onClick={() => setShowCalendar(true)}
          style={{ minWidth: '150px' }}
        >
          {date.toDateString()}
        </button>
        <div className="slider">
          <input
            type="range"
            id="timeline-slider"
            name="timeline-slider"
            min={0}
            max={totalDays}
            step={1}
            value={Math.ceil(
              (date.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
            )}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="calendar-container" ref={calendarRef}>
        {showCalendar && (
          <Calendar
            className="react-calendar"
            value={date}
            onClickDay={handleCalendar}
          />
        )}
      </div>
    </div>
  );
};

export default Slider;
