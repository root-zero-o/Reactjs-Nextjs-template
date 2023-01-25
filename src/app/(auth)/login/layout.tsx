import React from 'react';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h3>로그인 레이아웃</h3>
      {children}
    </div>
  );
};

export default LoginLayout;
