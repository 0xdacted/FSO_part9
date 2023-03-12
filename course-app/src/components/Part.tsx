import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  switch(coursePart.kind) {
    case "basic":
      return (
        <div>
        </div>
      );
    case "group": 
      return (
        <div>
          <p> project exercises {coursePart.groupProjectCount} </p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>{coursePart.description}</p>
          <p>required background material: {coursePart.backroundMaterial}</p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;