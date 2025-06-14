
import React from 'react';
import { Link } from 'react-router-dom';

interface CourseBreadcrumbsProps {
  categories: string[];
}

const CourseBreadcrumbs: React.FC<CourseBreadcrumbsProps> = ({ categories }) => {
  return (
    <nav className="text-sm mb-4">
      {categories.map((category, index) => (
        <React.Fragment key={category}>
          {index < categories.length - 1 ? (
            <Link to="/courses" className="text-purple-400 hover:underline">
              {category}
            </Link>
          ) : (
            <span>{category}</span>
          )}
          {index < categories.length - 1 && <span className="mx-2">&gt;</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default CourseBreadcrumbs;
