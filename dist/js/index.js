const dateFormatter = (date, format) => {
  return moment(date).locale("tr").format(format);
};

export { dateFormatter };
