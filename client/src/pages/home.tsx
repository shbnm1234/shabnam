import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Search,
  Calendar,
  Book,
  Users,
  Video,
  FileText,
  Star,
  GraduationCap,
  BookOpen,
  Rocket,
  Trophy,
  Target,
  Lightbulb,
  Heart,
  Globe,
} from "lucide-react";

// Define interfaces for the data fetched from the API
interface QuickAccessItem {
  id: string;
  title: string;
  link?: string;
  iconUrl?: string;
  backgroundColor?: string;
  iconColor?: string;
  description?: string;
  isActive?: boolean;
}

// Helper function to get icon components based on name
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    GraduationCap,
    BookOpen,
    Rocket,
    Star,
    Trophy,
    Target,
    Lightbulb,
    Heart,
    Globe,
  };

  const IconComponent = iconMap[iconName] || Star;
  return <IconComponent size={200} />;
};

export default function Home() {
  // State for the current slide in the hero carousel
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // Fetch data for quick access items
  const { data: quickAccessItems, isLoading: quickAccessLoading } = useQuery<QuickAccessItem[]>({
    queryKey: ['/api/quick-access'],
  });

  // Fetch data for slides
  const { data: slides, isLoading: slidesLoading } = useQuery<any[]>({
    queryKey: ['/api/slides/active'],
  });

  // Fetch data for courses
  const { data: courses, isLoading: coursesLoading } = useQuery<any[]>({
    queryKey: ['/api/courses'],
  });

  // Fetch data for projects
  const { data: projects, isLoading: projectsLoading } = useQuery<any[]>({
    queryKey: ['/api/projects'],
  });

  // Fetch data for workshops
  const { data: workshops, isLoading: workshopsLoading } = useQuery<any[]>({
    queryKey: ['/api/workshops'],
  });

  // Fetch data for magazines
  const { data: magazines, isLoading: magazinesLoading } = useQuery<any[]>({
    queryKey: ['/api/magazines'],
  });

  // Effect to automatically advance the carousel
  React.useEffect(() => {
    if (slides && slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [slides]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Slider */}
      <section className="relative h-96 md:h-[500px] overflow-hidden rounded-xl mb-8">
        <div className="relative w-full h-full">
          {slides && slides.length > 0 ? (
            slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className={`relative w-full h-full ${
                    slide.gradientFrom && slide.gradientTo
                      ? `bg-gradient-to-r from-${slide.gradientFrom} to-${slide.gradientTo}`
                      : "bg-gradient-to-r from-blue-600 to-purple-700"
                  } flex items-center justify-between px-8 md:px-16`}
                  style={{
                    backgroundImage: slide.imageUrl
                      ? `url(${slide.imageUrl})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {slide.imageUrl && (
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  )}

                  <div className="flex-1 text-white z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl">
                      {slide.description}
                    </p>

                    {slide.showButtons && (
                      <div className="flex flex-col sm:flex-row gap-4">
                        {slide.buttonText && slide.buttonUrl && (
                          <Link
                            to={slide.buttonUrl}
                            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center"
                          >
                            {slide.buttonText}
                          </Link>
                        )}
                        {slide.secondButtonText && slide.secondButtonUrl && (
                          <Link
                            to={slide.secondButtonUrl}
                            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                          >
                            {slide.secondButtonText}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  {slide.showIcon && slide.iconName && (
                    <div className="hidden md:flex flex-1 justify-center items-center">
                      <div className="text-white/20 transform scale-150">
                        {getIconComponent(slide.iconName)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            // Default slide if no slides are configured
            <div className="absolute inset-0">
              <div className="relative w-full h-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-between px-8 md:px-16">
                <div className="flex-1 text-white z-10">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    به پیستاط خوش آمدید
                  </h1>
                  <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl">
                    بهترین منبع آموزشی برای یادگیری و پیشرفت
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/courses"
                      className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center"
                    >
                      شروع یادگیری
                    </Link>
                    <Link
                      to="/about"
                      className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                    >
                      درباره ما
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Dots */}
        {slides && slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Quick Access */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">دسترسی سریع</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {!quickAccessLoading && quickAccessItems && quickAccessItems.filter(item => item.isActive).length > 0 ?
            quickAccessItems.filter(item => item.isActive).map((item) => (
            <Link
              key={item.id}
              to={item.link || '#'}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: item.backgroundColor || "hsl(270, 60%, 95%)",
                  }}
                >
                  {item.iconUrl ? (
                    <img
                      src={item.iconUrl}
                      alt={item.title}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <FileText
                      className="w-6 h-6"
                      style={{ color: item.iconColor || "hsl(270, 70%, 60%)" }}
                    />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-xs text-gray-500 line-clamp-2">
                    {item.description}
                  </span>
                )}
              </div>
            </Link>
          )) : (
            // Default quick access items
            [
              { icon: Book, label: "کتابخانه", href: "/library", bg: "hsl(220, 60%, 95%)", color: "hsl(220, 70%, 60%)" },
              { icon: Video, label: "دوره‌ها", href: "/courses", bg: "hsl(270, 60%, 95%)", color: "hsl(270, 70%, 60%)" },
              { icon: Calendar, label: "مجله‌ها", href: "/magazines", bg: "hsl(120, 60%, 95%)", color: "hsl(120, 70%, 60%)" },
              { icon: Users, label: "کارگاه‌ها", href: "/workshops", bg: "hsl(30, 60%, 95%)", color: "hsl(30, 70%, 60%)" },
              { icon: FileText, label: "پروژه‌ها", href: "/projects", bg: "hsl(0, 60%, 95%)", color: "hsl(0, 70%, 60%)" },
              { icon: Star, label: "وبینارها", href: "/webinars", bg: "hsl(180, 60%, 95%)", color: "hsl(180, 70%, 60%)" }
            ].map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: item.bg }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.label}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">دوره‌های ویژه</h2>
          <Link
            to="/courses"
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            مشاهده همه دوره‌ها
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!coursesLoading && courses && courses.length > 0 ? (
            courses.slice(0, 3).map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col"
              >
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={course.thumbnailUrl || "/placeholder-course.jpg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {course.isPremium && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                       ویژه
                    </span>
                  )}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {course.price === 0 ? "رایگان" : `${course.price} تومان`}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <GraduationCap size={16} />
                      {course.studentsEnrolled || 0} دانشجو
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // Default course cards
            [
              { title: "مقدمه‌ای بر برنامه نویسی پایتون", description: "یادگیری اصول اولیه برنامه نویسی با پایتون.", price: "رایگان", students: 1500, premium: false },
              { title: "طراحی رابط کاربری با فیگما", description: "آموزش جامع طراحی UI/UX با نرم افزار فیگما.", price: "250,000", students: 800, premium: true },
              { title: "یادگیری عمیق با تنسور فلو", description: "پروژه‌های عملی در یادگیری عمیق.", price: "400,000", students: 500, premium: true },
            ].map((course, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col"
              >
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={`/placeholder-course-${index + 1}.jpg`}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {course.premium && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      ویژه
                    </span>
                  )}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {course.price} تومان
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <GraduationCap size={16} />
                      {course.students} دانشجو
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Featured Webinars */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">وبینارهای ویژه</h2>
          <Link
            to="/webinars"
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            مشاهده همه وبینارها
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for webinar cards - replace with actual data fetching */}
          {[
            { title: "هوش مصنوعی در کسب و کار", description: "راهکارهای عملی هوش مصنوعی برای رشد کسب و کار.", date: "1403/05/10", instructor: "دکتر احمدی" },
            { title: "بازاریابی محتوایی دیجیتال", description: "استراتژی‌های موثر بازاریابی محتوایی.", date: "1403/05/15", instructor: "مهندس کریمی" },
            { title: "امنیت سایبری در دنیای امروز", description: "حفاظت از داده‌ها و سیستم‌ها در برابر تهدیدات.", date: "1403/05/20", instructor: "مهندس رضایی" },
          ].map((webinar, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col"
            >
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src={`/placeholder-webinar-${index + 1}.jpg`}
                  alt={webinar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  وبینار
                </span>
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {webinar.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {webinar.description}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">تاریخ برگزاری</span>
                    <span className="text-base font-semibold text-gray-900">
                      {webinar.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <User size={16} />
                    {webinar.instructor}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white py-12 px-8 md:px-16 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">درباره پیستاط</h2>
          <p className="text-lg opacity-90 mb-6">
            پیستاط یک پلتفرم آموزشی پیشرو است که با هدف توانمندسازی افراد از طریق
            یادگیری فراهم شده است. ما دوره‌ها و محتوای آموزشی با کیفیتی را در
            حوزه‌های مختلف ارائه می‌دهیم.
          </p>
          <Link
            to="/about"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            بیشتر بدانید
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/about-us-hero.png"
            alt="About Us"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
    </main>
  );
}