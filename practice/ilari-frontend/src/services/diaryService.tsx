import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../../../ilari_flight_diaries/src/types'

const baseUrl = 'http:localhost:3001/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data)
}
