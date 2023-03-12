import { CoursePart } from "../types";

const Part = (coursePart: CoursePart) => {
  switch(coursePart.kind) {
    case "basic":
      return (
        <div>
          <h3>
          {coursePart.name} {coursePart.exerciseCount}
          </h3>
        </div>
      );
    case "group": 
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p> project exercises {coursePart.groupProjectCount} </p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
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