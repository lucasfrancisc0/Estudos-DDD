import { left, right } from "./either";

test("sucess result", () => {
  const sucess = right("sucess");

  expect(sucess.value).toEqual("sucess");
});

test("error result", () => {
  const error = left("error");

  expect(error.value).toEqual("error");
});
