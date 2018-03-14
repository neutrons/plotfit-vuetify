export default (md) => {
  const obj = {
    x: 'x',
    y: 'y',
  };

  if (typeof md === 'undefined') return obj;

  md.forEach((el) => {
    const xMatch = /^def_x/.exec(el);
    const yMatch = /^def_y/.exec(el);

    if (xMatch !== null) {
      obj.x = el.trim().split(' = ')[1];
    } else if (yMatch !== null) {
      obj.y = el.trim().split(' = ')[1];
    }
  });

  return obj;
};
