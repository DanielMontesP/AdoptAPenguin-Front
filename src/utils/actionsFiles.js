export const writeFile = (data) => {
  const element = document.createElement("a");
  const textFile = new Blob([JSON.stringify({ penguins: data })], {
    type: "text/plain",
  }); //pass data from localStorage API
  element.href = URL.createObjectURL(textFile);
  element.download = "penguins-export14.js";
  document.body.appendChild(element);
  element.click();
};
