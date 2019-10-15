

const getMethod = (method: string) => {
  switch (method) {
    case 'GET':
      return 'get';
      break;
    case 'POST':
      return 'post';
      break;
    case 'DELETE':
      return 'delete';
      break;
    case 'PUT':
      return 'put';
      break;
    default:
      return 'get'
  }
}

export default getMethod