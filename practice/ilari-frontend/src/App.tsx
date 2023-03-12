import { useState, useEffect } from "react";
import DiaryForm from "./components/DiaryForm";

import { getAllDiaries, createDiary } from "./services/diaryService";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  
  useEffect(() => {
    getAllDiaries().then(data => { 
      setDiaries(data)
    })
  }, [])



  return (
  
    <div>
      <DiaryForm />
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