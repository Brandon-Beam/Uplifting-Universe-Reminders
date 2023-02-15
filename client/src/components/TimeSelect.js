import DateTimePicker from 'react-datetime-picker';

export default function TimeSelect(props) {
  const value = props.value
  const onChange = props.onChange
  return (
    <div className="Sample__container">
      <main className="Sample__container__content">
        <DateTimePicker
          amPmAriaLabel="Select AM/PM"
          calendarAriaLabel="Toggle calendar"
          clearAriaLabel="Clear value"
          dayAriaLabel="Day"
          hourAriaLabel="Hour"
          maxDetail="second"
          minuteAriaLabel="Minute"
          monthAriaLabel="Month"
          nativeInputAriaLabel="Date and time"
          onChange={onChange}
          secondAriaLabel="Second"
          value={value}
          yearAriaLabel="Year"
        />
      </main>
      <button className="btn btn-success" onClick={() => console.log(value)}>verify time</button>
    </div>
  )
} 