export const success = (message, data) => ({
  success: true,
  message,
  data,
});

export const failed = (message, error) => ({
  success: false,
  message,
  error,
});
