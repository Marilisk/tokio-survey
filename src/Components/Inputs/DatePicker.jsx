import React from "react";
import c from './DatePicker.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

const DateInput = ({onInputChange, questionId, inputValue}) => {
 
  const oninput = (date) => {
    onInputChange(date, 'date', questionId);
  }

  return <div className={c.main}>
    <DatePicker 
      selected={inputValue}
      onChange={(date) => oninput(date)} 
      showTimeSelect
      locale={"pt-br"}
      filterDate = {(date) => {
        return moment() > date;
      }}
      popperClassName={c.popper}
      className={c.field}
      dayClassName={ (date) => date && c.day }
      dateFormat="dd.MM.yyyy HH:mm" 
      timeFormat={"HH:mm"}
      calendarClassName={c.calendar}
      placeholderText={'введите дату и время'}      
     />
  </div>

}

export default DateInput;
