import React from "react";

// Create the Label React component here

const Label = (value, color) => {
  const labelToReturn = `<div style="color:${color}">${value}</div>`;

  return labelToReturn;
};

// Modify this function if you want to change the preview
// It will not be evaluated as part of the assessment
export function Preview() {
  return <Label value={"Solution"} color={"blue"} />;
}

// Do not change
export default Label;
