/*
  Function to get default fields from TAS metadata.
  In the metadata there are two classifications:
    1) 'def_x = [some field name]'
    2) 'def_y = [some field name]'

  Use this information to return an object with the extract values.
*/

export default (md) => {
  const obj = {
    x: 'x',
    y: 'y',
  };

  if (typeof md === 'undefined') return obj;

  // clean up punctuations, spaces, and lowercase
  // this is to match exactly to column header names
  function formatField(value) {
    return value.trim().split(' = ')[1]
    .replace(/\./, '')
    .toLowerCase();
  }

  md.forEach((el) => {
    const xMatch = /^def_x/.exec(el);
    const yMatch = /^def_y/.exec(el);

    if (xMatch !== null) {
      obj.x = formatField(el);
    } else if (yMatch !== null) {
      obj.y = formatField(el);
    }
  });

  return obj;
};
