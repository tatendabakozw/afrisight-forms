const getMessage = (err: any): string => {
  if (err.response) {
    if (err.response.data) {
      if (err.response.data.message) {
        return err.response.data.message;
      } else if (err.response.data.error) {
        return err.response.data.error;
      }
    }
    if (err.response.statusText) {
      return `${err.response.status} - ${err.response.statusText}`;
    }
  } else if (err.message) {
    return err.message;
  } else if (err.toString) {
    return err.toString();
  }

  return "An unknown error occurred";
};

export { getMessage };
