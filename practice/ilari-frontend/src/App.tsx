import { useState, useEffect } from "react";

import { getAllDiaries } from "./services/diaryService";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  
  useEffect(() => {
    getAllDiaries().then(data => { 
      setDiaries(data)
    })
  }, [])
  console.log(diaries)
  return (
    <div>
      {diaries.map((diary, i) => (
        <div key={i}>
          <h3>{diary.date}</h3>
          <p>{diary.weather} {diary.visibility}</p>
        </div>
      ))}
    </div>
  );
}

export default App;