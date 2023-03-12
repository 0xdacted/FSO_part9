import { useState } from "react";
import { Visibility, Weather } from "../types";
import { createDiary } from "../services/diaryService";


const DiaryForm = () => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      await createDiary({ date, weather, visibility, comment })
      setDate('');
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Great);
      setComment('');
      setError(null);
    } catch(error: any) {
      setError(error);
    }
  };

  return (
    <form onSubmit={diaryCreation}>
      {error && <div>{error}</div>}
      <div>
        Date:
        <input 
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          />
      </div>
      <div>
        Weather: 
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
        Visibility: <select 
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
        Comment: <textarea
        id="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>  
    )
}

export default DiaryForm