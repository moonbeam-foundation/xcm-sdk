enum Test {
  a = 'a',
  b = 'b',
}

type A = {
  a: 'a';
};

type B = {
  b: 'b';
};

function func<T extends Test>(test: T): T extends Test.a ? A : B {
  if (test === Test.a) return { a: 'a' };

  return { b: 'b' };
}

const res = func(Test.a);
const res2 = func(Test.b);

console.log(res, res2);
