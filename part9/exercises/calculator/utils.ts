export const parseArguments = (
  args: string[], 
  numArgsExpected: number, 
  callbackFunction: (args: string[]) => any | null = (args: string[]) => args,
  numArgsOptional: number = 0
  ) : any => {
  if (args.length < 2 + numArgsExpected) throw new Error(`Expected ${2 + numArgsExpected} arguments, got ${args.length}`);
  // Do not throw num args expected error if numArgsOptional is -1 and there are more args than expected
  const numAllowableArgs: number = 2 + numArgsExpected + numArgsOptional;
  if (numArgsOptional !== -1 && (args.length > numAllowableArgs)) throw new Error(`Expected ${2 + numArgsExpected} to ${numAllowableArgs} arguments, got ${args.length}`);

  return callbackFunction(args);
}

export const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));