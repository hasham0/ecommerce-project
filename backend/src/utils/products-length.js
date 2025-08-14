const checkEmptyData = (response, data, emptyMsg) => {
  return response.status(200).json({
    message: emptyMsg || "No data found",
    data: data.length !== 0 ? data : [],
  });
};

export default checkEmptyData;
