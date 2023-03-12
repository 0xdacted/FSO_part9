import { CoursePart } from "../types";
import Part from "./Part";
interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part, i) => (
        <div key={i}>
        <h3>
          {part.name} {part.exerciseCount}
        </h3>
        <Part coursePart={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;