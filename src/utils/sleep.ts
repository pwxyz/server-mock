

/*
num  秒数
*/
const sleep = async (num: number) => new Promise((resolve) => setTimeout(resolve, num * 1000))


export default sleep