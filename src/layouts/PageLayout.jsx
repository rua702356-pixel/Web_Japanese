import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

const PageLayout = ({
  children,
  title,
  description,
  showBreadcrumb = true,
  showFooter = true,
  maxWidth = 'full',
  className = '',
  headerActions,
  sidebar
}) => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Trang chủ', href: '/' }
    ];

    const routeMap = {
      'lessons': 'Bài học',
      'dictionary': 'Từ điển',
      'flashcards': 'Luyện tập',
      'quiz': 'Kiểm tra',
      'progress': 'Tiến độ',
      'jlpt': 'JLPT',
      'profile': 'Hồ sơ',
      'admin': 'Quản trị',
      'vocabulary': 'Từ vựng',
      'grammar': 'Ngữ pháp',
      'alphabet': 'Bảng chữ cái',
      'users': 'Người dùng',
      'settings': 'Cài đặt'
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        label: routeMap[segment] || segment,
        href: isLast ? undefined : currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const maxWidthClass = {
    sm: 'container-sm',
    md: 'container-md',
    lg: 'container-lg',
    xl: 'container-xl',
    '2xl': 'container-2xl',
    full: 'container-full'
  }[maxWidth];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="page-header">
        <Navbar />
      </header>
      
      {/* Main Content */}
      <main className="page-main">
        <div className="page-content">
          <div className={`container ${maxWidthClass} ${className}`}>
            {/* Breadcrumb Navigation */}
            {showBreadcrumb && breadcrumbs.length > 1 && (
              <div className="mb-6">
                <nav className="breadcrumb-nav" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {breadcrumbs.map((breadcrumb, index) => (
                      <li key={index} className="flex items-center">
                        {breadcrumb.href ? (
                          <Link 
                            to={breadcrumb.href} 
                            className="breadcrumb-link flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            {index === 0 && <Home className="w-4 h-4" />}
                            {breadcrumb.label}
                          </Link>
                        ) : (
                          <span className="breadcrumb-current flex items-center gap-1 text-foreground font-medium">
                            {index === 0 && <Home className="w-4 h-4" />}
                            {breadcrumb.label}
                          </span>
                        )}
                        {index < breadcrumbs.length - 1 && (
                          <ChevronRight className="w-4 h-4 ml-2 text-muted-foreground" aria-hidden="true" />
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            )}

            {/* Page Header */}
            {(title || description || headerActions) && (
              <div className="page-header-content mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="page-header-text">
                    {title && (
                      <h1 className="page-title text-3xl font-bold text-foreground mb-2">
                        {title}
                      </h1>
                    )}
                    {description && (
                      <p className="page-description text-muted-foreground text-lg">
                        {description}
                      </p>
                    )}
                  </div>
                  {headerActions && (
                    <div className="page-header-actions flex items-center gap-2">
                      {headerActions}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className={sidebar ? "content-with-sidebar grid grid-cols-1 lg:grid-cols-4 gap-8" : "content-full"}>
              {sidebar && (
                <aside className="sidebar lg:col-span-1">
                  <div className="sidebar-content sticky top-6">
                    {sidebar}
                  </div>
                </aside>
              )}
              <div className={sidebar ? "main-content lg:col-span-3" : "main-content"}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="page-footer">
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default PageLayout;