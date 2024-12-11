/**
 * Decorator to mark a constructor parameter for dependency injection.
 * @param target - The target class.
 * @param propertyKey - The name of the constructor (always `'constructor'`).
 * @param parameterIndex - The index of the parameter to inject.
 */

export function Inject(
  target: any,
  propertyKey: string | symbol | undefined,
  parameterIndex: number
) {
  const existingInjectedParams: number[] =
    Reflect.getMetadata('inject_params', target, propertyKey!) || [];
  existingInjectedParams.push(parameterIndex);
  Reflect.defineMetadata(
    'inject_params',

    existingInjectedParams,
    target,
    propertyKey!
  );
}


// // src/decorators/Inject.ts
// import 'reflect-metadata';

// export function Inject(token?: any) { //<-- Added optional token
//   return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
//       const existingParams = Reflect.getMetadata('inject_params', target) || [];
//       existingParams.push({index:parameterIndex, token});
//       Reflect.defineMetadata('inject_params', existingParams, target);

//   };
// }
