
const checkLimitAndPage = (limit, page) => {
  if (checkInteger(limit) && checkInteger(page)) {
    return {
      err: null,
      limit: Number(limit),
      page: Number(page),
      skip: Number(page) - 1
    };
  }
  else {
    return {
      err: 'limit或者page應該為整數且均大於一'
    };
  }
};

const checkInteger = arg => /^[1-9]+\d*$/.test(arg);


export default checkLimitAndPage;