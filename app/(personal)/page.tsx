'use client'

import Image from 'next/image'
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Typewriter from 'typewriter-effect'
import {
  FaArrowRight,
  FaAws,
  FaCloud,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGitAlt,
  FaGithub,
  FaJava,
  FaLinkedin,
  FaMapMarkerAlt,
  FaNodeJs,
  FaPhoneAlt,
  FaServer,
  FaReact,
  FaVuejs,
  FaAngular,
  FaPython,
} from 'react-icons/fa'
import {
  SiGithubactions,
  SiExpress,
  SiGooglecloud,
  SiMariadb,
  SiMongodb,
  SiRedis,
  SiSocketdotio,
  SiSpringboot,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
} from 'react-icons/si'

// ---------- Dữ liệu ----------
const profile = {
  name: 'Hồ Huỳnh Hoài Thịnh',
  role: 'Fullstack Developer · Backend Focus',
  status: 'Vừa hoàn thành đồ án tốt nghiệp · Sẵn sàng cho cơ hội Fullstack hoặc Backend với Java / Node.js',
  headline: 'Fullstack Developer định hướng backend, tập trung vào RESTful APIs, microservices và hệ thống sẵn sàng production.',
  description:
    'Tôi có kinh nghiệm thực hành với Java, Spring Boot, Node.js và Express.js để xây dựng hệ thống fullstack có khả năng mở rộng, trong đó backend là thế mạnh chính. Tôi đã làm việc với cả cơ sở dữ liệu quan hệ và NoSQL (MariaDB, MongoDB), kết hợp Redis caching và triển khai dịch vụ trên môi trường cloud.',
  image: 'https://res.cloudinary.com/dzidt15cl/image/upload/v1773756509/vestden_hv9gxd.jpg',
  email: 'hohuynhhoaithinh@gmail.com',
  phone: '033 6784220',
  location: 'Tân Bình, Hồ Chí Minh',
  github: 'https://github.com/hohuynhhoaithinh',
  linkedin: 'https://www.linkedin.com/in/ho-huynh-hoai-thinh/',
}

const stats = [
  { label: 'Graduation project', value: 9.7, suffix: '/10' },
  { label: 'University GPA', value: 3.14, suffix: '/4' },
  { label: 'Team size', value: 2, suffix: '' },
]

const strengths = [
  {
    title: 'Backend-first mindset',
    description:
      'Ưu tiên kiến trúc rõ ràng, API có tổ chức và code dễ maintain để dự án tăng trưởng bền vững.',
    icon: FaServer,
  },
  {
    title: 'Data & performance aware',
    description:
      'Làm việc với MariaDB, MongoDB và Redis để tối ưu luồng dữ liệu, caching và tốc độ phản hồi.',
    icon: FaDatabase,
  },
  {
    title: 'Cloud-ready direction',
    description:
      'Quan tâm đến cách triển khai thực tế trên AWS và GCP, từ môi trường chạy đến khả năng mở rộng sau này.',
    icon: FaCloud,
  },
]

const stackGroups = [
  {
    title: 'Backend stack',
    icon: FaServer,
    items: ['Java', 'Spring Boot', 'Node.js', 'Express.js', 'Socket.IO'],
  },
  {
    title: 'Database & cache',
    icon: FaDatabase,
    items: ['MariaDB', 'MongoDB', 'Redis'],
  },
  {
    title: 'Cloud & deployment',
    icon: FaAws,
    items: ['AWS', 'Google Cloud Platform', 'Docker', 'Kubernetes'],
  },
  {
    title: 'Tools',
    icon: FaGithub,
    items: ['Git/GitHub', 'GitHub Actions', 'Terraform', 'Jenkins'],
  },
]

const highlights = [
  'Sẵn sàng cho vị trí Fullstack Developer hoặc Backend Developer với Java Spring Boot và Node.js/Express.js',
  'Yêu thích hệ thống có cấu trúc rõ ràng, dễ bảo trì và sẵn sàng mở rộng',
  'Quan tâm đến real-time, caching, dữ liệu và triển khai thực tế',
]

const education = [
  {
    period: 'Aug 2021 - Mar 2026',
    title: 'Bachelor of Software Engineering',
    subtitle: 'Industrial University of Ho Chi Minh City',
    logo: 'https://res.cloudinary.com/dzidt15cl/image/upload/v1773759635/logo_iuh_moi_zbgpso.png',
    description: 'GPA: 3.14 / 4 · Graduation Project: 9.7 / 10',
    details: [
      'Trọng tâm: Backend Development, Database Systems, Distributed Systems.',
      'Định hướng nghề nghiệp: Backend Developer (Java Spring Boot, Node.js/Express.js).',
    ],
  },
]

const featuredProject = {
  period: 'Aug 2025 - Nov 2025',
  title: 'Multi-User Online Shopping System',
  subtitle: 'Graduation Project · Score: 9.7 / 10 · Team size: 2',
  role: 'Backend Developer & DevOps',
  repository: 'https://github.com/shopping-ecommerce',
  tech: [
    'Java',
    'Spring Boot',
    'Node.js',
    'Express.js',
    'Apache Kafka',
    'Socket.IO',
    'Redis',
    'MariaDB',
    'MongoDB',
    'Docker',
    'Google Cloud Platform',
    'AWS',
    'Kubernetes',
    'Terraform',
  ],
  bullets: [
    'Xây dựng backend cho nền tảng shopping theo kiến trúc microservices và triển khai trên cloud.',
    'Thiết kế và phát triển RESTful APIs cho product catalog, cart, order management và authentication.',
    'Triển khai JWT-based authentication và authorization xuyên suốt các microservices.',
    'Tích hợp Apache Kafka cho giao tiếp bất đồng bộ giữa các services.',
    'Xây dựng realtime notification bằng Socket.IO với Node.js.',
    'Áp dụng Redis caching để tăng tốc độ phản hồi và giảm tải truy vấn dữ liệu.',
    'Container hóa hệ thống bằng Docker / Docker Compose cho môi trường phát triển và triển khai.',
    'Quản lý cấu hình infrastructure với Terraform trên AWS.',
  ],
}

const contactLinks = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: FaEnvelope },
  { label: 'Phone', href: `tel:${profile.phone.replace(/\s+/g, '')}`, icon: FaPhoneAlt },
  { label: 'GitHub', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin },
]

const profileSkills = [
  { label: 'Java', icon: FaJava },
  { label: 'Spring Boot', icon: SiSpringboot },
  { label: 'Node.js', icon: FaNodeJs },
  { label: 'Express.js', icon: SiExpress },
  { label: 'Socket.IO', icon: SiSocketdotio },
  { label: 'MariaDB', icon: SiMariadb },
  { label: 'MongoDB', icon: SiMongodb },
  { label: 'Redis', icon: SiRedis },
  { label: 'AWS', icon: FaAws },
  { label: 'Google Cloud', icon: SiGooglecloud },
  { label: 'Docker', icon: FaDocker },
  { label: 'Kubernetes', icon: SiKubernetes },
  { label: 'Terraform', icon: SiTerraform },
]

const sectionLinks = [
  { id: 'hero', label: 'Giới thiệu', shortLabel: 'Intro' },
  { id: 'strengths', label: 'Điểm mạnh', shortLabel: 'Strengths' },
  { id: 'focus', label: 'Kỹ năng', shortLabel: 'Skills' },
  { id: 'education', label: 'Học vấn & Project', shortLabel: 'Education' },
  { id: 'contact', label: 'Liên hệ', shortLabel: 'Contact' },
]

// Floating icons for hero
const floatingIcons = [
  { Icon: FaJava, color: '#f89820', delay: 0, x: -80, y: -40, rotate: 10 },
  { Icon: FaNodeJs, color: '#68a063', delay: 0.5, x: 100, y: -20, rotate: -15 },
  { Icon: FaDocker, color: '#2496ed', delay: 1, x: -60, y: 80, rotate: 20 },
  { Icon: SiRedis, color: '#d82c20', delay: 1.5, x: 120, y: 60, rotate: -5 },
  { Icon: FaAws, color: '#ff9900', delay: 2, x: -100, y: -80, rotate: 30 },
  { Icon: SiKubernetes, color: '#326ce5', delay: 2.5, x: 80, y: -100, rotate: -20 },
]

// Custom hook for mouse position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])
  return mousePosition
}

// Magnetic button component
const MagneticButton = ({ children, ...props }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const mousePosition = useMousePosition()

  useEffect(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distance = Math.sqrt((mousePosition.x - centerX) ** 2 + (mousePosition.y - centerY) ** 2)
    if (distance < 150) {
      const x = (mousePosition.x - centerX) * 0.2
      const y = (mousePosition.y - centerY) * 0.2
      setPosition({ x, y })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }, [mousePosition])

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Counter component
const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const spring = useSpring(0, { stiffness: 100, damping: 30 })
  
  useEffect(() => {
    spring.set(value)
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Number(latest.toFixed(1)))
    })
    return unsubscribe
  }, [spring, value])

  return (
    <span>
      {displayValue}{suffix}
    </span>
  )
}

// Split text reveal
const SplitText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const words = children.split(' ')
  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + i * 0.1 }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()

  useEffect(() => {
    setMounted(true)
  }, [])

  // --- Xử lý active section khi cuộn ---
  useEffect(() => {
    const getSections = () =>
      sectionLinks
        .map((section) => document.getElementById(section.id))
        .filter((element): element is HTMLElement => element !== null)

    const updateActiveSection = () => {
      const sectionElements = getSections()
      if (sectionElements.length === 0) return

      const scrollPosition = window.scrollY + window.innerHeight * 0.35
      let currentSection = sectionElements[0].id

      for (const section of sectionElements) {
        if (scrollPosition >= section.offsetTop) {
          currentSection = section.id
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 120
      if (nearBottom) {
        currentSection = sectionElements[sectionElements.length - 1].id
      }

      setActiveSection(currentSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  // --- Cuộn mượt khi click vào mục lục ---
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // --- Hiệu ứng cuộn ---
  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.25,
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const heroCardRotate = useTransform(scrollYProgress, [0, 1], [0, -4])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  // --- Stagger variants ---
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  // Spotlight effect based on mouse
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)
  useEffect(() => {
    spotlightX.set(mousePosition.x)
    spotlightY.set(mousePosition.y)
  }, [mousePosition, spotlightX, spotlightY])

  return (
    <main
      ref={containerRef}
      className="relative -mx-4 overflow-hidden text-white md:-mx-16 lg:-mx-32"
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 opacity-30 mix-blend-soft-light"
        style={{
          background: `radial-gradient(circle at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.3) 0%, transparent 40%)`,
        }}
      />

      {/* Thanh tiến trình cuộn */}
      <motion.div
        style={mounted ? { scaleX: progressScaleX } : undefined}
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400"
      />

      {/* Nút điều hướng nhanh bên phải (desktop) */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <div className="glass-card rounded-[1.5rem] px-3 py-4 backdrop-blur-xl">
          <div className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Quick nav
          </div>
          <div className="space-y-2">
            {sectionLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`group flex items-center gap-3 rounded-xl px-2 py-2 text-sm transition ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <motion.span
                  animate={{
                    scale: activeSection === item.id ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300 transition ${
                    activeSection === item.id
                      ? 'shadow-[0_0_16px_rgba(34,211,238,0.6)]'
                      : 'group-hover:scale-125'
                  }`}
                />
                <span
                  className={
                    activeSection === item.id ? 'font-semibold text-white' : ''
                  }
                >
                  {item.shortLabel}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Background moving grid */}
      <motion.div
        className="absolute inset-0 bg-grid-pattern opacity-20"
        style={{ y: backgroundY }}
      />
      
      {/* Animated gradient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[110px]"
        animate={{
          x: [0, 34, -20, 0],
          y: [0, -22, 18, 0],
          scale: [1, 1.08, 0.94, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-56 h-[28rem] w-[28rem] rounded-full bg-cyan-400/15 blur-[120px]"
        animate={{
          x: [0, -28, 20, 0],
          y: [0, 20, -24, 0],
          scale: [1, 0.92, 1.05, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-96 h-80 w-80 rounded-full bg-violet-500/20 blur-[100px]"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Enhanced particle system */}
      {[...Array(30)].map((_, index) => (
        <motion.span
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="pointer-events-none absolute h-2 w-2 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              index % 3 === 0 ? '#f472b6' : index % 3 === 1 ? '#22d3ee' : '#c084fc'
            } 0%, transparent 70%)`,
            top: `${5 + ((index * 17) % 90)}%`,
            left: `${3 + ((index * 29) % 94)}%`,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.5, 2, 0.5],
            y: [0, -30, 0],
            x: [0, (index % 2 === 0 ? 20 : -20), 0],
          }}
          transition={{
            duration: 3 + (index % 5),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.2,
          }}
        />
      ))}

      {/* Section HERO */}
      <section
        id="hero"
        className="relative flex min-h-screen scroll-mt-28 items-center px-6 py-20 md:px-10 lg:px-16 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={mounted ? { y: parallaxY } : undefined}
            className="relative z-10 will-change-transform"
          >
            {/* Thanh điều hướng trên mobile/tablet */}
            <div className="mb-6 flex flex-wrap gap-3 lg:max-w-2xl xl:hidden">
              {sectionLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                    activeSection === item.id
                      ? 'border-fuchsia-300/50 bg-white/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-fuchsia-300/40 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <motion.span
                    animate={{
                      scale: activeSection === item.id ? [1, 1.2, 1] : 1,
                    }}
                    className={`h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300 ${
                      activeSection === item.id
                        ? 'shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                        : ''
                    }`}
                  />
                  {item.label}
                </a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="mb-6 inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-sm font-medium text-fuchsia-100 backdrop-blur-sm"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mr-2"
              >
                ✨
              </motion.span>
              Open to backend opportunities
            </motion.div>

            <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl xl:text-[5.5rem] xl:leading-[1.02]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block text-white/90"
              >
                {profile.name}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-2 block text-shine"
              >
                <Typewriter
                  options={{
                    strings: [profile.role],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    deleteSpeed: 50,
                    pauseFor: 2500,
                  }}
                />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl"
            >
              {profile.headline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-6 max-w-3xl text-base leading-8 text-slate-400 md:text-lg"
            >
              {profile.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]"
                >
                  <span>Liên hệ với tôi</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap gap-3 text-sm text-slate-300"
            >
              {contactLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    variants={staggerItem}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-fuchsia-400/40"
                  >
                    <Icon className="text-fuchsia-300" />
                    {link.label}
                  </motion.a>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              whileHover={{ scale: 1.05 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
            >
              <FaMapMarkerAlt className="text-cyan-300" />
              {profile.location}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.02 }}
              className="mt-4 max-w-xl rounded-2xl border border-white/10 bg-slate-950/45 p-4 backdrop-blur-sm"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
                Education
              </div>
              <div className="mt-2 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-10 w-10 overflow-hidden rounded-lg border border-white/10 bg-white/90"
                >
                  <Image
                    src={education[0].logo}
                    alt="Industrial University of Ho Chi Minh City logo"
                    fill
                    sizes="40px"
                    className="object-contain p-1"
                  />
                </motion.div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    Software Engineer
                  </div>
                  <div className="text-sm text-slate-300">
                    Industrial University of Ho Chi Minh City
                  </div>
                </div>
              </div>
              <div className="mt-1 text-sm text-slate-400">
                Aug 2021 - Mar 2026 · GPA: 3.14 / 4
              </div>
            </motion.div>

            {/* Stats cards với counter animation */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mt-12 grid gap-4 sm:grid-cols-3"
            >
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  variants={staggerItem}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass-card rounded-3xl p-5 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="text-3xl font-bold text-white"
                  >
                    <Counter value={item.value} suffix={item.suffix} />
                  </motion.div>
                  <div className="mt-2 text-sm text-slate-400">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Ảnh đại diện với floating icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={mounted ? { rotate: heroCardRotate, y: parallaxY } : undefined}
            className="relative mx-auto w-full max-w-md will-change-transform"
          >
            {/* Floating tech icons */}
            {floatingIcons.map(({ Icon, color, delay, x, y, rotate }, index) => (
              <motion.div
                key={index}
                className="absolute z-20 hidden lg:block"
                style={{ left: '50%', top: '50%', x: x, y: y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + delay, duration: 0.5 }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [rotate, rotate + 10, rotate],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ color }}
                >
                  <Icon size={32} />
                </motion.div>
              </motion.div>
            ))}

            <motion.div
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 170, damping: 18 }}
              className="glass-card relative overflow-hidden rounded-[2rem] p-4"
            >
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-[2rem]"
                style={{
                  background: 'linear-gradient(90deg, #f472b6, #22d3ee, #c084fc, #f472b6)',
                  backgroundSize: '300% 100%',
                }}
                animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-[2px] rounded-[calc(2rem-2px)] bg-slate-950" />
              
              <div className="relative z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_35%)]" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                </div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative -mt-28 rounded-[1.5rem] border border-white/10 bg-slate-950/65 p-5 backdrop-blur-xl"
                >
                  <div className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">
                    Backend profile
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-white">
                    {profile.status}
                  </div>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mt-4 flex flex-wrap gap-2 text-sm text-slate-300"
                  >
                    {profileSkills.slice(0, 6).map((skill) => {
                      const Icon = skill.icon
                      return (
                        <motion.span
                          key={skill.label}
                          variants={staggerItem}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"
                        >
                          <Icon className="text-fuchsia-300" />
                          {skill.label}
                        </motion.span>
                      )
                    })}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section STRENGTHS */}
      <section
        id="strengths"
        className="relative scroll-mt-28 px-6 py-16 md:px-10 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="mb-10 max-w-3xl"
          >
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-200/70">
              Why this portfolio works
            </div>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">
              <SplitText delay={0.2}>Một hồ sơ gọn gàng, hiện đại và nói đúng điều nhà tuyển dụng cần thấy.</SplitText>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {strengths.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-card group relative overflow-hidden rounded-[1.75rem] p-7"
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ filter: 'blur(40px)' }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex rounded-2xl bg-white/5 p-4 text-2xl text-fuchsia-300"
                    >
                      <Icon />
                    </motion.div>
                    <h3 className="mt-6 text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 leading-8 text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Section FOCUS (Skills) */}
      <section
        id="focus"
        className="relative scroll-mt-28 px-6 py-16 md:px-10 lg:px-16 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-[2rem] p-8"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
              Current focus
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              <SplitText delay={0.2}>Tôi đang tìm vị trí để biến nền tảng kỹ thuật thành giá trị thực tế.</SplitText>
            </h2>
            <div className="mt-6 space-y-4 text-slate-300">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                    className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300"
                  />
                  <p className="leading-8">{item}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
            >
              <div className="text-sm text-slate-400">Contact</div>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 inline-block text-xl font-semibold text-white transition hover:text-cyan-300"
              >
                {profile.email}
              </a>
              <div className="mt-3 text-sm text-slate-400">
                Open to Fullstack Developer / Backend Developer roles
              </div>
            </motion.div>
          </motion.div>

          <div className="grid gap-6">
            {stackGroups.map((group, index) => {
              const Icon = group.icon
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-[1.75rem] p-7"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="rounded-2xl bg-white/5 p-4 text-2xl text-cyan-300"
                    >
                      <Icon />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-white">{group.title}</h3>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mt-6 flex flex-wrap gap-3"
                  >
                    {group.items.map((item) => {
                      const icon =
                        item === 'Java'
                          ? FaJava
                          : item === 'Node.js'
                          ? FaNodeJs
                          : item === 'AWS'
                          ? FaAws
                          : item === 'MariaDB' || item === 'MongoDB' || item === 'Redis'
                          ? FaDatabase
                          : item === 'Docker'
                          ? FaDocker
                          : item === 'Kubernetes'
                          ? SiKubernetes
                          : item === 'Terraform'
                          ? SiTerraform
                          : null
                      const ChipIcon = icon
                      return (
                        <motion.span
                          key={item}
                          variants={staggerItem}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                        >
                          {ChipIcon ? <ChipIcon className="text-fuchsia-300" /> : null}
                          {item}
                        </motion.span>
                      )
                    })}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section EDUCATION & PROJECT */}
      <section
        id="education"
        className="relative scroll-mt-28 px-6 py-16 md:px-10 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-fuchsia-950/20 backdrop-blur-xl md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-200/70">
                Education
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                <SplitText delay={0.2}>Nền tảng học thuật và định hướng nghề nghiệp backend của tôi.</SplitText>
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-slate-400">
                Tôi vừa hoàn thành đồ án tốt nghiệp và đang chủ động tìm vị trí
                Fullstack Developer hoặc Backend Developer để tham gia vào các dự án
                production-ready.
              </p>

              <div className="mt-8 space-y-5">
                {education.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="relative h-10 w-10 overflow-hidden rounded-lg border border-white/10 bg-white/90"
                      >
                        <Image
                          src={item.logo}
                          alt={`${item.subtitle} logo`}
                          fill
                          sizes="40px"
                          className="object-contain p-1"
                        />
                      </motion.div>
                      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
                        {item.subtitle}
                      </div>
                    </div>
                    <div className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/70">
                      {item.period}
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      {item.title}
                    </div>
                    <p className="mt-3 text-slate-400">{item.description}</p>
                    {'details' in item && Array.isArray(item.details) && item.details.length > 0 ? (
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                        {item.details.map((detail, i) => (
                          <motion.li
                            key={detail}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6"
                >
                  <div className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/70">
                    Language
                  </div>
                  <div className="mt-2 text-xl font-semibold text-white">English</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6"
            >
              <div className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/70">
                Featured Project
              </div>
              <div className="mt-2 text-sm text-slate-400">{featuredProject.period}</div>
              <div className="mt-3 text-2xl font-semibold text-white">
                {featuredProject.title}
              </div>
              <p className="mt-2 text-slate-300">{featuredProject.subtitle}</p>

              <p className="mt-4 text-slate-300">
                <span className="font-semibold text-white">Role:</span> {featuredProject.role}
              </p>

              <MagneticButton>
                <motion.a
                  href={featuredProject.repository}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-400/20"
                >
                  <FaGithub />
                  View Repository
                  <FaExternalLinkAlt className="text-xs" />
                </motion.a>
              </MagneticButton>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {featuredProject.tech.map((item) => (
                  <motion.span
                    key={item}
                    variants={staggerItem}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>

              <div className="mt-6 space-y-3">
                {featuredProject.bullets.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex gap-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300"
                    />
                    <p className="leading-8 text-slate-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section CONTACT */}
      <section
        id="contact"
        className="relative scroll-mt-28 px-6 pb-24 pt-6 md:px-10 lg:px-16 lg:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          whileHover={{ scale: 1.01 }}
          className="mx-auto flex max-w-5xl flex-col items-center rounded-[2rem] border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-500/15 via-violet-500/10 to-cyan-400/15 px-8 py-12 text-center shadow-[0_0_80px_rgba(139,92,246,0.15)] backdrop-blur-xl"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-100/70"
          >
            Let&apos;s build something solid
          </motion.div>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
            <SplitText delay={0.2}>
              Nếu bạn đang tìm một backend developer trẻ, nghiêm túc và có định hướng rõ ràng, tôi
              rất sẵn sàng trao đổi.
            </SplitText>
          </h2>
          <p className="mt-6 max-w-3xl leading-8 text-slate-300">
            Tôi đang tìm cơ hội để bắt đầu bằng những nhiệm vụ thực tế, học nhanh từ đội ngũ mạnh
            và phát triển thành một backend developer có chiều sâu về hệ thống.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton>
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 rounded-full border border-fuchsia-300/30 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_35px_rgba(168,85,247,0.22)] transition hover:shadow-[0_0_45px_rgba(34,211,238,0.24)]"
              >
                <FaEnvelope />
                Gửi email cho tôi
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/10"
              >
                <FaLinkedin />
                Kết nối LinkedIn
              </motion.a>
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </main>
  )
}