import { useState, useEffect } from "react";

import { getAllDiaries } from "./services/diaryService";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../../ilari_flight_diaries/src/types'

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries().then(data => { 
      setDiaries(data)
    })
  }, [])
}


export default App;
