export const setEnvironment = () => {
  const nodeEnv = process.env.NODE_ENV;
  console.log(process.env.NODE_ENV);
  if (nodeEnv === 'test') return ['.env.test', '.env'];
  return '.env';
};
