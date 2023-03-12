import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";
import { createDiary } from "../services/diaryService";

type Props = {
  onSubmit: (values: NewDiaryEntry) => void
};

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('')

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    onSubmit({ date, weather, visibility, comment })
    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment('');
  };

  return (
    <form onSubmit={diaryCreation}>
      <div>
        <input 
          id="date"
          type="text"
          value={date}
          onChange{(event) => setDate(event.target.value)}
          />
      </div>
      <div>
        <select
          id="weather"
          value={weather}
          onChange={(event) => setWeather(event.target.value as Weather)} 
        >
          {Object.values(Weather).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select 
          id="visibility"
          value={visibility}
          onChange={(event) => setVisibility(event.target.value as Visibility)}
        >
          {Object.values(Visibility).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
        id="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>  
    )
}