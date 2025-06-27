import React, { useState } from 'react';
import { Search, ShoppingCart, Globe, Menu, User, Bell, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { Language, Labels, LabelsVI } from '@/constants/labels';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState(Language.EN);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      toast.success(`Searching for: ${searchQuery.trim()}`);
    } else {
      navigate('/search');
      toast.info('Opening search page');
    }
  };

  const handleToggleLanguage = (lang: Language) => {
    setLanguage(lang);
    toast.success(`Language changed to ${lang === Language.EN ? 'English' : 'Vietnamese'}`);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleCartClick = () => {
    if (!user) {
      toast.error('Please log in to view your cart');
      navigate('/auth');
      return;
    }
    navigate('/cart');
  };

  const handleNotificationClick = () => {
    if (!user) {
      toast.error('Please log in to view notifications');
      navigate('/auth');
      return;
    }
    navigate('/student/notifications');
  };

  const handleMyLearningClick = () => {
    if (!user) {
      toast.error('Please log in to access your learning');
      navigate('/auth');
      return;
    }
    navigate('/courses');
  };

  const handleBecomeTeacherClick = () => {
    if (!user) {
      toast.error('Please log in to become an instructor');
      navigate('/auth');
      return;
    }
    if (user.role !== 'instructor') {
      toast.info('Contact support to become an instructor');
      return;
    }
    navigate('/instructor/dashboard');
  };

  const getUserDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin-dashboard';
      case 'instructor':
        return '/instructor-dashboard';
      case 'student':
        return '/student-dashboard';
      default:
        return '/';
    }
  };

  const t = (labelKey: keyof typeof Labels) =>
    language === Language.EN ? Labels[labelKey] : LabelsVI[labelKey];

  const categories = [
    {
      title: language === Language.EN ? "Development" : "Lập trình",
      subcategories: language === Language.EN
        ? ["Web Development", "Mobile Development", "Programming Languages", "Game Development", "Database Design", "Software Testing", "Software Engineering", "Development Tools"]
        : ["Web", "Mobile", "Ngôn ngữ lập trình", "Game", "Thiết kế Database", "Kiểm thử phần mềm", "Kỹ thuật phần mềm", "Công cụ lập trình"]
    },
    {
      title: language === Language.EN ? "Business" : "Kinh doanh",
      subcategories: language === Language.EN
        ? ["Entrepreneurship", "Communications", "Management", "Sales", "Business Strategy", "Operations", "Project Management", "Business Law"]
        : ["Khởi nghiệp", "Giao tiếp", "Quản lý", "Bán hàng", "Chiến lược", "Vận hành", "Quản lý dự án", "Luật kinh doanh"]
    },
    {
      title: language === Language.EN ? "Finance & Accounting" : "Tài chính & Kế toán",
      subcategories: language === Language.EN
        ? ["Accounting & Bookkeeping", "Compliance", "Cryptocurrency & Blockchain", "Economics", "Finance", "Finance Cert & Exam Prep", "Financial Modeling & Analysis", "Investing & Trading"]
        : ["Kế toán", "Tuân thủ", "Tiền điện tử & Blockchain", "Kinh tế học", "Tài chính", "Chứng chỉ & Ôn thi", "Phân tích tài chính", "Đầu tư & Giao dịch"]
    },
    {
      title: language === Language.EN ? "IT & Software" : "CNTT & Phần mềm",
      subcategories: language === Language.EN
        ? ["IT Certifications", "Network & Security", "Hardware", "Operating Systems", "Other IT & Software"]
        : ["Chứng chỉ CNTT", "Mạng & An ninh", "Phần cứng", "Hệ điều hành", "Khác"]
    },
    {
      title: language === Language.EN ? "Office Productivity" : "Năng suất văn phòng",
      subcategories: language === Language.EN
        ? ["Microsoft", "Apple", "Google", "SAP", "Oracle", "Other Office Productivity"]
        : ["Microsoft", "Apple", "Google", "SAP", "Oracle", "Khác"]
    },
    {
      title: language === Language.EN ? "Personal Development" : "Phát triển bản thân",
      subcategories: language === Language.EN
        ? ["Personal Transformation", "Personal Productivity", "Leadership", "Career Development", "Parenting & Relationships", "Happiness"]
        : ["Chuyển hóa bản thân", "Năng suất cá nhân", "Lãnh đạo", "Phát triển sự nghiệp", "Phụ huynh & Quan hệ", "Hạnh phúc"]
    },
    {
      title: language === Language.EN ? "Design" : "Thiết kế",
      subcategories: language === Language.EN
        ? ["Web Design", "Graphic Design & Illustration", "Design Tools", "User Experience Design", "Game Design", "3D & Animation", "Fashion Design", "Architectural Design"]
        : ["Web", "Đồ họa & Minh họa", "Công cụ thiết kế", "Trải nghiệm người dùng", "Game", "3D & Hoạt họa", "Thời trang", "Kiến trúc"]
    },
    {
      title: language === Language.EN ? "Marketing" : "Marketing",
      subcategories: language === Language.EN
        ? ["Digital Marketing", "Search Engine Optimization", "Social Media Marketing", "Branding", "Marketing Fundamentals", "Analytics & Automation", "Public Relations", "Advertising"]
        : ["Digital Marketing", "SEO", "Marketing mạng xã hội", "Xây dựng thương hiệu", "Cơ bản", "Phân tích & Tự động hóa", "Quan hệ công chúng", "Quảng cáo"]
    }
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Categories */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded"></div>
              <span className="text-2xl font-bold text-gray-900">{t("ELITE_KNOWLEDGE")}</span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden lg:flex items-center space-x-1 text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200 font-medium">
                  <Menu className="w-4 h-4" />
                  <span>{t("CATEGORIES")}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[800px] max-h-[500px] overflow-y-auto bg-white shadow-xl border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-6">
                  {categories.map((category) => (
                    <div key={category.title} className="space-y-3">
                      <h3 className="font-bold text-lg text-purple-700 border-b border-gray-100 pb-2">
                        {category.title}
                      </h3>
                      <div className="space-y-1">
                        {category.subcategories.slice(0, 6).map((sub) => (
                          <Link 
                            key={sub} 
                            to={`/search?category=${encodeURIComponent(sub.toLowerCase())}`}
                            className="block text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-2 py-1 rounded transition-colors duration-150"
                          >
                            {sub}
                          </Link>
                        ))}
                        {category.subcategories.length > 6 && (
                          <Link 
                            to={`/search?category=${encodeURIComponent(category.title.toLowerCase())}`}
                            className="block text-sm text-purple-600 hover:text-purple-700 px-2 py-1 font-medium"
                          >
                            {language === Language.EN ? `Show all ${category.title}` : `Xem tất cả ${category.title}`}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder={t("SEARCH_PLACEHOLDER")} 
                className="pl-10 h-12 border-gray-900 focus:border-purple-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/elite-education" className="hidden lg:block text-gray-600 hover:text-purple-600">
              {t("ELITE_EDUCATION")}
            </Link>
            
            <button 
              onClick={handleBecomeTeacherClick}
              className="hidden lg:block text-gray-600 hover:text-purple-600"
            >
              {t("BECOME_TEACHER")}
            </button>
            
            <Link to="/blog" className="hidden lg:block text-gray-600 hover:text-purple-600">
              {t("BLOG")}
            </Link>
            
            <button 
              onClick={handleMyLearningClick}
              className="hidden lg:block text-gray-600 hover:text-purple-600"
            >
              {t("MY_LEARNING")}
            </button>

            {user && (
              <button className="relative" onClick={handleNotificationClick}>
                <Bell className="w-6 h-6 text-gray-600" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
              </button>
            )}

            <button onClick={handleCartClick} className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                2
              </Badge>
            </button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-purple-600 capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to={getUserDashboardLink()}>
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">{t("LOGIN")}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth">{t("SIGNUP")}</Link>
                </Button>
              </>
            )}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-600 focus:outline-none" aria-label="Change language">
                  <Globe className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  onClick={() => handleToggleLanguage(Language.EN)}
                  className={language === Language.EN ? "bg-purple-100 font-bold" : ""}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleToggleLanguage(Language.VI)}
                  className={language === Language.VI ? "bg-purple-100 font-bold" : ""}
                >
                  Tiếng Việt
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
