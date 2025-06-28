
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface BecomeTeacherLinkProps {
  children: React.ReactNode;
  className?: string;
}

const BecomeTeacherLink: React.FC<BecomeTeacherLinkProps> = ({ children, className }) => {
  const { user } = useAuth();

  // If user is logged in, redirect to instructor dashboard
  // If not logged in, go to become teacher landing page
  const linkTo = user ? '/instructor/dashboard' : '/become-teacher';

  return (
    <Link to={linkTo} className={className}>
      {children}
    </Link>
  );
};

export default BecomeTeacherLink;
