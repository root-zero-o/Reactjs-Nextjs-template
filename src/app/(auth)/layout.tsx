import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h3>Auth layout</h3>
      {children}
    </div>
  );
};

export default AuthLayout;
