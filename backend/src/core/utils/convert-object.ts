export function convertToObject(input: string): object[] {
  const objArray: object[] = [];
  const pairs: string[] = input.split(';');

  for (let pair of pairs) {
    const properties: string[] = pair.split(',');

    const obj: { [key: string]: number | boolean } = {};
    for (let prop of properties) {
      const [key, value] = prop.split(':');
      obj[key] = isNaN(Number(value)) ? value === 'true' : parseFloat(value);
    }

    objArray.push(obj);
  }

  return objArray;
}
