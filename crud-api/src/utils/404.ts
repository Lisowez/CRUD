const is404 = (pathname: string, method: string): boolean => {
  return (
    (pathname === '/api/users' && method === 'GET') ||
    (pathname?.startsWith('/api/users') &&
      pathname.split('/').length === 4 &&
      method === 'GET') ||
    (pathname === '/api/users' && method === 'POST') ||
    (pathname?.startsWith('/api/users') &&
      pathname.split('/').length === 4 &&
      method === 'PUT') ||
    (pathname?.startsWith('/api/users') &&
      pathname.split('/').length === 4 &&
      method === 'DELETE')
  );
};

export default is404;
