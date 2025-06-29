import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface BecomeTeacherLinkProps {
  children: React.ReactNode;
  className?: string;
}

const BecomeTeacherLink: React.FC<BecomeTeacherLinkProps> = ({ children, className }) => {
  const { user } = useAuth();

  // If user is logged in and is already an instructor, redirect to instructor dashboard
  // Otherwise, always go to become teacher page (accessible to all)
  const linkTo = user?.role === 'instructor' ? '/instructor/dashboard' : '/become-teacher';

  return (
    <Link to={linkTo} className={className}>
      {children}
    </Link>
  );
};

export default BecomeTeacherLink;
