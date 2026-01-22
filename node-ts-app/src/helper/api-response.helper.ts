interface ApiResponse<T> {
  response: T | undefined;
  message: string;
  status: number
}

function createApiResponse<T>(data: T | undefined, message: string): ApiResponse<T> {
  return {
    status: 200,
    response: data,
    message: message
  };
}

export { createApiResponse };
