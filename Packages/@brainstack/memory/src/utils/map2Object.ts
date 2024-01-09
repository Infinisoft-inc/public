export function mapToObject<T>(map: Map<string, T>): { [key: string]: T } {
    const obj: { [key: string]: T } = {};
  
    map.forEach((value, key) => {
      obj[key] = value;
    });
  
    return obj;
  }