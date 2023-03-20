const firstArray = [1, 10];

function solution(A) {
  // Implement your solution here
  let lastNumber = 1;

  firstArray.forEach(function (entry) {
    if (entry > 1 && entry < lastNumber) {
      lastNumber = entry;
    }
  });
  return lastNumber;
}

solution(firstArray);
