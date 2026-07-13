import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const A = "/assets/";

const navItems = [
  ["01", "WORKS", "works"],
  ["02", "SERVICES", "services"],
  ["03", "ABOUT", "about"],
  ["04", "CONTACT", "contact"],
];

const projects = [
  {
    title: "Nexbot_",
    industry: ["Artificial Intelligence", "Web3"],
    services: ["Branding"],
    image: "work-nexbot.png",
    className: "nexbot",
  },
  {
    title: "Landa_",
    industry: ["SAAS", "Productivity"],
    services: ["Website Design", "Visual Identity", "Framer Development"],
    image: "work-landa.png",
    className: "landa",
  },
  {
    title: "Nexbot_",
    industry: ["Portfolio", "Photography"],
    services: ["Website Design", "Visual Identity", "Framer Development"],
    image: "work-wallet.svg",
    className: "wallet",
  },
];

const products = [
  ["Portfolio", "Davies", "$49", "product-davies.png"],
  ["Component", "Menu Hover", "$59", "product-menu.png"],
  ["Agency", "AgenIO", "$39", "service-web-design.png"],
  ["Agency", "AgenIO", "$59", "service-no-code.png"],
];

const services = [
  {
    title: "Branding",
    copy: "I create distinctive brand identities through strategy and visual design, helping businesses stand out, connect with audiences, and leave a lasting impression.",
    points: ["Brand Strategy", "Visual Identity Design", "Logo & Typography", "Color Palette Creation", "Brand Guidelines"],
    background: "service-branding-bg.jpg",
    image: "service-branding-card.jpg",
    detail: "service-branding-devices-exact.svg",
    className: "branding",
  },
  {
    title: "Web Design",
    copy: "I design modern websites focused on user experience, scalability, and aesthetics. Each project is crafted to express the brand’s identity and deliver lasting value.",
    points: ["UI/UX Design", "Responsive Layouts", "Interaction & Animation", "Accessibility Optimization", "Design Systems"],
    background: "service-web-bg.png",
    image: "service-web-left.png",
    detail: "service-web-right.png",
    className: "web-design",
  },
  {
    title: "No-Code Development",
    copy: "I build powerful websites using no-code platforms, ensuring fast deployment, easy management, and flexibility without compromising performance.",
    points: ["Framer Development", "Webflow Development", "CMS Setup & Integration", "SEO & Performance Optimization", "Post-Launch Support"],
    background: "service-no-code-bg.png",
    image: "service-web-right.png",
    className: "no-code",
  },
];

const processSteps = [
  ["Discover the Essence that drives your brand", "S1", "I begin by clarifying your goals, audience, and market fit. The insights set a clear direction and define what success means for you.", "process-01.png"],
  ["Design Bold Ideas", "S2", "I turn strategy into a focused visual system, exploring distinct directions and shaping the strongest ideas with care.", "process-02.jpg"],
  ["Deliver with Speed", "S3", "I build, refine, and launch the final experience with clean execution, thoughtful motion, and a dependable handoff.", "process-03.svg"],
];

const experiences = [
  ["Independent Product Designer", "2025"],
  ["Senior UX Designer at CloudForge", "2024 - 2025"],
  ["Product Designer at Orbit Systems", "2022 - 2024"],
  ["UI/UX Designer at PixelHaus", "2021 - 2022"],
  ["Junior Designer at Brightline Studio", "2020 - 2021"],
];

const partnerLogos = [
  "NeEnZowivvRxiD6O0ombZUVUyU.svg",
  "P2dEUSLUXvn6d946nQwi4p4RWcs.svg",
  "opRCj3UKuxHVaaj8ZniuwvFQ.svg",
  "H4ZVWbLcHxAeN2o7GCPmDKshjs4.svg",
  "81eY2oAqFfEiOXpN2MwuaKaQE.svg",
  "qvyHyNMvqR4jtmFxApVLDJ0k.svg",
  "WSbFQuz6Rl4EQx6RY3jjvqPjsWo.svg",
  "Kij36VimiN3GTq1zmgoPDub3joc.svg",
  "SFWpxlxcI5FbC3b74WidfpYo.svg",
  "CcYFlAbQrk9XhQOy9jaUVXffkE.svg",
];

const testimonials = [
  {
    name: "Ethan Morales",
    role: "Marketing Director, Horizon Apparel",
    image: "testimonial-ethan.png",
    quote: '"The collaboration was smooth from start to finish. Davies translated complex ideas into a cohesive interface that supports long-term business growth."',
  },
  {
    name: "Liam Carter",
    role: "Founder, Arcadia Tech",
    image: "testimonial-liam.png",
    quote: '"Working with Davies was seamless. He nailed our vision and delivered a modern, functional website that truly reflects our brand identity."',
  },
  {
    name: "Sofia Carson",
    role: "Product Manager, Lumos Studio",
    image: "testimonial-sofia.png",
    quote: "“From first concept to launch, Davies exceeded expectations. Every choice was intentional, creating an intuitive and polished user experience.”",
  },
];

const plans = [
  {
    name: "Basic",
    monthly: 640,
    annual: 512,
    copy: "Perfect for early-stage teams launching their first online presence",
    points: ["Custom website design", "Responsive layouts", "Basic SEO setup", "Tool integrations", "Ongoing support"],
  },
  {
    name: "Pro",
    monthly: 1280,
    annual: 1024,
    copy: "Ideal for growing brands needing more features and creative flexibility",
    points: ["Advanced web design", "Interactive elements", "Full SEO services", "E-commerce setup", "Monthly reports"],
    featured: true,
  },
  {
    name: "Max",
    monthly: 2560,
    annual: 2048,
    copy: "Designed for established companies seeking a fully bespoke solution",
    points: ["Complete branding", "Premium visuals", "Enterprise systems", "Dedicated manager", "Priority support"],
  },
];

const faqs = [
  ["How long does a project usually take?", "Projects typically take around 3–6 weeks depending on scope, design, and feedback."],
  ["Do you work with international clients?", "Yes. I work remotely with founders and teams across time zones, with a clear async process and regular milestones."],
  ["Can you help with both design and development?", "Absolutely. Projects can cover strategy, visual design, prototyping, Framer or Webflow development, and launch support."],
  ["What’s your payment process?", "Projects are split into clear milestones. A deposit secures the start date, with the remaining payments tied to agreed deliverables."],
  ["Do you provide ongoing support after launch?", "Yes. Every launch includes a support window, and flexible monthly retainers are available for continued improvements."],
];

function Arrow({ direction = "right" }) {
  return <span aria-hidden="true">{direction === "left" ? "←" : "→"}</span>;
}

function Button({ children, href = "#contact", tone = "outline", onClick, type }) {
  return (
    <a className={`button button-${tone}`} href={href} onClick={onClick} role={type === "button" ? "button" : undefined}>
      <span>{children}</span>
      <span className="button-fill" />
    </a>
  );
}

function CornerMark() {
  return <span className="corner-mark" aria-hidden="true"><i /><i /></span>;
}

function RingText() {
  const text = "AWARD WINNING DESIGNER • SINCE 2020 • ";
  return (
    <div className="ring-text" aria-label="Award winning designer since 2020">
      {Array.from(text).map((char, i) => (
        <span style={{ "--i": i }} key={`${char}-${i}`}>{char}</span>
      ))}
      <span className="ring-core">D</span>
    </div>
  );
}

function useCountUp(target, duration = 2800) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - (1 - progress) ** 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [duration, target]);

  return [ref, value];
}

function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || !finePointer.matches || reducedMotion.matches) return undefined;

    const context = canvas.getContext("2d");
    const points = [];
    const lifetime = 620;
    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.lineCap = "round";
      context.lineJoin = "round";
    };

    const addPoint = (x, y, time) => {
      const previous = points[points.length - 1];
      if (!previous) {
        points.push({ x, y, time });
        return;
      }

      const distance = Math.hypot(x - previous.x, y - previous.y);
      const steps = Math.min(28, Math.max(1, Math.ceil(distance / 7)));
      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        points.push({
          x: previous.x + (x - previous.x) * progress,
          y: previous.y + (y - previous.y) * progress,
          time: previous.time + (time - previous.time) * progress,
        });
      }
      if (points.length > 70) points.splice(0, points.length - 70);
    };

    const onPointerMove = (event) => {
      const events = event.getCoalescedEvents?.() || [event];
      events.forEach((sample) => addPoint(sample.clientX, sample.clientY, performance.now()));
    };

    const draw = (now) => {
      while (points.length && now - points[0].time > lifetime) points.shift();
      context.clearRect(0, 0, width, height);

      if (points.length > 2) {
        const lastIndex = points.length - 1;
        context.shadowColor = "rgba(255, 255, 255, .22)";
        context.shadowBlur = 2.4;

        for (let index = 1; index < lastIndex; index += 1) {
          const previous = points[index - 1];
          const current = points[index];
          const next = points[index + 1];
          const age = Math.max(0, 1 - (now - current.time) / lifetime);
          const position = index / lastIndex;
          const strength = age * Math.pow(position, 0.42);
          if (strength <= 0.012) continue;

          context.beginPath();
          context.moveTo((previous.x + current.x) / 2, (previous.y + current.y) / 2);
          context.quadraticCurveTo(current.x, current.y, (current.x + next.x) / 2, (current.y + next.y) / 2);
          context.lineWidth = 0.24 + 2.05 * Math.pow(position, 0.72);
          context.strokeStyle = `rgba(246, 246, 243, ${Math.min(0.94, strength)})`;
          context.stroke();
        }
      }

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail-canvas" aria-hidden="true" />;
}

function useScrollMotion() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.to(".hero-video", {
        yPercent: 18,
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.45 },
      });

      gsap.to([".hero-mid", ".hero-bottom"], {
        y: -72,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "85% top", scrub: 0.35 },
      });

      gsap.utils.toArray(".work-card").forEach((card) => {
        const media = card.querySelector(".work-card-video, img");
        if (!media) return;
        gsap.fromTo(media, { scale: 1.045, yPercent: -1.5 }, {
          scale: 1,
          yPercent: 1.5,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.5 },
        });
      });

      const servicePanels = gsap.utils.toArray(".service-panel");
      if (window.matchMedia("(min-width: 810px)").matches) {
        servicePanels.slice(0, -1).forEach((panel, index) => {
          gsap.fromTo(panel, { scale: 1, opacity: 1 }, {
            scale: 0.7,
            opacity: 0.02,
            transformOrigin: "50% 50%",
            ease: "power1.out",
            scrollTrigger: {
              trigger: servicePanels[index + 1],
              start: "top bottom",
              end: "top top",
              scrub: 0.25,
              invalidateOnRefresh: true,
            },
          });
        });
      }

      gsap.fromTo(".about-visual", { y: 70 }, {
        y: -45,
        ease: "none",
        scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: 0.55 },
      });
      gsap.fromTo(".about-copy", { y: 95 }, {
        y: -25,
        ease: "none",
        scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: 0.55 },
      });
      gsap.to(".ring-text", {
        rotate: 270,
        ease: "none",
        scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: 0.4 },
      });

      gsap.fromTo(".awards-copy", { y: 90, opacity: 0 }, {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: ".awards", start: "top 82%", end: "top 30%", scrub: 0.35 },
      });
      gsap.fromTo(".awards-list", { x: -90, opacity: 0 }, {
        x: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: ".awards", start: "top 72%", end: "center 55%", scrub: 0.35 },
      });

      if (window.matchMedia("(min-width: 810px)").matches) {
        const awardCards = gsap.utils.toArray(".award-card");
        const fanX = [-421, -275, -88, 100, 274, 419];
        const fanY = [-279, -199, -81, 56, 201, 281];
        const awardsTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".awards",
            start: "top 59%",
            end: "top -15%",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });

        awardsTimeline.set(awardCards, {
          x: 1200,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          transformOrigin: "50% 50%",
          force3D: true,
        });

        const entryTimes = [0.46, 0.4, 0.355, 0.235, 0.17, 0.105];
        awardCards.forEach((card, index) => {
          awardsTimeline.to(card, { x: 0, duration: 0.2, ease: "power2.out" }, entryTimes[index]);
        });

        awardsTimeline.to(awardCards, {
          x: (index) => fanX[index],
          y: (index) => fanY[index],
          rotationX: 4,
          rotationY: 10,
          rotationZ: -9,
          duration: 0.36,
          ease: "power2.inOut",
        }, 0.64);
      }

      [".pricing-heading", ".plan-grid", ".faq h2", ".faq-list", ".contact-inner", ".footer-top"].forEach((selector) => {
        const element = document.querySelector(selector);
        if (!element) return;
        gsap.fromTo(element, { y: 85, opacity: 0 }, {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 96%", end: "top 62%", scrub: 0.4 },
        });
      });

      gsap.fromTo(".footer-wordmark img", { scale: 0.8 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 0.4 },
      });
    });

    const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refresh);
      context.revert();
    };
  }, []);
}

function Stat({ label, target, suffix, copy }) {
  const [ref, value] = useCountUp(target);
  return (
    <article className="stat" ref={ref} data-reveal>
      <p><span>//</span> {label}</p>
      <div className="stat-number">{value}<em>{suffix}</em></div>
      <small>{copy}</small>
    </article>
  );
}

function Header({ menuOpen, setMenuOpen }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
      <a className="brand-mark" href="#top" aria-label="Davies home">
        <img src={`${A}brand-mark.svg`} alt="" />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([n, label, id]) => (
          <a href={`#${id}`} key={id}><sup>{n} /</sup>{label}</a>
        ))}
      </nav>
      <div className="header-contact">
        <a href="mailto:davies@gmail.com">DAVIES@GMAIL.COM</a>
        <span>CUP&nbsp; {time}</span>
      </div>
      <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="menu-overlay">
        <span className="menu-glyph">{menuOpen ? "×" : "≡"}</span> {menuOpen ? "CLOSE" : "MENU"}
      </button>
    </header>
  );
}

function MenuOverlay({ open, close }) {
  const menuLinks = [
    ["Works", "works"],
    ["About", "about"],
    ["Services", "services"],
    ["Contact", "contact"],
  ];

  return (
    <div className={`menu-overlay ${open ? "is-open" : ""}`} id="menu-overlay" aria-hidden={!open}>
      <div className="menu-overlay-glow" aria-hidden="true" />
      <nav className="menu-links" aria-label="Menu navigation">
        {menuLinks.map(([label, id]) => (
          <a href={`#${id}`} onClick={close} key={id}>{label}</a>
        ))}
      </nav>
      <div className="menu-contact"><a href="mailto:davies@gmail.com">DAVIES@GMAIL.COM</a><span>CUP</span></div>
      <div className="menu-socials"><a href="https://x.com/">↗ TWITTER(X)</a><a href="https://dribbble.com/">↗ DRIBBBLE</a><a href="https://linkedin.com/">↗ LINKEDIN</a></div>
    </div>
  );
}

function Hero() {
  const roles = ["WATER WAVE", "GRIDWAVE", "LIGHT TUNNEL"];

  return (
    <section className="hero" id="top" data-scroll-motion>
      <video className="hero-video" autoPlay muted loop playsInline poster={`${A}about-glow.jpg`}>
        <source src={`${A}hero-liquid.mp4`} type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <div className="hero-mid page-shell">
        <div className="role-list">
          {roles.map((item, index) => <span className={index === 0 ? "active" : ""} key={item}>0{index + 1} / {item}</span>)}
        </div>
        <div className="availability"><i /> AVAILABLE FOR WORK</div>
        <div className="copyright">© {new Date().getFullYear()}</div>
      </div>
      <div className="hero-bottom page-shell">
        <h1>DAVIES<span>_</span></h1>
        <div className="hero-copy" data-reveal>
          <p>I craft bold brands and modern websites with purpose. Each detail balances design and usability for impact. My work adapts as your vision grows.</p>
          <Button>START A PROJECT</Button>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-label="Selected Work">
      <div className="marquee-track">
        {[0, 1, 2, 3].map((item) => <span key={item}>Selected Work <i className="wire-globe" /></span>)}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useSpring(pointerX, { stiffness: 560, damping: 36, mass: 0.55 });
  const cursorY = useSpring(pointerY, { stiffness: 560, damping: 36, mass: 0.55 });

  const moveCursor = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  };

  return (
    <div className="work-stage" data-scroll-motion>
      <a
        className={`work-card ${project.className}`}
        href="#contact"
        aria-label={`${project.title} case study`}
        onPointerEnter={(event) => { moveCursor(event); setHovered(true); }}
        onPointerMove={moveCursor}
        onPointerLeave={() => setHovered(false)}
      >
        {index === 0 && <video className="work-card-video" autoPlay muted loop playsInline poster={`${A}${project.image}`}><source src="https://wpriverthemes.com/HTML/davies/assets/images/video/nexbot.mp4" type="video/mp4" /></video>}
        <img className={index === 0 ? "work-card-poster" : ""} src={`${A}${project.image}`} alt={`${project.title} project presentation`} />
        <div className="work-overlay" />
        <motion.span
          className="work-card-action"
          style={{ x: cursorX, y: cursorY }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.72 }}
          transition={{ opacity: { duration: 0.18 }, scale: { type: "spring", stiffness: 360, damping: 24 } }}
          aria-hidden="true"
        >↗</motion.span>
        <h2>{project.title}</h2>
        <div className="industry"><small>Industry</small>{project.industry.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="work-services"><small>Services</small>{project.services.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="work-year">20<em>26</em></div>
      </a>
    </div>
  );
}

function Works() {

  return (
    <section className="works" id="works">
      <Marquee />
      <div className="work-stack page-shell">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={`${project.title}-${index}`} />
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const [start, setStart] = useState(0);
  const visible = [products[start % products.length], products[(start + 1) % products.length]];
  return (
    <section className="featured page-shell" data-scroll-motion>
      <div className="section-heading" data-reveal>
        <h2>Featured Products</h2>
        <Button href="#featured">BROWSE ALL</Button>
      </div>
      <div className="product-grid" id="featured">
        <AnimatePresence initial={false} mode="popLayout">
        {visible.map(([category, name, price, image], index) => (
          <motion.article
            className="product-card"
            key={`${name}-${start}-${index}`}
            layout
            initial={{ opacity: 0, x: index === 0 ? -70 : 70, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: index === 0 ? 70 : -70, scale: 0.98 }}
            transition={{ duration: 0.62, ease: [0.2, 0.72, 0.2, 1] }}
          >
            <div className="product-image"><img src={`${A}${image}`} alt="" /><span aria-hidden="true">↗</span></div>
            <div><small>{category}</small><h3>{name}</h3></div>
            <strong>{price}</strong>
          </motion.article>
        ))}
        </AnimatePresence>
      </div>
      <div className="carousel-controls">
        <button aria-label="Previous products" onClick={() => setStart((value) => (value - 1 + products.length) % products.length)}><Arrow direction="left" /> PREV</button>
        <button aria-label="Next products" onClick={() => setStart((value) => (value + 1) % products.length)}>NEXT <Arrow /></button>
      </div>
    </section>
  );
}

function ServiceContent({ service }) {
  return (
    <div className="service-content" data-reveal>
      <h3>{service.title}</h3>
      <p>{service.copy}</p>
      <ul>{service.points.map((point) => <li key={point}><span>//</span>{point}</li>)}</ul>
      <Button>START A PROJECT</Button>
    </div>
  );
}

function Services() {
  return (
    <section className="services" id="services">
      {services.map((service, index) => (
        <div className="service-stage" key={service.title} data-scroll-motion>
          <article className={`service-panel ${service.className}`}>
            <div className="service-blur" />
            <img className="service-background-image" src={`${A}${service.background}`} alt="" />
            <div className="service-media">
              <img className="service-main-image" src={`${A}${service.image}`} alt="" />
              {service.detail && <img className="service-detail-image" src={`${A}${service.detail}`} alt="" />}
            </div>
            <ServiceContent service={service} />
            <span className="service-index">0{index + 1} / 03</span>
            <CornerMark />
          </article>
        </div>
      ))}
    </section>
  );
}

function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const moveSpotlight = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <section className="process page-shell" data-scroll-motion>
      <h2 data-reveal>The Process</h2>
      <div className="process-grid" data-reveal>
        {processSteps.map(([title, step, copy, image], index) => (
          <article
            className={index === activeStep ? "active" : ""}
            key={step}
            onPointerEnter={() => setActiveStep(index)}
            onPointerMove={moveSpotlight}
            onFocus={() => setActiveStep(index)}
            tabIndex="0"
          >
            <img src={`${A}${image}`} alt="" />
            <h3>{title}</h3>
            <div className="process-bottom"><strong>{step}</strong><p>{copy}</p></div>
          </article>
        ))}
      </div>
      <CornerMark />
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about" data-scroll-motion>
      <div className="about-glow" />
      <div className="about-top page-shell">
        <div className="about-visual" data-reveal>
          <video autoPlay muted loop playsInline><source src={`${A}about-video.mp4`} type="video/mp4" /></video>
          <span className="signature">davies.</span>
          <RingText />
        </div>
        <div className="about-copy" data-reveal>
          <small>ABOUT ME</small>
          <h2>I’m a designer and no-code developer creating bold, functional, and award-winning digital experiences that help brands connect with their audience.</h2>
          <div className="experience">
            <h3>Work Experience</h3>
            {experiences.map(([role, year]) => <div key={role}><span>{role}</span><time>{year}</time></div>)}
          </div>
        </div>
      </div>
      <div className="partners page-shell">
        <p>BRANDS AND PARTNERS</p>
        <div className="partner-grid">
          {partnerLogos.map((logo, index) => <div key={`${logo}-${index}`} data-reveal style={{ "--reveal-delay": `${(index % 5) * 70}ms` }}><img src={`${A}${logo}`} alt="Partner logo" /></div>)}
        </div>
      </div>
      <CornerMark />
    </section>
  );
}

function Awards() {
  const awards = [["Awwwards", "x41"], ["CSS Design Awards", "x67"], ["Behance", "x28"]];

  return (
    <section className="awards page-shell" data-scroll-motion>
      <div className="awards-copy" data-reveal>
        <small>AWARDS</small>
        <h2>Since 2020, my work has been honored by leading design platforms around the world. Each award represents a project where creativity, precision, and impact came together.</h2>
      </div>
      <div className="awards-list" data-reveal>
        <p>157 industry awards.<br />Bold ideas. Flawless execution.</p>
        <div className="award-marquee">
          {[0, 1, 2].map((set) => <div className="award-set" key={set}>{awards.map(([name, count]) => <span key={`${name}-${set}`}><b>{name}</b><em>{count}</em></span>)}</div>)}
        </div>
      </div>
      <div className="award-collage" aria-label="Award-winning project collage">
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <img
            className={`award-card award-card-${card}`}
            src={`${A}award-card-${card}.svg`}
            alt=""
            aria-hidden="true"
            key={card}
          />
        ))}
      </div>
      <CornerMark />
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const ordered = useMemo(() => testimonials.map((_, index) => testimonials[(index + active) % testimonials.length]), [active]);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % testimonials.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="testimonials page-shell" data-scroll-motion>
      <p className="section-label">TRUSTED BY FOUNDERS</p>
      <div className="testimonial-grid">
        <AnimatePresence initial={false} mode="popLayout">
          {ordered.map((item, index) => (
          <motion.article
            className={index === 0 ? "current" : ""}
            key={`${item.name}-${active}`}
            layout
            initial={{ opacity: 0, x: 110, scale: 0.975 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -110, scale: 0.975 }}
            transition={{ duration: 0.68, delay: index * 0.055, ease: [0.2, 0.72, 0.2, 1] }}
          >
            <div className="portrait"><img src={`${A}${item.image}`} alt={item.name} /></div>
            <h3>{item.name}</h3><p className="role">{item.role}</p><hr /><blockquote>{item.quote}</blockquote>
          </motion.article>
          ))}
        </AnimatePresence>
      </div>
      <div className="round-controls">
        <button onClick={() => setActive((value) => (value - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial"><Arrow direction="left" /></button>
        <button onClick={() => setActive((value) => (value + 1) % testimonials.length)} aria-label="Next testimonial"><Arrow /></button>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats" data-scroll-motion>
      <div className="stats-grid page-shell">
        <Stat label="Projects Delivered" target={40} suffix="+" copy={<>Creative work that drive<br />real results</>} />
        <Stat label="Clients Satisfaction" target={96} suffix="%" copy={<>I mostly focus on<br />exceeding expectations</>} />
        <Stat label="Years of Experience" target={10} suffix="+" copy={<>Mastering the art of animation,<br />content and design</>} />
      </div>
    </section>
  );
}

function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <section className="pricing page-shell" data-scroll-motion>
      <div className="pricing-heading" data-reveal>
        <small>PRICING</small>
        <h2>Pricing made easy</h2>
        <div className="billing-toggle" role="group" aria-label="Billing period">
          <button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}><i />Monthly</button>
          <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}><i />Annually - <span>Save 20%</span></button>
        </div>
      </div>
      <div className="plan-grid">
        {plans.map((plan, index) => (
          <article className={plan.featured ? "featured-plan" : ""} key={plan.name} data-reveal style={{ "--reveal-delay": `${index * 110}ms` }}>
            <div className="plan-line" />
            <h3>{plan.name}</h3>
            <div className="price"><sup>$</sup>{(annual ? plan.annual : plan.monthly).toLocaleString()}<small>/month</small></div>
            <p>{plan.copy}</p>
            <Button tone={plan.featured ? "green" : plan.name === "Max" ? "white" : "outline"}>CHOOSE THIS PLAN</Button>
            <h4>What’s included:</h4>
            <ul>{plan.points.map((point) => <li key={point}><span>//</span>{point}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" data-scroll-motion>
      <div className="faq-glow" />
      <div className="faq-inner page-shell">
        <h2 data-reveal>Frequently<br />asked questions</h2>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <article className={open === index ? "open" : ""} key={question} data-reveal style={{ "--reveal-delay": `${index * 60}ms` }}>
              <button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
                <span>{String(index + 1).padStart(2, "0")}</span><b>{question}</b><i>{open === index ? "−" : "+"}</i>
              </button>
              <div className="faq-answer"><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </div>
      <CornerMark />
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");
  const submit = (event) => {
    event.preventDefault();
    setStatus("Thanks — your message is ready to send.");
  };
  return (
    <section className="contact" id="contact" data-scroll-motion>
      <div className="contact-grid-bg" />
      <img className="contact-mark" src={`${A}contact-mark.svg`} alt="" />
      <div className="contact-inner page-shell">
        <h2 data-reveal>Let’s start<br />creating together</h2>
        <form onSubmit={submit}>
          <label><span>Name<em>*</em></span><input name="name" required placeholder="Enter Your Name" /></label>
          <label><span>Email<em>*</em></span><input name="email" required type="email" placeholder="Enter Your Email" /></label>
          <label><span>You are interested in</span><select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Web Development</option><option>UI UX Design</option><option>Digital Marketing</option></select></label>
          <label><span>Budget in USD</span><select name="budget" defaultValue=""><option value="" disabled>Select a budget</option><option>$0 - $100</option><option>$100 - $500</option><option>$500 - $1000</option><option>$1000+</option></select></label>
          <label className="message-field"><span>Project details<em>*</em></span><textarea name="message" required placeholder="Write Message" /></label>
          <div className="form-bottom"><button type="submit">SUBMIT MESSAGE</button><p>say hello - <a href="mailto:davies@gmail.com">davies@gmail.com</a></p></div>
          <p className="form-status" role="status">{status}</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [["About", "about"], ["Works", "works"], ["Services", "services"], ["Contact", "contact"]];
  return (
    <footer className="footer" data-scroll-motion>
      <div className="footer-top page-shell">
        <p className="global"><i />WORKING GLOBALLY</p>
        <div><small>SITEMAP</small>{footerLinks.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div>
        <div><small>SOCIALS</small><a href="#twitter">Twitter (X)</a><a href="#dribbble">Dribbble</a><a href="#linkedin">LinkedIn</a></div>
      </div>
      <div className="footer-wordmark page-shell"><img src={`${A}davies-wordmark.svg`} alt="Davies" /></div>
      <div className="footer-bottom page-shell"><span>© DAVIES&apos;S PERSONAL PORTFOLIO</span><a href="#top">BACK TO HOME <Arrow direction="left" /></a></div>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollMotion();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8%" });

    const observeReveals = (root = document) => {
      if (root.matches?.("[data-reveal]")) observer.observe(root);
      root.querySelectorAll?.("[data-reveal]").forEach((node) => observer.observe(node));
    };

    observeReveals();
    const mutations = new MutationObserver((entries) => {
      entries.forEach((entry) => entry.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) observeReveals(node);
      }));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <CursorTrail />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MenuOverlay open={menuOpen} close={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <Works />
        <FeaturedProducts />
        <Services />
        <Process />
        <About />
        <Awards />
        <Testimonials />
        <Stats />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
