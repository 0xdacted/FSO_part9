import { useState, useEffect } from "react";
import DiaryForm from "./components/DiaryForm";

import { getAllDiaries } from "./services/diaryService";
import { DiaryEntry, } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  
  useEffect(() => {
    getAllDiaries().then(data => { 
      setDiaries(data)
    })
  }, [diaries])

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