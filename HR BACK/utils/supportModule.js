export const result = (data, statuscode, message, success) => {
    return {
      data: data,
      status: statuscode,
      message: message,
      success: success,
    };
  };