import React from "react";
import { ReservationsItem } from "components/atoms/ReservationsItem/ReservationsItem";
import Door from "../../../assets/door.svg";
import Book from "../../../assets/book.svg";
import Phone from "../../../assets/phone.svg";
import "./reservations-section.scss";
import PropTypes from "prop-types";

export const ReservationsSection = ({ reservationData }) => {
  const reservationArray = reservationData && Object.entries(reservationData);

  const nameMatcher = (name) => {
    switch (name) {
      case "books":
        return "Meeting Rooms";
      default:
        return name;
    }
  };
  const imageMatcher = (image) => {
    switch (image) {
      case "books":
        return Book;
      case "rooms":
        return Door;
      case "devices":
        return Phone;
      default:
        return Door;
    }
  };

  return (
    <div className="reservations-section">
      <h2 className="reservations-section__header">Reservations</h2>
      <div className="reservations-section__element-container">
        {reservationArray
          ? reservationArray.map((obj, index) => {
              return (
                <ReservationsItem
                  reservationName={nameMatcher(obj[0])}
                  reservationNumber={obj[1].length}
                  reservationImage={imageMatcher(obj[0])}
                  key={index}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};
ReservationsSection.propTypes = {
  reservationData: PropTypes.object,
};
