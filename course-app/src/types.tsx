interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartsWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartsWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartsWithDescription {
  backroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround