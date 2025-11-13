
function Student(config) {
  return function (config, target) {
    Object.defineProperty(target.prototype, 'course', { value: () => config.course })
  }
}



@Student({
  course: "angular3"
})
class Person {
  constructor() {
  }

  public name() {
    return `kk`;
  }

  protected whoAreYou() {
    return `Hi i'm `;
  }
}
