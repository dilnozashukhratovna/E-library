import { Response } from 'express';

const errorHandler = (res: Response, error: Error): void => {
  res.status(500).send(`Server Error: ${error.message}`);
};

export { errorHandler }; 
