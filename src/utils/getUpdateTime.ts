
const getNowTime = () => Number(new Date());

const getUpdateTime = () => {
  let num = getNowTime();
  return { updatedAt: num };
};

export default getUpdateTime;