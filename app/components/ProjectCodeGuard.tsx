import { useState, useEffect } from 'react';

interface ProjectCodeGuardProps {
  children: React.ReactNode;
}

export default function ProjectCodeGuard({ children }: ProjectCodeGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedAuth = localStorage.getItem('projectAuth');
    if (savedAuth) {
      const { timestamp } = JSON.parse(savedAuth);
      const now = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      if (now - timestamp < oneHour) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('projectAuth');
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === '2026') {
      const authData = { timestamp: Date.now() };
      localStorage.setItem('projectAuth', JSON.stringify(authData));
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mã code không đúng. Vui lòng thử lại.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Truy cập New Project</h2>
            <p className="text-sm text-gray-600 mt-1">
              Nhập mã code để truy cập tính năng tạo dự án mới.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Nhập mã code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}