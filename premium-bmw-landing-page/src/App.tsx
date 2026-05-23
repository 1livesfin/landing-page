import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";

type Model = {
  name: string;
  category: string;
  image: string;
  horsepower: string;
  topSpeed: string;
  acceleration: string;
  accent: string;
};

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

type Slide = {
  title: string;
  description: string;
  image: string;
  note: string;
};

const heroVideo = "https://videos.pexels.com/video-files/27807965/12229033_3840_2160_30fps.mp4";
const showcaseVideo = "https://videos.pexels.com/video-files/5951267/5951267-uhd_4096_2160_25fps.mp4";
const performanceVideo = "https://videos.pexels.com/video-files/3757013/3757013-uhd_3840_2160_24fps.mp4";

const models: Model[] = [
  {
    name: "BMW M4 Competition",
    category: "Track-bred coupe",
    image: "https://images.pexels.com/photos/13857903/pexels-photo-13857903.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    horsepower: "503 hp",
    topSpeed: "290 km/h",
    acceleration: "3.5 s",
    accent: "#1c69d4",
  },
  {
    name: "BMW i8",
    category: "Hybrid icon",
    image: "https://images.pexels.com/photos/86993/pexels-photo-86993.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    horsepower: "369 hp",
    topSpeed: "250 km/h",
    acceleration: "4.4 s",
    accent: "#8ec5ff",
  },
  {
    name: "BMW XM",
    category: "Luxury performance SUV",
    image: "https://images.pexels.com/photos/14428164/pexels-photo-14428164.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    horsepower: "644 hp",
    topSpeed: "270 km/h",
    acceleration: "4.1 s",
    accent: "#5f7cff",
  },
  {
    name: "BMW M5 CS",
    category: "Executive weapon",
    image: "https://images.pexels.com/photos/16439513/pexels-photo-16439513.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    horsepower: "627 hp",
    topSpeed: "305 km/h",
    acceleration: "2.9 s",
    accent: "#d0d6de",
  },
  {
    name: "BMW X7",
    category: "Grand luxury SUV",
    image: "https://images.pexels.com/photos/12532746/pexels-photo-12532746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    horsepower: "523 hp",
    topSpeed: "250 km/h",
    acceleration: "4.7 s",
    accent: "#9bb7d6",
  },
];

const techFeatures: Feature[] = [
  {
    title: "BMW iDrive",
    description: "Intuitive control center with premium simplicity and instant access to key driving layers.",
    icon: <DriveIcon />,
  },
  {
    title: "AI Driving Assistant",
    description: "Adaptive intelligence that supports lane awareness, comfort, and confidence in motion.",
    icon: <ChipIcon />,
  },
  {
    title: "Digital Cockpit",
    description: "Crisp driver displays with cinematic clarity and a minimal, performance-first interface.",
    icon: <DashboardIcon />,
  },
  {
    title: "Smart Connectivity",
    description: "Seamless device pairing, navigation, and vehicle intelligence across every drive.",
    icon: <NetworkIcon />,
  },
  {
    title: "Adaptive Suspension",
    description: "Precision tuning for comfort on the street and serious composure under pressure.",
    icon: <SuspensionIcon />,
  },
];

const interiorSlides: Slide[] = [
  {
    title: "Jet-black cockpit",
    description: "Command every mile through a minimalist driver zone with illuminated controls and refined materials.",
    image: "https://images.pexels.com/photos/5348870/pexels-photo-5348870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
    note: "Focused ergonomics",
  },
  {
    title: "Red leather lounge",
    description: "A high-contrast cabin built around comfort, tactile luxury, and a sense of motion even at rest.",
    image: "https://images.pexels.com/photos/4141873/pexels-photo-4141873.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
    note: "Crafted ambience",
  },
  {
    title: "Driver-first interface",
    description: "A digital environment that feels calm, intelligent, and engineered for a premium experience.",
    image: "https://images.pexels.com/photos/30092538/pexels-photo-30092538.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
    note: "Immersive control",
  },
];

const stats = [
  { label: "0-100 km/h", value: 2.9, suffix: " s", decimals: 1 },
  { label: "Horsepower", value: 627, suffix: " hp", decimals: 0 },
  { label: "TwinPower Turbo", value: 2, suffix: " units", decimals: 0 },
  { label: "Electric Hybrid Tech", value: 1, suffix: " layer", decimals: 0 },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [interiorIndex, setInteriorIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const experienceRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const experienceScroll = useScroll({ target: experienceRef, offset: ["start end", "end start"] });
  const experienceLift = useTransform(experienceScroll.scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1600);
    const onScroll = () => setScrolled(window.scrollY > 18);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setInteriorIndex((value) => (value + 1) % interiorSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = interiorSlides[interiorIndex];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030406] text-white">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(28,105,212,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_30%),linear-gradient(180deg,_#05070a_0%,_#040507_36%,_#020304_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:96px_96px]" />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-[2px] bg-gradient-to-r from-transparent via-[#1c69d4] to-transparent"
        style={{ width: progress }}
      />

      <AnimatePresence>
        {isLoading ? <Loader key="loader" /> : null}
      </AnimatePresence>

      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 transition-all duration-300 ${
          scrolled ? "bg-black/55 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#hero" className="group flex items-center gap-3">
            <BMWMark />
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-white/45">BMW</p>
              <p className="text-sm font-semibold tracking-[0.24em] text-white">Ultimate Driving Machine</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/70 lg:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors duration-200 hover:text-white">
                {link.label}
              </a>
            ))}
            <a
              href="#test-drive"
              className="rounded-full border border-[#1c69d4]/50 bg-white/5 px-5 py-2 text-white transition-all duration-300 hover:border-[#1c69d4] hover:bg-[#1c69d4]/15 hover:shadow-[0_0_30px_rgba(28,105,212,0.35)]"
            >
              Book Test Drive
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-xl transition hover:border-[#1c69d4]/60 hover:bg-[#1c69d4]/15 lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="border-t border-white/10 bg-black/85 px-4 py-4 backdrop-blur-2xl lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/80">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 transition hover:border-[#1c69d4]/50 hover:bg-[#1c69d4]/10"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <Hero />

        <section id="models" className="relative border-t border-white/10 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Featured BMW Models"
              title="Curated for uncompromising presence."
              description="Each silhouette is tuned to deliver a different expression of performance, craftsmanship, and prestige."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
              {models.map((model, index) => (
                <ModelCard key={model.name} model={model} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="performance" className="border-t border-white/10 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(28,105,212,0.22),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_30%)]" />
              <video
                className="relative aspect-[4/5] w-full rounded-[1.55rem] object-cover grayscale-[0.15]"
                src={performanceVideo}
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.pexels.com/videos/27807965/pexels-photo-27807965.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900"
              />
              <div className="absolute inset-0 rounded-[1.55rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.65)_100%)]" />
              <div className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/75 backdrop-blur-xl">
                Performance Motion
              </div>
            </motion.div>

            <div className="space-y-8">
              <SectionHeader
                eyebrow="Performance"
                title="Power that feels immediate."
                description="BMW engineering blends sharp response, hybrid intelligence, and turbocharged force into a seamless driving experience."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <StatCounter key={stat.label} {...stat} />
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <GlassFeature label="TwinPower Turbo" value="Instant torque delivery with ruthless linear pull." />
                <GlassFeature label="Electric Hybrid Technology" value="Silent assist, sharper launches, and elevated efficiency." />
              </div>
            </div>
          </div>
        </section>

        <section
          ref={experienceRef}
          id="experience"
          className="relative overflow-hidden border-t border-white/10 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        >
          <motion.div
            style={{ y: experienceLift }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(28,105,212,0.18),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_50%_90%,rgba(28,105,212,0.08),transparent_22%)]"
          />
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-6">
              <SectionHeader
                eyebrow="Experience"
                title="Luxury interior, reimagined for motion."
                description="Smooth parallax, ambient light, and a modern slider create an immersive cabin showcase with a calm, cinematic rhythm."
              />

              <div className="space-y-4 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">
                <p className="text-sm uppercase tracking-[0.35em] text-[#8fb8ff]">Interior details</p>
                <p className="text-2xl font-semibold text-white">Every surface feels engineered, not decorated.</p>
                <p className="max-w-xl text-sm leading-7 text-white/65">
                  An illuminated cockpit, precision stitching, and discreet digital layers keep the cabin focused on driving and comfort.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_36%),radial-gradient(circle_at_top_right,rgba(28,105,212,0.18),transparent_32%)]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.title}
                  initial={{ opacity: 0, y: 16, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.985 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-[1.55rem]"
                >
                  <img src={activeSlide.image} alt={activeSlide.title} className="h-[480px] w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.62)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/60">Luxury Interior</p>
                        <h3 className="mt-2 text-3xl font-semibold text-white">{activeSlide.title}</h3>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-white/72">{activeSlide.description}</p>
                      </div>
                      <span className="hidden rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 backdrop-blur-xl sm:inline-flex">
                        {activeSlide.note}
                      </span>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <div className="flex gap-2">
                        {interiorSlides.map((slide, index) => (
                          <button
                            key={slide.title}
                            type="button"
                            onClick={() => setInteriorIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              index === interiorIndex ? "w-10 bg-[#1c69d4]" : "w-2 bg-white/35 hover:bg-white/55"
                            }`}
                            aria-label={`Show ${slide.title}`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setInteriorIndex((value) => (value - 1 + interiorSlides.length) % interiorSlides.length)}
                          className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/85 backdrop-blur-xl transition hover:border-[#1c69d4]/60 hover:bg-[#1c69d4]/15"
                        >
                          Prev
                        </button>
                        <button
                          type="button"
                          onClick={() => setInteriorIndex((value) => (value + 1) % interiorSlides.length)}
                          className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/85 backdrop-blur-xl transition hover:border-[#1c69d4]/60 hover:bg-[#1c69d4]/15"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="technology" className="border-t border-white/10 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Technology"
              title="A digital layer that feels invisible."
              description="Glassmorphism surfaces and precise iconography frame the intelligence behind the driving experience."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {techFeatures.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-[#1c69d4]/40 hover:bg-white/[0.06]"
                  style={hoverGlowStyle}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(28,105,212,0.18),transparent_30%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#9ec3ff] shadow-[0_0_35px_rgba(28,105,212,0.18)]">
                      {feature.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="text-sm leading-7 text-white/65">{feature.description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="showcase" className="border-t border-white/10 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Video Showcase"
              title="Cinematic motion, framed like a launch film."
              description="An embedded BMW promo-style video adds a premium motion layer with shadow, depth, and a polished finish."
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_35px_100px_rgba(0,0,0,0.5)]"
            >
              <div className="relative overflow-hidden rounded-[1.55rem]">
                <video
                  className="h-[520px] w-full object-cover"
                  src={showcaseVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://images.pexels.com/videos/26256156/bmw-26256156.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.7)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex flex-wrap items-end justify-between gap-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/55">BMW Motion Film</p>
                      <h3 className="mt-2 text-3xl font-semibold text-white">Every frame feels engineered.</h3>
                    </div>
                    <a
                      href="#test-drive"
                      className="inline-flex items-center gap-2 rounded-full border border-[#1c69d4]/55 bg-[#1c69d4]/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1c69d4]/25 hover:shadow-[0_0_40px_rgba(28,105,212,0.3)]"
                    >
                      Book a Drive
                      <ArrowRightIcon />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="test-drive" className="border-t border-white/10 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-6">
              <SectionHeader
                eyebrow="Test Drive"
                title="Reserve a private BMW experience."
                description="Choose your model, pick a date, and our concierge team will confirm the details with premium follow-up."
              />

              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <p className="text-sm uppercase tracking-[0.35em] text-[#8fb8ff]">Concierge standard</p>
                <p className="mt-3 text-2xl font-semibold text-white">A tailored handoff from inquiry to ignition.</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
                  Expect a refined response, model availability guidance, and a booking flow designed to feel as premium as the vehicles.
                </p>
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
              onSubmit={handleSubmit(setSubmitted)}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(28,105,212,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%)]" />
              <div className="relative space-y-5">
                <AnimatePresence>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="rounded-2xl border border-[#1c69d4]/35 bg-[#1c69d4]/10 px-4 py-3 text-sm text-white/90"
                    >
                      Request received. A BMW concierge specialist will contact you shortly.
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField label="Name" name="name" placeholder="Your name" icon={<UserIcon />} />
                  <InputField label="Email" name="email" type="email" placeholder="your@email.com" icon={<MailIcon />} />
                  <InputField
                    label="Select Model"
                    name="model"
                    as="select"
                    icon={<CarIcon />}
                    options={models.map((model) => model.name)}
                    className="sm:col-span-2"
                  />
                  <InputField label="Test Drive Date" name="date" type="date" icon={<CalendarIcon />} className="sm:col-span-2" />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#1c69d4] via-[#2b7dff] to-[#9ec3ff] px-6 py-4 text-sm font-semibold tracking-[0.28em] text-white shadow-[0_18px_50px_rgba(28,105,212,0.4)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_24px_70px_rgba(28,105,212,0.55)]"
                >
                  Submit Request
                  <ArrowRightIcon />
                </button>
              </div>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/55 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <BMWMark />
            <div>
              <p className="text-sm font-semibold tracking-[0.3em] text-white">BMW</p>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Luxury performance experience</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {[InstagramIcon, XIcon, YoutubeIcon, FacebookIcon].map((Icon, index) => (
              <a
                key={index}
                href="#hero"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#1c69d4]/55 hover:bg-[#1c69d4]/12 hover:text-white"
                aria-label="Social link"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} BMW-inspired premium landing page.</p>
          <p>Built for cinematic motion, responsive luxury, and smooth interaction.</p>
        </div>
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover object-center"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/videos/27807965/pexels-photo-27807965.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1440&w=2560"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(28,105,212,0.14),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.78)_62%,rgba(0,0,0,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.05)_0%,transparent_25%,transparent_75%,rgba(255,255,255,0.04)_100%)] opacity-30" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1c69d4]/12 blur-3xl animate-[float_12s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute left-[10%] top-[24%] h-4 w-4 rounded-full bg-white/80 blur-[1px] animate-[glowPulse_3s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute bottom-[20%] right-[13%] h-3 w-3 rounded-full bg-[#1c69d4] blur-[1px] animate-[glowPulse_5s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,transparent_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.45)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-xs font-medium uppercase tracking-[0.55em] text-white/65"
          >
            BMW PERFORMANCE SERIES
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.24 }}
            className="mt-6 space-y-6"
          >
            <div className="flex items-center gap-4">
              <BMWMark large />
              <p className="text-sm uppercase tracking-[0.42em] text-[#8fb8ff]">Official-grade luxury atmosphere</p>
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-7xl lg:text-[7.5rem]">
              The Ultimate Driving Machine
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              A cinematic BMW landing page shaped by black glass surfaces, silver light, and blue performance energy. Built to feel sleek,
              futuristic, and unmistakably premium.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.38 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#models"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold tracking-[0.26em] text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#e5ecff] hover:shadow-[0_18px_50px_rgba(255,255,255,0.15)]"
            >
              Explore Models
              <ArrowRightDarkIcon />
            </a>
            <a
              href="#test-drive"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/7 px-6 py-4 text-sm font-semibold tracking-[0.26em] text-white backdrop-blur-xl transition-all duration-300 hover:border-[#1c69d4]/60 hover:bg-[#1c69d4]/15 hover:shadow-[0_0_50px_rgba(28,105,212,0.28)]"
            >
              Book Test Drive
              <ArrowRightIcon />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-xs font-medium uppercase tracking-[0.55em] text-[#8fb8ff]">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="max-w-2xl text-sm leading-8 text-white/66 sm:text-base">{description}</p>
    </div>
  );
}

function ModelCard({ model, index }: { model: Model; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const style = useMemo<CSSProperties>(
    () => ({
      transform: `perspective(1100px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(0px)`,
      transition: "transform 180ms ease, box-shadow 220ms ease",
      ["--mx" as string]: "50%",
      ["--my" as string]: "50%",
    }),
    [tilt.x, tilt.y],
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
        setTilt({ x, y });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(28,105,212,0.2),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_22%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div style={style} className="relative flex h-full flex-col">
        <div className="relative overflow-hidden">
          <img
            src={model.image}
            alt={model.name}
            className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.55)_100%)]" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-white/80 backdrop-blur-xl">
            {model.category}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">{model.name}</h3>
            <div className="h-px w-full bg-gradient-to-r from-white/15 via-white/6 to-transparent" />
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.36em] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: model.accent }} />
            Signature BMW performance
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            {[
              { label: "Horsepower", value: model.horsepower },
              { label: "Top Speed", value: model.topSpeed },
              { label: "0-100", value: model.acceleration },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">{item.label}</p>
                <p className="mt-2 text-base font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <a
            href="#test-drive"
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[#1c69d4]/70 hover:bg-[#1c69d4]/20 hover:shadow-[0_0_30px_rgba(28,105,212,0.25)]"
          >
            View Details
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function StatCounter({ label, value, suffix, decimals }: { label: string; value: number; suffix: string; decimals: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const count = useCountUp(value, inView, decimals);

  return (
    <div ref={ref} className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
      <p className="text-xs uppercase tracking-[0.35em] text-white/45">{label}</p>
      <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">
        {count}
        <span className="text-xl text-[#9ec3ff]">{suffix}</span>
      </p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-full origin-left scale-x-100 rounded-full bg-gradient-to-r from-[#1c69d4] via-[#5f7cff] to-[#dce9ff] shadow-[0_0_25px_rgba(28,105,212,0.45)]" />
      </div>
    </div>
  );
}

function GlassFeature({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
      <p className="text-xs uppercase tracking-[0.35em] text-[#8fb8ff]">{label}</p>
      <p className="mt-3 text-sm leading-7 text-white/70">{value}</p>
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  className = "",
  as = "input",
  options = [],
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon: ReactNode;
  className?: string;
  as?: "input" | "select";
  options?: string[];
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs uppercase tracking-[0.32em] text-white/48">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition focus-within:border-[#1c69d4]/60 focus-within:bg-[#1c69d4]/8">
        <span className="text-white/55">{icon}</span>
        {as === "select" ? (
          <select name={name} required className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35">
            <option value="">Select a model</option>
            {options.map((option) => (
              <option key={option} value={option} className="bg-black text-white">
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            name={name}
            type={type}
            required
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
          />
        )}
      </div>
    </label>
  );
}

function useCountUp(target: number, active: boolean, decimals = 0) {
  const [value, setValue] = useState("0");

  useEffect(() => {
    if (!active) return;

    const start = performance.now();
    const duration = 1400;

    const frame = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = target * eased;
      setValue(next.toFixed(decimals));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, [active, decimals, target]);

  return value;
}

function handleSubmit(setSubmitted: (value: boolean) => void) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 4200);
    event.currentTarget.reset();
  };
}

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#020304]"
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] shadow-[0_0_60px_rgba(28,105,212,0.18)]">
          <div className="absolute inset-0 rounded-full border border-[#1c69d4]/35 border-t-[#1c69d4] animate-[ringSpin_1.2s_linear_infinite]" />
          <BMWMark large />
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-white/45">BMW</p>
          <p className="mt-3 text-sm uppercase tracking-[0.35em] text-white/80">Loading cinematic experience</p>
        </div>
      </div>
    </motion.div>
  );
}

function BMWMark({ large = false }: { large?: boolean }) {
  const size = large ? "h-14 w-14" : "h-10 w-10";

  return (
    <div className={`${size} relative overflow-hidden rounded-full border border-white/20 bg-black shadow-[0_0_25px_rgba(28,105,212,0.2)]`}>
      <div className="absolute inset-0 rounded-full border border-white/20" />
      <div className="absolute inset-1 rounded-full border border-white/10" />
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 overflow-hidden rounded-full">
        <div className="bg-[#1c69d4]" />
        <div className="bg-white" />
        <div className="bg-white" />
        <div className="bg-[#1c69d4]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/10 text-[11px] font-semibold tracking-[0.35em] text-white mix-blend-screen">
        BMW
      </div>
    </div>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <CloseIcon />
  ) : (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function ArrowRightDarkIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function UserIcon() {
  return <SimpleIcon d="M20 21a8 8 0 1 0-16 0" viewBox="0 0 24 24" />;
}

function MailIcon() {
  return <SimpleIcon d="M3 7h18v10H3z M3 7l9 6 9-6" viewBox="0 0 24 24" />;
}

function CarIcon() {
  return <SimpleIcon d="M4 15l1.5-5A2 2 0 0 1 7.4 9h9.2a2 2 0 0 1 1.9 1.5L20 15m-16 0h16M6 15v2M18 15v2" viewBox="0 0 24 24" />;
}

function CalendarIcon() {
  return <SimpleIcon d="M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" viewBox="0 0 24 24" />;
}

function DriveIcon() {
  return <SimpleIcon d="M4 16l3-8h10l3 8M6 16h12M9 20h6" viewBox="0 0 24 24" />;
}

function ChipIcon() {
  return <SimpleIcon d="M9 9h6v6H9zM4 9h2M4 15h2M18 9h2M18 15h2M9 4v2M15 4v2M9 18v2M15 18v2" viewBox="0 0 24 24" />;
}

function DashboardIcon() {
  return <SimpleIcon d="M4 12a8 8 0 1 1 16 0M12 12l3-4" viewBox="0 0 24 24" />;
}

function NetworkIcon() {
  return <SimpleIcon d="M5 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm14 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM12 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM7.5 15l2.2-2.5M14.3 12.5l2.2 2.5M9.8 9.3 12 9.3" viewBox="0 0 24 24" />;
}

function SuspensionIcon() {
  return <SimpleIcon d="M4 12h4l2-5 4 10 2-5h4M6 19h12" viewBox="0 0 24 24" />;
}

function InstagramIcon() {
  return <SimpleIcon d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.5A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5Zm5.2-3.1h.01" viewBox="0 0 24 24" />;
}

function XIcon() {
  return <SimpleIcon d="m4 5 16 14M20 5 4 19" viewBox="0 0 24 24" />;
}

function YoutubeIcon() {
  return <SimpleIcon d="M4.5 8.5a2 2 0 0 1 1.4-1.4C7.3 6.7 12 6.7 12 6.7s4.7 0 6.1.4a2 2 0 0 1 1.4 1.4c.4 1.4.4 4.3.4 4.3s0 2.9-.4 4.3a2 2 0 0 1-1.4 1.4c-1.4.4-6.1.4-6.1.4s-4.7 0-6.1-.4a2 2 0 0 1-1.4-1.4C4.1 15.9 4.1 13 4.1 13s0-2.9.4-4.5ZM10 10.5v5l4-2.5-4-2.5Z" viewBox="0 0 24 24" />;
}

function FacebookIcon() {
  return <SimpleIcon d="M14 8h2V5.5A2.5 2.5 0 0 0 13.5 3H11a3 3 0 0 0-3 3v2H6v4h2v9h4v-9h2.5l.5-4H12V6.5a1 1 0 0 1 1-1H14Z" viewBox="0 0 24 24" />;
}

function SimpleIcon({ d, viewBox = "0 0 24 24" }: { d: string; viewBox?: string }) {
  return (
    <svg className="h-5 w-5" viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Models", href: "#models" },
  { label: "Performance", href: "#performance" },
  { label: "Experience", href: "#experience" },
  { label: "Technology", href: "#technology" },
  { label: "Showcase", href: "#showcase" },
];

const hoverGlowStyle: CSSProperties = {
  ["--mx" as string]: "50%",
  ["--my" as string]: "50%",
};
