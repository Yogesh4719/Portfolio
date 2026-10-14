import {
  type ComponentType,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import MarketingHome from "./tummytales/MarketingHome"
import ServicesPage from "./tummytales/ServicesPage"
import CalendarDashboard from "./tummytales/CalendarDashboard"
import AnalyticsDashboard from "./tummytales/AnalyticsDashboard"
import AskAssistant from "./tummytales/AskAssistant"
import KickCounter from "./tummytales/KickCounter"
import Marketplace from "./tummytales/Marketplace"
import SignUpScreen from "./tummytales/SignUpScreen"
import LoginScreen from "./tummytales/LoginScreen"
import MatiksArenaFinal from "./matiks/MatiksArenaFinal"
import MatiksArenaLive from "./matiks/MatiksArenaLive"
import GPayHome from "./gpay/GPayHome"
import GPayPayment from "./gpay/GPayPayment"
import GPayPaymentKeyboard from "./gpay/GPayPaymentKeyboard"
import BiteProfile from "./bitebuzz/BiteProfile"
import BiteHome from "./bitebuzz/BiteHome"
import BiteLocation from "./bitebuzz/BiteLocation"
import BiteSearch from "./bitebuzz/BiteSearch"
import BiteFastFood from "./bitebuzz/BiteFastFood"
import BiteDesserts from "./bitebuzz/BiteDesserts"
import BiteBurgerDetail from "./bitebuzz/BiteBurgerDetail"
import BitePizzaDetail from "./bitebuzz/BitePizzaDetail"
import BiteCart from "./bitebuzz/BiteCart"
import BiteSuccess from "./bitebuzz/BiteSuccess"

const RESUME_PATH = "/Resume.pdf"
const RESUME_DOWNLOAD_NAME = "Resume.pdf"

type LinkProps = {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  label?: string
  download?: string
}

function Link({
  href,
  children,
  className = "",
  onClick,
  label,
  download,
}: LinkProps) {
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      aria-label={label}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  )
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function usePageInteractions() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const progress = [
      ...document.querySelectorAll<HTMLElement>(
        ".scroll-progress, .nav-progress-fill",
      ),
    ]
    const header = document.querySelector<HTMLElement>(".site-header")
    let frame = 0

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const amount = max > 0 ? window.scrollY / max : 0
        progress.forEach((element) =>
          element.style.setProperty("--progress", String(amount)),
        )
        header?.classList.toggle("header-scrolled", window.scrollY > 24)
        document.documentElement.style.setProperty(
          "--hero-scroll",
          String(Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1)),
        )
        const matiksStory = document.querySelector<HTMLElement>(".matiks-story")
        if (matiksStory) {
          const rect = matiksStory.getBoundingClientRect()
          const range = Math.max(
            matiksStory.offsetHeight - window.innerHeight,
            1,
          )
          matiksStory.style.setProperty(
            "--story-progress",
            String(Math.min(Math.max(-rect.top / range, 0), 1)),
          )
        }
      })
    }

    const reveals = [...document.querySelectorAll<HTMLElement>("[data-reveal]")]
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add("is-visible")
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    reveals.forEach((element) => revealObserver.observe(element))

    const sections = [
      ...document.querySelectorAll<HTMLElement>("main section[id]"),
    ]
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          document.querySelectorAll(".nav-links a").forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            )
          })
        })
      },
      { rootMargin: "-35% 0px -55%" },
    )
    sections.forEach((section) => sectionObserver.observe(section))

    const onMagnet = (event: Event) => {
      if (reduced || !finePointer) return
      const mouse = event as MouseEvent
      const target = mouse.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      target.style.setProperty(
        "--magnet-x",
        `${(mouse.clientX - rect.left - rect.width / 2) * 0.14}px`,
      )
      target.style.setProperty(
        "--magnet-y",
        `${(mouse.clientY - rect.top - rect.height / 2) * 0.14}px`,
      )
    }
    const resetMagnet = (event: Event) => {
      const target = event.currentTarget as HTMLElement
      target.style.setProperty("--magnet-x", "0px")
      target.style.setProperty("--magnet-y", "0px")
    }
    const magnets = [
      ...document.querySelectorAll<HTMLElement>(".button, .nav-cta"),
    ]
    magnets.forEach((element) => {
      element.addEventListener("mousemove", onMagnet)
      element.addEventListener("mouseleave", resetMagnet)
    })

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
      revealObserver.disconnect()
      sectionObserver.disconnect()
      magnets.forEach((element) => {
        element.removeEventListener("mousemove", onMagnet)
        element.removeEventListener("mouseleave", resetMagnet)
      })
    }
  })
}

function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null)
  const trails = useRef<(HTMLSpanElement | null)[]>([])
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    const trailX = [x, x, x, x]
    const trailY = [y, y, y, y]
    let frame = 0
    const updatePosition = () => {
      x = Math.max(8, Math.min(x, window.innerWidth - 8))
      y = Math.max(8, Math.min(y, window.innerHeight - 8))
      cursor.current?.style.setProperty("--cursor-x", `${x}px`)
      cursor.current?.style.setProperty("--cursor-y", `${y}px`)
    }
    updatePosition()
    const move = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      updatePosition()
      cursor.current?.classList.add("cursor-visible")
      trails.current.forEach((trail) => trail?.classList.add("cursor-visible"))
      if (!reducedMotion && !frame) frame = requestAnimationFrame(renderTrails)
    }
    const renderTrails = () => {
      let stillMoving = false
      trailX.forEach((value, index) => {
        const targetX = index === 0 ? x : trailX[index - 1]
        const targetY = index === 0 ? y : trailY[index - 1]
        const easing = 0.2 - index * 0.025
        trailX[index] = value + (targetX - value) * easing
        trailY[index] += (targetY - trailY[index]) * easing
        trails.current[index]?.style.setProperty(
          "transform",
          `translate3d(${trailX[index]}px, ${trailY[index]}px, 0) rotate(-38deg)`,
        )
        stillMoving ||=
          Math.abs(targetX - trailX[index]) > 0.5 ||
          Math.abs(targetY - trailY[index]) > 0.5
      })
      frame = stillMoving ? requestAnimationFrame(renderTrails) : 0
    }
    const targetFor = (target: EventTarget | null) =>
      target instanceof Element
        ? target.closest<HTMLElement>("a, button, [data-cursor]")
        : null
    const updateTarget = (target: HTMLElement | null) => {
      const label = target?.dataset.cursor || ""
      cursor.current?.setAttribute("data-label", label)
      cursor.current?.classList.toggle("cursor-active", Boolean(target))
    }
    const over = (event: MouseEvent) => updateTarget(targetFor(event.target))
    const out = (event: MouseEvent) => {
      const previous = targetFor(event.target)
      const next = targetFor(event.relatedTarget)
      if (previous !== next) updateTarget(next)
    }
    window.addEventListener("mousemove", move, { passive: true })
    window.addEventListener("resize", updatePosition)
    document.addEventListener("mouseover", over)
    document.addEventListener("mouseout", out)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("resize", updatePosition)
      document.removeEventListener("mouseover", over)
      document.removeEventListener("mouseout", out)
      cancelAnimationFrame(frame)
    }
  }, [])
  return createPortal(
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <span
          key={index}
          ref={(node) => {
            trails.current[index] = node
          }}
          className={`cursor-trail cursor-trail-${index + 1}`}
          aria-hidden="true"
        />
      ))}
      <div ref={cursor} className="custom-cursor" aria-hidden="true" />
    </>,
    document.body,
  )
}

function SectionTitle({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <div className="section-heading-row">
        <p className="section-title" role="heading" aria-level={2}>
          {title}
        </p>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
    </div>
  )
}

const projects = [
  {
    number: "01",
    name: "Matiks",
    category: "Learning · Mobile App",
    year: "2025",
    description:
      "A learning-game redesign making live events, progress and quick play easier to find.",
    tags: ["Product Design", "UX Research", "UI Design", "Interaction Design"],
    challenge:
      "Make the Arena easier to scan and faster to enter while reducing bottom-navigation clutter and preserving familiar game modes.",
    response:
      "Strengthen live events, challenge progress and quick play, then simplify the bottom navigation from six destinations to five.",
    proof:
      "Shows product thinking across hierarchy, progression and navigation without presenting the existing game modes as new work.",
    learning:
      "Engagement works best when progress, challenge and reward reinforce the same core action.",
    visual: "matiks",
    featured: true,
  },
  {
    number: "04",
    name: "TummyTales",
    category: "FemTech · Website & Product",
    year: "Freelance",
    description:
      "A FemTech website and product concept bringing pregnancy tracking, guided support and community together.",
    tags: ["UI/UX Design", "Website Design", "FemTech", "Product Design"],
    challenge:
      "Bring a broad pregnancy-support ecosystem into one experience without losing clarity, warmth or trust.",
    response:
      "Use a consistent visual language and distinct feature spaces for daily planning, tracking, guided assistance and useful resources.",
    proof:
      "Shows end-to-end design across a public website, dashboards, agent experiences, tracking tools and supporting account flows.",
    learning:
      "Broad support ecosystems feel coherent when every feature has a clear role and the overall experience retains a calm hierarchy.",
    visual: "tummytales",
    featured: false,
  },
  {
    number: "05",
    name: "Rootree",
    category: "SaaS Analytics",
    year: "2025",
    description:
      "A multi-page website making an AI analytics platform, its solutions and services easier to understand.",
    tags: ["UI/UX Design", "SaaS Website", "Data Analytics", "Design System"],
    challenge:
      "Explain a broad analytics ecosystem without losing clarity, credibility or a clear path to enquiry.",
    response:
      "Build a dark, data-led visual system around product proof, outcome-focused messaging and consistent conversion patterns.",
    proof:
      "Demonstrates multi-page website design, information architecture and visual-system thinking for a complex B2B offer.",
    learning:
      "Technical products become easier to trust when product evidence and plain-language outcomes appear together.",
    visual: "rootree",
    featured: false,
  },
  {
    number: "02",
    name: "GPay",
    category: "Fintech · Mobile App",
    year: "2025",
    description:
      "An independent Google Pay concept adding quick transaction notes and a clear monthly spending snapshot.",
    tags: ["UX Research", "Fintech", "Interaction Design", "Mobile App"],
    challenge:
      "Improve spending awareness and transaction context without turning Google Pay into a budgeting app or adding friction to payment.",
    response:
      "Add one-tap note suggestions in the payment flow and a concise monthly snapshot within the familiar home experience.",
    proof:
      "Demonstrates research-led feature definition, mobile fintech UI and interaction reasoning without implying official Google affiliation.",
    learning:
      "Useful financial context works best when it stays optional, lightweight and close to an existing user action.",
    visual: "gpay",
    featured: false,
  },
  {
    number: "03",
    name: "BiteBuzz Food App",
    category: "Food Discovery & Commerce",
    year: "2025",
    description:
      "A food-discovery app concept with expressive browsing, clear menus and a smoother path to order.",
    tags: ["Mobile App", "Food Tech", "UI/UX", "Interaction Design"],
    challenge:
      "Make food discovery feel expressive and appetising while keeping menu choices and ordering actions easy to understand.",
    response:
      "Use bold imagery, compact dish information and tactile browsing patterns to balance appetite with utility.",
    proof:
      "Demonstrates energetic art direction, mobile commerce hierarchy and playful but controlled interaction design.",
    learning:
      "Food interfaces need visual energy, but the next decision to browse, customise or order must always remain obvious.",
    visual: "bitebuzz",
    featured: false,
  },
].sort(
  (a, b) =>
    ["matiks", "gpay", "bitebuzz", "tummytales", "rootree"].indexOf(a.visual) -
    ["matiks", "gpay", "bitebuzz", "tummytales", "rootree"].indexOf(b.visual),
)

function InterfaceVisual({ type }: { type: string }) {
  if (type === "matiks") {
    return (
      <div
        className="mockup matiks-mockup"
        aria-label="MATIKS mobile product interface preview"
      >
        <div className="matiks-orbit orbit-one" />
        <div className="matiks-orbit orbit-two" />
        <div className="matiks-study matiks-study-before">
          <img
            src="/matiks/arena-before-branded.png"
            alt="MATIKS Arena interface before redesign with UX annotations"
          />
          <span>Before / UX audit</span>
        </div>
        <div className="matiks-study matiks-study-after">
          <img
            src="/matiks/arena-after-branded.png"
            alt="MATIKS Arena redesign with interaction improvements annotated"
          />
          <span>After / design response</span>
        </div>
        <div className="matiks-device matiks-device-back">
          <div className="matiks-device-speaker" />
          <div className="matiks-canvas">
            <MatiksArenaLive />
          </div>
        </div>
        <div className="matiks-device matiks-device-front">
          <div className="matiks-device-speaker" />
          <div className="matiks-canvas">
            <MatiksArenaFinal />
          </div>
        </div>
        <span className="matiks-mockup-label">Arena redesign · Final UI</span>
      </div>
    )
  }

  if (type === "rootree") {
    return (
      <div
        className="mockup rootree-mockup"
        aria-label="Rootree AI website preview"
      >
        <div className="rootree-card-glow" />
        <div className="rootree-site-frame rootree-site-main">
          <div className="rootree-site-bar">
            <i />
            <i />
            <i />
            <span>rootree.ai</span>
          </div>
          <div className="rootree-site-viewport">
            <img
              src="/rootree/screen-05.png"
              alt="Rootree AI home page showing the analytics platform and dashboard"
            />
          </div>
        </div>
        <div className="rootree-device-base" />
        <div className="rootree-site-frame rootree-site-solution">
          <div className="rootree-site-bar">
            <i />
            <i />
            <i />
            <span>solutions</span>
          </div>
          <div className="rootree-site-viewport">
            <img
              src="/rootree/screen-02.png"
              alt="Rootree enterprise dashboards and rewards solutions"
            />
          </div>
        </div>
        <span className="rootree-card-caption">
          <b>Rootree AI</b>
          <small>Give life to your data</small>
        </span>
      </div>
    )
  }

  if (type === "tummytales") {
    return (
      <div
        className="mockup tummy-mockup"
        aria-label="TummyTales product ecosystem mockups"
      >
        <div className="tummy-project-orbit tummy-orbit-one" />
        <div className="tummy-project-orbit tummy-orbit-two" />
        <TummyScreenPreview
          screen={tummyScreens[2]}
          className="tummy-project-main"
        />
        <div className="tummy-device-base" />
        <TummyScreenPreview
          screen={tummyScreens[4]}
          className="tummy-project-assistant"
        />
        <span className="tummy-project-label tummy-label-dashboard">
          Daily dashboard
        </span>
        <span className="tummy-project-label tummy-label-support">
          Ask Mama
        </span>
      </div>
    )
  }

  if (type === "gpay") {
    return (
      <div
        className="mockup gpay-mockup gpay-card-mockup"
        aria-label="Independent GPay financial insights and quick transaction notes concept"
      >
        <span className="concept-stamp">
          Independent concept · Not affiliated with Google
        </span>
        <GPayRealScreen
          screen="home"
          label="Google Pay home screen with financial insights"
          className="gpay-card-home"
        />
        <GPayRealScreen
          screen="payment"
          label="Google Pay payment screen with quick transaction notes"
          className="gpay-card-payment"
        />
        <span className="gpay-card-label">
          <b>Two lightweight additions</b>
          <small>Financial insights · Quick notes</small>
        </span>
      </div>
    )
  }

  return (
    <div
      className="mockup bitebuzz-mockup bitebuzz-real-mockup"
      aria-label="BiteBuzz food ordering app preview"
    >
      <div className="bitebuzz-card-wordmark">
        Bite<span>Buzz</span>
      </div>
      <BitePhone screen={biteScreens[1]} className="bitebuzz-card-home" />
      <BitePhone screen={biteScreens[6]} className="bitebuzz-card-detail" />
      <BitePhone screen={biteScreens[8]} className="bitebuzz-card-cart" />
      <span className="food-sticker">Discover · choose · order</span>
    </div>
  )
}

type Project = typeof projects[number]

function Wireframe({ number }: { number: number }) {
  return (
    <div className="wireframe">
      <div className="wire-top">
        <i />
        <span>Wireframe {String(number).padStart(2, "0")}</span>
      </div>
      <div className="wire-hero">
        <i />
        <i />
      </div>
      <div className="wire-grid">
        <i />
        <i />
        <i />
      </div>
      <div className="wire-lines">
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}

function MatiksStory() {
  const moments = [
    ["Quick play", "Turning mathematics into a game.", "12 × 8"],
    ["Brain DNA", "Making progress feel personal.", "78%"],
    ["Matiks Lab", "From quick play to deeper learning.", "LAB"],
    ["Store", "Motivation through meaningful rewards.", "120"],
    ["Ecosystem", "Designing an ecosystem, not just an interface.", "∞"],
  ]
  return (
    <section className="matiks-story">
      <div className="matiks-story-sticky">
        <div className="matiks-story-head">
          <span>MATIKS / Product ecosystem</span>
          <small>Scroll to travel through the experience →</small>
        </div>
        <div className="matiks-story-track">
          {moments.map(([title, caption, mark], index) => (
            <article key={title}>
              <div className="story-phone">
                <span>0{index + 1}</span>
                <b>{mark}</b>
                <i />
              </div>
              <small>{title}</small>
              <p>{caption}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const matiksScreens = {
  original: "/matiks/arena-before-branded.png",
  redesigned: "/matiks/arena-after-branded.png",
} as const

function MatiksEvidence({
  screen,
  label,
  className = "",
}: {
  screen: keyof typeof matiksScreens
  label: string
  className?: string
}) {
  const source = matiksScreens[screen]
  return (
    <div className={`matiks-evidence ${className}`}>
      <img src={source} alt={label} />
    </div>
  )
}

function MatiksFinalPhone({
  variant,
  label,
}: {
  variant: "daily" | "live"
  label: string
}) {
  const Screen = variant === "live" ? MatiksArenaLive : MatiksArenaFinal
  return (
    <div
      className={`matiks-final-phone matiks-final-${variant}`}
      role="img"
      aria-label={label}
    >
      <div className="matiks-final-speaker" />
      <div className="matiks-final-canvas" aria-hidden="true">
        <Screen />
      </div>
    </div>
  )
}

function MatiksFeatureCrop({ index, label }: { index: number; label: string }) {
  const isBottomNavigation = index === 3

  return (
    <div
      className={`matiks-feature-crop matiks-feature-${index} ${
        isBottomNavigation ? "matiks-feature-bottom-nav" : ""
      }`}
      role="img"
      aria-label={
        isBottomNavigation
          ? "Redesigned Matiks Arena bottom navigation with Arena, Snac, Compete, Quests and More"
          : `MATIKS ${label} interface detail`
      }
    >
      {isBottomNavigation ? (
        <img src="/matiks/arena-after-branded.png" alt="" />
      ) : (
        <div className="matiks-feature-canvas" aria-hidden="true">
          <MatiksArenaLive />
        </div>
      )}
      <span>{label}</span>
    </div>
  )
}

const matiksChanges = [
  {
    title: "Online users",
    problem: "Online users take up unnecessary space.",
    decision:
      "Reduce the visual footprint of presence information so play content leads.",
    benefit:
      "Players can scan the Arena without a secondary status area competing for attention.",
  },
  {
    title: "Live events",
    problem: "Live events could be stronger and harder to miss.",
    decision: "Give time-sensitive events a dedicated, high-contrast stage.",
    benefit:
      "Important moments are easier to recognise while they are relevant.",
  },
  {
    title: "Daily challenges",
    problem: "Daily challenges could be clearer.",
    decision:
      "Surface progress, rewards and remaining challenge slots together.",
    benefit:
      "Players can understand what is complete and what to do next at a glance.",
  },
  {
    title: "Bottom navigation",
    problem:
      "Six bottom-navigation items created too many competing destinations on a small screen.",
    decision:
      "Reduce the navigation from six items to five: Arena, Snac, Compete, Quests and More.",
    benefit:
      "The primary destinations remain available with less visual clutter and a clearer scan path.",
  },
]

function MatiksCaseStudy({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: () => void
}) {
  const hero = useRef<HTMLDivElement>(null)
  const [activeChange, setActiveChange] = useState(0)
  const [activeArena, setActiveArena] = useState(2)
  const selectedChange = matiksChanges[activeChange] ?? matiksChanges[0]
  const arenaNotes = [
    ["Matiks Fun Fact", "A lightweight reason to discover something new."],
    ["Monthly Report", "A visible route back to personal progress."],
    ["Live Events", "Time-sensitive play receives a stronger stage."],
    ["Daily Challenges", "Progress, rewards and open slots stay together."],
    ["Quick Duel", "A direct Play Now action reduces setup before a match."],
    [
      "Bottom Navigation",
      "Six destinations are reduced to five: Arena, Snac, Compete, Quests and More, reducing clutter.",
    ],
  ]
  const safeArenaIndex = activeArena < arenaNotes.length ? activeArena : 0
  const decisions = [
    [
      "A",
      "Daily challenges",
      "Make progress impossible to miss.",
      "Progress indicators, rewards and remaining slots are treated as one readable challenge system.",
    ],
    [
      "B",
      "Live events",
      "Give important moments a stage.",
      "Survival Saturday uses live status, date and timing to make a time-sensitive event easier to recognise.",
    ],
    [
      "C",
      "Quick duel",
      "From opening the Arena to starting a game.",
      "Play Now creates a shorter route into a duel without requiring a mode decision first.",
    ],
    [
      "D",
      "Bottom navigation",
      "Six choices become five clearer destinations.",
      "Arena, Snac, Compete, Quests and More form the simplified bottom navigation. The game modes above remain existing product content and are not presented as a redesign contribution.",
    ],
  ]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  useEffect(() => {
    if (activeChange >= matiksChanges.length) setActiveChange(0)
    if (activeArena >= arenaNotes.length) setActiveArena(0)
  }, [activeChange, activeArena, arenaNotes.length])

  const moveHero = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    hero.current?.style.setProperty(
      "--mx",
      String((event.clientX - rect.left) / rect.width - 0.5),
    )
    hero.current?.style.setProperty(
      "--my",
      String((event.clientY - rect.top) / rect.height - 0.5),
    )
  }

  return (
    <div className="matiks-case case-enter">
      <header className="matiks-nav">
        <button onClick={onBack}>← Back to work</button>
        <span>MATIKS / 001</span>
        <b>YKS</b>
      </header>
      <main>
        <section
          className="matiks-hero"
          onMouseMove={moveHero}
          onMouseLeave={() => {
            hero.current?.style.setProperty("--mx", "0")
            hero.current?.style.setProperty("--my", "0")
          }}
        >
          <div className="matiks-hero-grid" />
          <div className="matiks-hero-copy">
            <p className="matiks-kicker">MATIKS / 001</p>
            <span className="matiks-label">
              UI/UX CONCEPT · ARENA IMPROVEMENTS
            </span>
            <p className="matiks-headline" role="heading" aria-level={1}>
              Same games.
              <br />
              <em>More moments</em>
              <br />
              to play.
            </p>
          </div>
          <div ref={hero} className="matiks-hero-screen">
            <MatiksEvidence
              screen="redesigned"
              label="Redesigned Matiks Arena screen"
            />
            <span className="hero-callout callout-live">
              01 · LIVE EVENTS
              <i />
            </span>
            <span className="hero-callout callout-duel">
              02 · QUICK DUEL
              <i />
            </span>
          </div>
          <div className="matiks-meta">
            <span>Role / UI/UX Designer</span>
            <span>Type / Independent concept</span>
            <span>Focus / Hierarchy · Discovery · Play</span>
            <span>2025</span>
          </div>
          <span className="matiks-scroll">
            Scroll to enter the Arena <i />
          </span>
        </section>

        <section className="matiks-problem">
          <div className="matiks-page">
            <p className="matiks-kicker">01 / The problem</p>
            <p className="matiks-section-title" role="heading" aria-level={2}>
              The Arena had the right ingredients.
              <br />
              <em>The experience needed better hierarchy.</em>
            </p>
            <div className="problem-stage">
              <MatiksEvidence
                screen="original"
                label="Original Matiks Arena before the redesign"
              />
              <div className="problem-notes">
                {matiksChanges.map((change, index) => (
                  <article key={change.title} data-reveal>
                    <span>0{index + 1}</span>
                    <i />
                    <p>{change.problem}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="matiks-opportunity" data-reveal>
          <div className="matiks-page">
            <p className="matiks-kicker">02 / Design opportunity</p>
            <p className="opportunity-statement">
              Less friction.
              <br />
              <em>Clearer priorities.</em>
              <br />
              Faster play.
            </p>
            <div className="principle-line">
              {[
                "Reduce visual noise.",
                "Strengthen key moments.",
                "Make playing faster.",
                "Simplify navigation.",
              ].map((principle, index) => (
                <div key={principle}>
                  <span>0{index + 1}</span>
                  <i />
                  <p>{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="matiks-comparison">
          <div className="matiks-page">
            <div className="matiks-section-head">
              <div>
                <p className="matiks-kicker">03 / Before → After</p>
                <p
                  className="matiks-section-title"
                  role="heading"
                  aria-level={2}
                >
                  Reordering the path to play.
                </p>
              </div>
              <p>
                The original and redesigned screens remain unaltered. Select a
                hotspot to follow the reasoning behind each change.
              </p>
            </div>
            <div className="comparison-screens">
              <div>
                <span>Before / Original Arena</span>
                <MatiksEvidence
                  screen="original"
                  label="Original Matiks Arena screen"
                />
              </div>
              <div>
                <span>After / Redesigned Arena</span>
                <MatiksEvidence
                  screen="redesigned"
                  label="Redesigned Matiks Arena screen"
                />
              </div>
            </div>
            <div className="change-explorer">
              <div
                className="change-tabs"
                role="tablist"
                aria-label="Arena design changes"
              >
                {matiksChanges.map((change, index) => (
                  <button
                    key={change.title}
                    role="tab"
                    aria-selected={activeChange === index}
                    onClick={() => setActiveChange(index)}
                  >
                    <span>0{index + 1}</span>
                    {change.title}
                  </button>
                ))}
              </div>
              <div className="change-detail" role="tabpanel">
                <span>Original problem</span>
                <p>{selectedChange.problem}</p>
                <span>Design decision</span>
                <p>{selectedChange.decision}</p>
                <span>Intended user benefit</span>
                <p>{selectedChange.benefit}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="matiks-final-ui">
          <div className="matiks-page">
            <div className="matiks-section-head">
              <div>
                <p className="matiks-kicker">04 / Final UI</p>
                <p
                  className="matiks-section-title"
                  role="heading"
                  aria-level={2}
                >
                  The Arena, framed as a faster path to play.
                </p>
              </div>
              <p>
                Both supplied final states are shown inside device frames at
                their original proportions and with their original interface
                assets.
              </p>
            </div>
            <div className="matiks-final-stage">
              <MatiksFinalPhone variant="daily" label="Daily Arena" />
              <MatiksFinalPhone variant="live" label="Arena with live event" />
              <div className="matiks-final-note">
                <span>Final design</span>
                <b>Hierarchy that puts play first.</b>
                <p>
                  Daily progress, quick play and live events receive stronger
                  hierarchy; the bottom navigation moves from six items to five
                  while existing game modes remain unchanged.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="matiks-decisions">
          <div className="matiks-page">
            <p className="matiks-kicker">05 / Design decisions</p>
            {decisions.map(([letter, label, title, copy], index) => (
              <article
                className={`decision-row decision-${index}`}
                key={label}
                data-reveal
              >
                <div className="decision-copy">
                  <span>
                    {letter} / {label}
                  </span>
                  <p role="heading" aria-level={3}>
                    {title}
                  </p>
                  <small>{copy}</small>
                </div>
                <div className="decision-screen">
                  <MatiksFeatureCrop index={index} label={label} />
                  <i>
                    {String(index + 1).padStart(2, "0")} / REDESIGNED ARENA
                    DETAIL
                  </i>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="arena-interactive">
          <div className="matiks-page">
            <div className="matiks-section-head">
              <div>
                <p className="matiks-kicker">06 / Interactive Arena</p>
                <p
                  className="matiks-section-title"
                  role="heading"
                  aria-level={2}
                >
                  Explore the redesigned screen.
                </p>
              </div>
              <p>
                Select an interface area to inspect the role it plays in the
                redesigned hierarchy.
              </p>
            </div>
            <div className="arena-stage">
              <div className="arena-screen-wrap">
                <div
                  className="arena-device-shell"
                  role="img"
                  aria-label="Interactive redesigned Matiks Arena screen"
                >
                  <div className="arena-device-speaker" />
                  <div className="arena-device-canvas" aria-hidden="true">
                    <MatiksArenaLive />
                  </div>
                  {arenaNotes.map(([title], index) => (
                    <button
                      key={title}
                      className={`arena-hotspot hotspot-${index + 1} ${
                        activeArena === index ? "is-active" : ""
                      }`}
                      onMouseEnter={() => setActiveArena(index)}
                      onFocus={() => setActiveArena(index)}
                      onClick={() => setActiveArena(index)}
                      aria-label={`Inspect ${title}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div className="arena-legend">
                <span>Selected feature / 0{safeArenaIndex + 1}</span>
                <p>{arenaNotes[safeArenaIndex][0]}</p>
                <small>{arenaNotes[safeArenaIndex][1]}</small>
                <div>
                  {arenaNotes.map(([title], index) => (
                    <button
                      key={title}
                      className={activeArena === index ? "is-active" : ""}
                      onClick={() => setActiveArena(index)}
                    >
                      0{index + 1} · {title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="matiks-reflection">
          <div className="matiks-page">
            <p className="matiks-kicker">07 / Reflection</p>
            <p className="reflection-title" role="heading" aria-level={2}>
              Designing the path <em>back to play.</em>
            </p>
            <p className="reflection-copy">
              The redesign focuses on hierarchy, discoverability, progress
              visibility and reducing friction in the core gameplay entry point.
              It is presented as an independent design concept without invented
              research findings, testing results or performance claims.
            </p>
            <div className="reflection-principles">
              {[
                "Clarity over clutter.",
                "Action over hesitation.",
                "Engagement through thoughtful design.",
              ].map((item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <button className="matiks-next" onClick={onNext}>
          <span>Next case study</span>
          <b>GPay</b>
          <i>→</i>
        </button>
      </main>
    </div>
  )
}

type TummyScreen = {
  id: string
  label: string
  stage: "TummyTales"
  component: ComponentType
  width: number
  height: number
  crop?: string
}

const tummyScreens: TummyScreen[] = [
  {
    id: "website",
    label: "Marketing website",
    stage: "TummyTales",
    component: MarketingHome,
    width: 1530,
    height: 8510,
    crop: "website",
  },
  {
    id: "services",
    label: "Services ecosystem",
    stage: "TummyTales",
    component: ServicesPage,
    width: 1530,
    height: 7280,
    crop: "services",
  },
  {
    id: "calendar",
    label: "Daily calendar",
    stage: "TummyTales",
    component: CalendarDashboard,
    width: 1600,
    height: 1200,
  },
  {
    id: "dashboard",
    label: "Activity dashboard",
    stage: "TummyTales",
    component: AnalyticsDashboard,
    width: 1600,
    height: 1200,
  },
  {
    id: "ask",
    label: "Ask Mama",
    stage: "TummyTales",
    component: AskAssistant,
    width: 1683,
    height: 1113,
  },
  {
    id: "tracking",
    label: "Baby Kick Counter",
    stage: "TummyTales",
    component: KickCounter,
    width: 1641,
    height: 1931,
  },
  {
    id: "marketplace",
    label: "Marketplace",
    stage: "TummyTales",
    component: Marketplace,
    width: 1641,
    height: 1582,
  },
  {
    id: "signup",
    label: "Sign-up",
    stage: "TummyTales",
    component: SignUpScreen,
    width: 1728,
    height: 1878,
  },
  {
    id: "login",
    label: "Login",
    stage: "TummyTales",
    component: LoginScreen,
    width: 1728,
    height: 1878,
  },
  {
    id: "community",
    label: "Mom-to-Mom community",
    stage: "Community",
    component: ServicesPage,
    width: 1530,
    height: 7280,
    crop: "community",
  },
]

function TummyScreenPreview({
  screen,
  className = "",
}: {
  screen: TummyScreen
  className?: string
}) {
  const Screen = screen.component
  return (
    <div
      className={`tt-screen-preview tt-screen-${screen.id} tt-crop-${screen.crop || "app"} ${className}`}
      role="img"
      aria-label={`${screen.label} interface for ${screen.stage}`}
    >
      <div className="tt-mockup-chrome" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{screen.label}</span>
        <b>•••</b>
      </div>
      <div
        className="tt-source-canvas"
        aria-hidden="true"
        style={
          {
            "--source-width": `${screen.width}px`,
            "--source-height": `${screen.height}px`,
          } as CSSProperties
        }
      >
        <Screen />
      </div>
      <span className="tt-screen-stage">{screen.stage}</span>
    </div>
  )
}

const tummyPillars = [
  {
    id: "understand",
    letter: "A",
    title: "Understand",
    description:
      "Daily planning, pregnancy-related tracking and visible activity patterns create a practical home for the everyday journey.",
    screen: "dashboard",
  },
  {
    id: "ask",
    letter: "B",
    title: "Ask",
    description:
      "Ask Mama and focused agents help users navigate questions and find relevant resources without replacing professional care.",
    screen: "ask",
  },
  {
    id: "connect",
    letter: "C",
    title: "Connect",
    description:
      "Mom-to-Mom was framed as a peer space for connection and shared experience within the wider support ecosystem.",
    screen: "community",
  },
  {
    id: "discover",
    letter: "D",
    title: "Discover",
    description:
      "Services, useful resources, baby products and contact information extend support beyond tracking and conversation.",
    screen: "marketplace",
  },
]

function TummyTalesCaseStudy({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: () => void
}) {
  const [activePillar, setActivePillar] = useState(0)
  const [dashboardView, setDashboardView] = useState<"calendar" | "dashboard">(
    "calendar",
  )
  const [dashboardNote, setDashboardNote] = useState(0)
  const [activeScreen, setActiveScreen] = useState("dashboard")
  const [expanded, setExpanded] = useState(false)

  const selectedScreen =
    tummyScreens.find((screen) => screen.id === activeScreen) || tummyScreens[0]
  const pillarScreen =
    tummyScreens.find(
      (screen) => screen.id === tummyPillars[activePillar].screen,
    ) || tummyScreens[0]
  const activeDashboard =
    tummyScreens.find((screen) => screen.id === dashboardView) ||
    tummyScreens[2]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setExpanded(false)
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])

  return (
    <div className="tt-case case-enter">
      <header className="case-nav tt-nav">
        <button onClick={onBack} className="case-back">
          ← Back to work
        </button>
        <span>TummyTales / Freelance FemTech</span>
        <b>YKS</b>
      </header>
      <main>
        <section className="tt-hero">
          <div className="page-shell tt-hero-grid">
            <div className="tt-hero-copy">
              <p className="tt-kicker">
                FemTech · Freelance project · Website & product design
              </p>
              <p className="tt-wordmark" role="heading" aria-level={1}>
                TUMMY
                <br />
                TALES
              </p>
              <p className="tt-hero-line">
                Pregnancy is a journey.
                <br />
                <em>Support should be, too.</em>
              </p>
              <p className="tt-hero-description">
                TummyTales was a FemTech product concept focused on bringing
                pregnancy-related resources, tracking, guided assistance and
                community support into one connected experience.
              </p>
            </div>
            <div className="tt-hero-collage">
              <TummyScreenPreview
                screen={tummyScreens[2]}
                className="tt-collage-main"
              />
              <TummyScreenPreview
                screen={tummyScreens[0]}
                className="tt-collage-site"
              />
              <TummyScreenPreview
                screen={tummyScreens[4]}
                className="tt-collage-agent"
              />
              <span className="tt-float-label tt-label-one">
                01 / Daily dashboard
              </span>
              <span className="tt-float-label tt-label-two">
                02 / Ask Mama support
              </span>
              <span className="tt-float-label tt-label-three">
                03 / Connected ecosystem
              </span>
            </div>
          </div>
          <div className="page-shell tt-meta">
            <div>
              <span>Role</span>
              <b>UI/UX and website design</b>
            </div>
            <div>
              <span>Engagement</span>
              <b>Freelance</b>
            </div>
            <div>
              <span>Market</span>
              <b>United States</b>
            </div>
            <div>
              <span>Product stage</span>
              <b>TummyTales</b>
            </div>
          </div>
        </section>

        <section className="tt-overview page-shell" data-reveal>
          <p className="tt-kicker">01 / Project overview</p>
          <div className="tt-overview-head">
            <p className="tt-display">
              More than
              <br />
              <em>a dashboard.</em>
            </p>
            <p>
              The engagement spanned a public-facing website and a broad product
              ecosystem: daily activities, pregnancy-related tracking,
              conversational assistance, peer connection, practical resources
              and supporting account experiences.
            </p>
          </div>
          <div className="tt-scope-list">
            {[
              "Marketing website",
              "Dashboard & daily activities",
              "Baby Kick Counter",
              "Ask Mama & focused agents",
              "Mom-to-Mom community",
              "Marketplace & resources",
              "Doctor contact information",
              "Login & supporting pages",
            ].map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{item}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="tt-ecosystem">
          <div className="page-shell">
            <p className="tt-kicker">02 / The product ecosystem</p>
            <p className="tt-section-title">
              One platform.
              <br />
              <em>Multiple forms of support.</em>
            </p>
            <div className="tt-ecosystem-layout">
              <div
                className="tt-pillar-list"
                role="tablist"
                aria-label="TummyTales ecosystem pillars"
              >
                {tummyPillars.map((pillar, index) => (
                  <button
                    key={pillar.id}
                    role="tab"
                    aria-selected={activePillar === index}
                    onClick={() => setActivePillar(index)}
                    onMouseEnter={() => setActivePillar(index)}
                  >
                    <span>{pillar.letter}</span>
                    <b>{pillar.title}</b>
                    <i>↗</i>
                  </button>
                ))}
              </div>
              <div className="tt-pillar-detail">
                <TummyScreenPreview screen={pillarScreen} />
                <div>
                  <span>
                    {tummyPillars[activePillar].letter} /{" "}
                    {tummyPillars[activePillar].title}
                  </span>
                  <p>{tummyPillars[activePillar].description}</p>
                </div>
              </div>
            </div>
            <p className="tt-evidence-note">
              The sections describe the intended product structure shown in the
              supplied designs; they do not claim that every feature was fully
              integrated in production.
            </p>
          </div>
        </section>

        <section className="tt-dashboard page-shell" data-reveal>
          <p className="tt-kicker">03 / The dashboard</p>
          <div className="tt-section-split">
            <p className="tt-section-title">
              A daily space for
              <br />
              <em>everything that matters.</em>
            </p>
            <p>
              The dashboard brought together meetings, activities and to-do
              tasks in a central place, with a second analytical view for
              tracking activity over time.
            </p>
          </div>
          <div className="tt-dashboard-tabs">
            <button
              className={dashboardView === "calendar" ? "is-active" : ""}
              onClick={() => setDashboardView("calendar")}
            >
              Calendar view
            </button>
            <button
              className={dashboardView === "dashboard" ? "is-active" : ""}
              onClick={() => setDashboardView("dashboard")}
            >
              Activity overview
            </button>
          </div>
          <div className="tt-dashboard-stage">
            <TummyScreenPreview screen={activeDashboard} />
          </div>
          <div
            className="tt-hotspots"
            role="tablist"
            aria-label="Dashboard design details"
          >
            {[
              "Daily planning",
              "Connected activities",
              "Time-based overview",
            ].map((label, index) => (
              <button
                key={label}
                role="tab"
                aria-selected={dashboardNote === index}
                className={dashboardNote === index ? "is-active" : ""}
                onClick={() => setDashboardNote(index)}
              >
                <span>0{index + 1}</span>
                {label}
              </button>
            ))}
          </div>
          <div className="tt-hotspot-copy" role="tabpanel">
            {[
              [
                "Daily planning",
                "Meetings, appointments and personal activities are visible in one time-based workspace.",
              ],
              [
                "Connected activities",
                "The navigation keeps adjacent areas,body, meals, preparation and messages,within reach.",
              ],
              [
                "Time-based overview",
                "Day, week, month and pregnancy-stage controls support different levels of planning.",
              ],
            ].map(
              ([title, copy], index) =>
                dashboardNote === index && (
                  <div key={title}>
                    <span>Selected detail / 0{index + 1}</span>
                    <b>{title}</b>
                    <p>{copy}</p>
                  </div>
                ),
            )}
          </div>
        </section>

        <section className="tt-kick">
          <div className="page-shell">
            <p className="tt-kicker">04 / Baby Kick Counter</p>
            <div className="tt-section-split">
              <p className="tt-section-title">
                Small moments.
                <br />
                <em>Meaningful tracking.</em>
              </p>
              <p>
                The feature was designed to let users record and review
                baby-kick activity through a clear current session, history and
                frequency view.
              </p>
            </div>
            <div className="tt-feature-stage">
              <TummyScreenPreview screen={tummyScreens[5]} />
            </div>
            <div className="tt-flow-line">
              {[
                "Start a session",
                "Log a kick",
                "Review progress",
                "See recent history",
              ].map((item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <b>{item}</b>
                </div>
              ))}
            </div>
            <p className="tt-medical-note">
              This presentation describes interface intent only.
              Pregnancy-related concerns should be discussed with a qualified
              healthcare professional.
            </p>
          </div>
        </section>

        <section className="tt-ask page-shell" data-reveal>
          <p className="tt-kicker">05 / Ask Mama</p>
          <p className="tt-section-title">
            A place to start
            <br />
            <em>when questions arise.</em>
          </p>
          <div className="tt-ask-layout">
            <div className="tt-ask-copy">
              <span>TummyTales / Ask Mama</span>
              <p>
                Ask Mama is presented as part of the TummyTales support
                ecosystem, using the same calm olive, ivory and soft-neutral
                visual language as the dashboard and tracking tools.
              </p>
              <p>
                The intended role was to help users navigate pregnancy-related
                questions and discover relevant resources without diagnosing
                conditions or replacing a doctor.
              </p>
            </div>
            <TummyScreenPreview screen={tummyScreens[4]} />
          </div>
        </section>

        <section className="tt-agents">
          <div className="page-shell">
            <p className="tt-kicker">06 / Focused support</p>
            <p className="tt-section-title">
              Different needs.
              <br />
              <em>More focused support.</em>
            </p>
            <div className="tt-agent-list">
              {[
                [
                  "Nutrition",
                  "Food-related guidance and tracking were represented as a distinct support area.",
                ],
                [
                  "Physical activity",
                  "Movement-related support was separated into its own focused experience.",
                ],
                [
                  "Mental health",
                  "The supplied navigation documents mental-health support as part of the broader agent system.",
                ],
                [
                  "Journal",
                  "A reflective space supported notes, media and personal moments.",
                ],
                [
                  "Shopping",
                  "A marketplace experience connected useful products with the wider journey.",
                ],
              ].map(([title, copy], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <b>{title}</b>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tt-community page-shell" data-reveal>
          <p className="tt-kicker">07 / Mom-to-Mom community</p>
          <div className="tt-section-split">
            <p className="tt-section-title">
              Sometimes, support comes from someone who <em>understands.</em>
            </p>
            <p>
              The Mom-to-Mom concept was positioned as a social layer where
              mothers and other people on the platform could connect and
              interact. No testimonials or outcome claims are inferred from the
              design.
            </p>
          </div>
          <div className="tt-community-stage">
            <TummyScreenPreview
              screen={
                tummyScreens.find((screen) => screen.id === "community") ||
                tummyScreens[1]
              }
            />
          </div>
        </section>

        <section className="tt-marketplace">
          <div className="page-shell">
            <p className="tt-kicker">08 / Marketplace</p>
            <div className="tt-section-split">
              <p className="tt-section-title">
                Useful products,
                <br />
                <em>within reach.</em>
              </p>
              <p>
                The supplied marketplace explores curated essentials, product
                categories and saved items. Product content is shown as designed
                and not presented as live inventory or checkout functionality.
              </p>
            </div>
            <div className="tt-feature-stage">
              <TummyScreenPreview screen={tummyScreens[6]} />
            </div>
          </div>
        </section>

        <section className="tt-website page-shell" data-reveal>
          <p className="tt-kicker">09 / Website design</p>
          <p className="tt-section-title">
            A public face for
            <br />
            <em>a wider product story.</em>
          </p>
          <div className="tt-web-grid">
            <div>
              <TummyScreenPreview screen={tummyScreens[0]} />
              <span>Homepage / TummyTales</span>
            </div>
            <div>
              <TummyScreenPreview screen={tummyScreens[1]} />
              <span>Services / TummyTales</span>
            </div>
          </div>
          <div className="tt-auth-row">
            <div>
              <TummyScreenPreview screen={tummyScreens[7]} />
              <span>Sign-up</span>
            </div>
            <div>
              <TummyScreenPreview screen={tummyScreens[8]} />
              <span>Login</span>
            </div>
          </div>
        </section>

        <section className="tt-process">
          <div className="page-shell">
            <p className="tt-kicker">10 / Design decisions</p>
            <p className="tt-section-title">
              From individual features to
              <br />
              <em>a connected experience.</em>
            </p>
            <div className="tt-process-grid">
              <article>
                <span>01</span>
                <b>Separate by intention</b>
                <p>
                  Planning, tracking, asking, connecting and discovering each
                  receive a recognisable product space.
                </p>
              </article>
              <article>
                <span>02</span>
                <b>Connect through structure</b>
                <p>
                  Shared navigation and restrained visual patterns make the
                  ecosystem feel related without flattening every feature.
                </p>
              </article>
              <article>
                <span>03</span>
                <b>Keep sensitive moments clear</b>
                <p>
                  Legible actions, visible context and medical disclaimers
                  support trust without making unverified care claims.
                </p>
              </article>
            </div>
            <p className="tt-evidence-note">
              No research interviews, testing results, performance metrics or
              validated outcomes were supplied, so none are claimed here.
            </p>
          </div>
        </section>

        <section className="tt-gallery page-shell" data-reveal>
          <p className="tt-kicker">11 / Interactive screen gallery</p>
          <div className="tt-gallery-head">
            <p className="tt-section-title">
              Explore the
              <br />
              <em>actual interfaces.</em>
            </p>
            <p>
              Select a feature group to inspect the supplied design at a larger
              scale.
            </p>
          </div>
          <div
            className="tt-gallery-tabs"
            role="tablist"
            aria-label="TummyTales screens"
          >
            {tummyScreens.map((screen) => (
              <button
                key={screen.id}
                role="tab"
                aria-selected={screen.id === activeScreen}
                onClick={() => setActiveScreen(screen.id)}
              >
                {screen.label}
              </button>
            ))}
          </div>
          <button
            className="tt-gallery-stage"
            onClick={() => setExpanded(true)}
            aria-label={`Expand ${selectedScreen.label}`}
          >
            <TummyScreenPreview screen={selectedScreen} />
            <span>Open full preview ↗</span>
          </button>
        </section>

        <section className="tt-reflection">
          <div className="page-shell">
            <p className="tt-kicker">12 / Reflection</p>
            <p className="tt-reflection-title">
              Designing for a journey,
              <br />
              <em>not just a moment.</em>
            </p>
            <div className="tt-reflection-copy">
              <p>
                The project explored how daily activities, pregnancy-related
                tracking, guided assistance, peer connection and useful
                resources could belong to one digital ecosystem.
              </p>
              <p>
                The central design challenge was maintaining clarity across that
                breadth,helping every feature feel purposeful while preserving
                warmth and trust.
              </p>
            </div>
          </div>
        </section>

        <button className="next-project tt-next" onClick={onNext}>
          <span>Next case study</span>
          <b>Rootree</b>
          <i>→</i>
        </button>
      </main>
      {expanded && (
        <div
          className="tt-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded ${selectedScreen.label}`}
        >
          <button onClick={() => setExpanded(false)}>Close ×</button>
          <div className="tt-full-preview-scroll">
            <div
              className="tt-full-preview-canvas"
              style={{
                width: selectedScreen.width,
                minHeight: selectedScreen.height,
              }}
            >
              {(() => {
                const ExpandedScreen = selectedScreen.component
                return <ExpandedScreen />
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const gpayGoals = [
  [
    "01",
    "Reduce manual effort",
    "Let people add useful transaction context without interrupting a fast payment.",
  ],
  [
    "02",
    "Keep notes optional",
    "Quick-note suggestions support common intents while remaining easy to ignore.",
  ],
  [
    "03",
    "Improve spending awareness",
    "Surface received, spent and notable monthly patterns directly on the home screen.",
  ],
  [
    "04",
    "Preserve familiarity",
    "Fit both additions into recognisable Google Pay patterns instead of rebuilding the product.",
  ],
]

const dashboardDecisions = [
  [
    "Monthly snapshot",
    "A compact “This Month” card keeps financial awareness inside the existing home experience.",
  ],
  [
    "Received and spent",
    "Two clear values provide an immediate overview without becoming a full budgeting dashboard.",
  ],
  [
    "Top spend",
    "The highest spending category makes one useful pattern visible at a glance.",
  ],
  [
    "Most paid contact",
    "A familiar person-based insight connects financial information to existing payment behavior.",
  ],
  [
    "Plain-language insight",
    "A short summary translates activity into something understandable rather than adding another chart.",
  ],
  [
    "Optional depth",
    "View details offers a route to deeper financial insights without crowding the home screen.",
  ],
]

type GPayScreenType = "home" | "payment" | "keyboard"

function GPayRealScreen({
  screen,
  className = "",
  label,
}: {
  screen: GPayScreenType
  className?: string
  label: string
}) {
  const Screen =
    screen === "home"
      ? GPayHome
      : screen === "keyboard"
        ? GPayPaymentKeyboard
        : GPayPayment
  const sourceHeight = screen === "home" ? 2708 : 852
  return (
    <div
      className={`gpay-real-phone gpay-real-${screen} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="gpay-real-speaker" />
      <div
        className="gpay-real-canvas"
        aria-hidden="true"
        style={{ "--gpay-source-height": `${sourceHeight}px` } as CSSProperties}
      >
        <Screen />
      </div>
      <div className="gpay-status-cover" aria-hidden="true" />
    </div>
  )
}

function GPayExperience({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="gpay-case case-enter">
      <header className="case-nav gpay-case-nav">
        <button onClick={onBack} className="case-back">
          ← Back to work
        </button>
        <span>Independent UX exploration / 04</span>
        <b>YKS</b>
      </header>
      <main>
        <section className="gpay-case-hero">
          <div className="page-shell gpay-hero-grid">
            <div className="gpay-hero-copy">
              <div className="gpay-case-mark">
                <i />
                <i />
                <i />
                <i />
              </div>
              <p className="case-breadcrumb">
                Independent UX design exploration · Fintech · Mobile app
              </p>
              <p className="gpay-case-title" role="heading" aria-level={1}>
                Rethinking
                <br />
                <em>everyday</em>
                <br />
                payments.
              </p>
              <p className="gpay-case-deck">
                Exploring how quick transaction notes and lightweight financial
                insights could add useful context without compromising Google
                Pay’s familiar speed.
              </p>
            </div>
            <div className="gpay-hero-visual gpay-real-hero">
              <GPayRealScreen
                screen="home"
                label="Google Pay home screen with monthly financial snapshot"
                className="gpay-hero-home"
              />
              <GPayRealScreen
                screen="keyboard"
                label="Google Pay payment screen with quick notes and numeric keyboard"
                className="gpay-hero-payment"
              />
            </div>
          </div>
          <div className="page-shell gpay-case-facts">
            <div>
              <span>Project focus</span>
              <b>Financial visibility & payment efficiency</b>
            </div>
            <div>
              <span>My role</span>
              <b>UI/UX · Interface · Interaction design</b>
            </div>
            <div>
              <span>Platform / Tool</span>
              <b>Mobile application · Figma</b>
            </div>
          </div>
        </section>

        <section className="gpay-intro page-shell" data-reveal>
          <p className="case-section-label">01 / Overview</p>
          <div className="gpay-intro-grid">
            <p className="gpay-display-copy">
              A familiar payment app, explored through two lightweight
              additions.
            </p>
            <div>
              <p>
                Google Pay already supports fast and reliable everyday payments.
                The supplied case study identifies two gaps: transaction notes
                are often skipped because typing interrupts the flow, and users
                have limited visibility into monthly spending patterns.
              </p>
              <p>
                The response keeps both additions intentionally lightweight:
                one-tap notes during payment and an optional financial snapshot
                on the home screen.
              </p>
            </div>
          </div>
        </section>

        <section className="gpay-opportunity">
          <div className="page-shell">
            <p className="case-section-label">02 / The opportunity</p>
            <p className="gpay-section-title">
              Remembering why.
              <br />
              Understanding where.
            </p>
            <div className="gpay-question-grid">
              <article>
                <span>01</span>
                <b>Quick transaction notes</b>
                <p>
                  How might people add meaningful context without typing or
                  slowing down the payment flow?
                </p>
              </article>
              <article>
                <span>02</span>
                <b>Financial insights</b>
                <p>
                  How might we improve spending awareness without turning Google
                  Pay into a budgeting app?
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="gpay-goals page-shell" data-reveal>
          <p className="case-section-label">03 / Design goals</p>
          <div className="gpay-goal-list">
            {gpayGoals.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <b>{title}</b>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gpay-exploration gpay-exploration-blue">
          <div className="page-shell">
            <p className="case-section-label">04 / Exploration one</p>
            <p className="gpay-section-title">
              Financial awareness,
              <br />
              inside the familiar home.
            </p>
            <div className="gpay-real-demo gpay-home-demo">
              <div className="gpay-real-demo-copy">
                <span>Financial Insights</span>
                <p>A monthly snapshot without a separate budgeting workflow.</p>
                <small>
                  Received, spent, top category, most-paid contact and one
                  plain-language insight are grouped into a compact card with
                  optional deeper detail.
                </small>
              </div>
              <GPayRealScreen
                screen="home"
                label="Google Pay home screen showing monthly insights"
              />
            </div>
            <div className="gpay-decisions">
              {dashboardDecisions.map(([title, copy], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <b>{title}</b>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gpay-exploration gpay-exploration-green">
          <div className="page-shell">
            <p className="case-section-label">05 / Exploration two</p>
            <p className="gpay-section-title">
              Useful context,
              <br />
              without stopping to type.
            </p>
            <div className="gpay-real-payment-demo">
              <div className="gpay-real-demo-copy">
                <span>Quick Transaction Notes</span>
                <p>One tap adds meaning to a payment.</p>
                <small>
                  Shopping, Food Delivery, Pay Friends, Bills and Petrol provide
                  common note options while preserving the existing amount and
                  payment flow.
                </small>
              </div>
              <GPayRealScreen
                screen="payment"
                label="Google Pay payment screen with selected quick note"
              />
              <GPayRealScreen
                screen="keyboard"
                label="Google Pay payment screen with quick notes and keyboard visible"
              />
            </div>
            <div className="gpay-sequence-list">
              {[
                "Select a recipient",
                "Enter an amount",
                "Choose an optional quick note",
                "Pay with context attached",
              ].map((item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <b>{item}</b>
                  {index < 3 && <i>→</i>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gpay-visual-system page-shell" data-reveal>
          <p className="case-section-label">06 / Visual design approach</p>
          <div className="gpay-system-grid">
            <p className="gpay-display-copy">
              Clean, familiar and structured for quick understanding.
            </p>
            <div className="gpay-principles">
              {[
                [
                  "Hierarchy",
                  "Important information receives greater prominence while secondary details remain quieter.",
                ],
                [
                  "Structure",
                  "Cards, spacing and alignment separate financial summaries from transaction actions.",
                ],
                [
                  "Purposeful colour",
                  "Colour distinguishes information and guides attention without overwhelming the screen.",
                ],
                [
                  "Consistency",
                  "Buttons, fields, labels and cards share one coherent visual logic.",
                ],
              ].map(([title, copy], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div>
                    <b>{title}</b>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="gpay-palette" aria-label="Interface color palette">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </section>

        <section className="gpay-together">
          <div className="page-shell">
            <p className="case-section-label">07 / Bringing it together</p>
            <p className="gpay-statement">
              Understand the money.
              <br />
              <em>Then act with confidence.</em>
            </p>
            <div className="gpay-together-copy">
              <p>
                The home snapshot supports financial awareness. Quick notes
                preserve useful transaction context.
              </p>
              <p>
                Together, they add understanding before and after payment
                without turning a fast UPI experience into a budgeting workflow.
              </p>
            </div>
          </div>
        </section>

        <section className="gpay-reflection page-shell" data-reveal>
          <p className="case-section-label">08 / Reflection</p>
          <div className="gpay-reflection-grid">
            <p className="gpay-display-copy">
              A useful payment experience should do more than move money.
            </p>
            <div>
              <p>
                This project reinforced how small changes in information
                architecture, visual hierarchy and interaction flow can
                influence a familiar product experience.
              </p>
              <p>
                Adding information is useful only when it remains understandable
                and actionable. The next step would be to test these concepts
                with target users and iterate from observed behaviour.
              </p>
            </div>
          </div>
          <p className="gpay-takeaway">
            It should help people understand what they are doing{" "}
            <em>at every step.</em>
          </p>
          <div className="gpay-disclaimer">
            <b>Project disclaimer</b>
            <p>
              This is an independent UI/UX design exploration of Google Pay. It
              is not an official Google project and is not affiliated with or
              endorsed by Google. The proposed screens represent design
              concepts, not validated product changes or measured outcomes.
            </p>
          </div>
        </section>

        <button className="next-project" onClick={onNext}>
          <span>Next case study</span>
          <b>BiteBuzz</b>
          <i>→</i>
        </button>
      </main>
    </div>
  )
}

const rootreeScreens = [
  { src: "/rootree/screen-05.png", label: "Rootree AI homepage", number: "01" },
  {
    src: "/rootree/screen-02.png",
    label: "Platform & solutions",
    number: "02",
  },
  { src: "/rootree/screen-03.png", label: "What we offer", number: "03" },
  { src: "/rootree/screen-04.png", label: "Partnerships", number: "04" },
  { src: "/rootree/screen-06.png", label: "Blog & insights", number: "05" },
  { src: "/rootree/screen-01.png", label: "Contact & enquiry", number: "06" },
]

function RootreeScreen({
  screen,
  onOpen,
  className = "",
}: {
  screen: typeof rootreeScreens[number]
  onOpen: () => void
  className?: string
}) {
  return (
    <button
      className={`rt-browser ${className}`}
      onClick={onOpen}
      aria-label={`Open ${screen.label} mockup`}
      data-cursor="OPEN"
    >
      <span className="rt-browser-bar">
        <i />
        <i />
        <i />
        <b>rootree.ai</b>
      </span>
      <span className="rt-screen-viewport">
        <img src={screen.src} alt={`${screen.label} interface design`} />
      </span>
    </button>
  )
}

function RootreeCaseStudy({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: () => void
}) {
  const [activeScreen, setActiveScreen] =
    useState<typeof rootreeScreens[number] | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setActiveScreen(null)
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])

  return (
    <div className="rootree-case case-enter">
      <header className="case-nav rt-nav">
        <button onClick={onBack} className="case-back">
          ← Back to work
        </button>
        <span>Case study / 03</span>
        <b>YKS</b>
      </header>
      <main>
        <section className="rt-hero">
          <div className="rt-glow rt-glow-one" />
          <div className="rt-glow rt-glow-two" />
          <div className="page-shell rt-hero-inner">
            <div className="rt-kicker">
              <span>Rootree AI</span>
              <i /> SaaS website · Data analytics · 2025
            </div>
            <p className="rt-title" role="heading" aria-level={1}>
              Give life
              <br />
              to <em>your data.</em>
            </p>
            <div className="rt-hero-copy">
              <p>
                A multi-page digital experience that brings Rootree’s analytics
                platform, enterprise products and professional services into one
                coherent story.
              </p>
              <div>
                <span>Role</span>
                <b>UI/UX Designer</b>
                <span>Scope</span>
                <b>Website UX · UI system · Responsive design</b>
              </div>
            </div>
            <RootreeScreen
              screen={rootreeScreens[0]}
              onOpen={() => setActiveScreen(rootreeScreens[0])}
              className="rt-hero-browser"
            />
          </div>
        </section>

        <section className="rt-intro page-shell" data-reveal>
          <p className="rt-section-index">01 / The brief</p>
          <div className="rt-intro-grid">
            <p className="rt-display">
              Connect a broad analytics business through{" "}
              <em>one clear experience.</em>
            </p>
            <div className="rt-body-copy">
              <p>
                Rootree’s offer spans AI analytics, enterprise dashboards,
                rewards, customer insights, data management, governance,
                implementation and cybersecurity. The website needed to make
                those connected capabilities understandable.
              </p>
              <p>
                The response was a modular website system with dedicated
                product, service, partnership, editorial and contact
                journeys,held together by consistent navigation, product proof
                and enquiry patterns.
              </p>
            </div>
          </div>
          <div className="rt-brief-cards">
            <article>
              <span>Challenge</span>
              <b>
                Many offers.
                <br />
                One Rootree story.
              </b>
            </article>
            <article>
              <span>Audience</span>
              <b>
                Business leaders,
                <br />
                partners and data teams.
              </b>
            </article>
            <article>
              <span>Goal</span>
              <b>
                Explain value and
                <br />
                create paths to enquiry.
              </b>
            </article>
          </div>
        </section>

        <section className="rt-problem">
          <div className="page-shell">
            <p className="rt-section-index">02 / Design opportunity</p>
            <p className="rt-statement">
              The website had to sell a platform,
              <br />
              <em>without reading like a feature list.</em>
            </p>
            <div className="rt-opportunity-grid">
              {[
                [
                  "01",
                  "Show the platform",
                  "Pair Rootree’s promise with real dashboard visuals, analytics modules and integration flows.",
                ],
                [
                  "02",
                  "Separate the journeys",
                  "Give products, services, partnerships, insights and enquiries a page with a clear purpose.",
                ],
                [
                  "03",
                  "Keep one identity",
                  "Repeat the same dark visual language, proof patterns and calls to action across the ecosystem.",
                ],
              ].map(([number, title, copy]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <b>{title}</b>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rt-direction page-shell" data-reveal>
          <p className="rt-section-index">03 / Creative direction</p>
          <div className="rt-direction-head">
            <p className="rt-display">
              A visual language for turning <em>signals into stories.</em>
            </p>
            <p>
              Deep black keeps the focus on product imagery. Electric violet
              carries the brand across pages, while chart colors and ambient
              glows make analytical content feel active without weakening
              readability.
            </p>
          </div>
          <div className="rt-system">
            <div className="rt-type-card">
              <span>Typography</span>
              <b>
                Data
                <br />
                with a<br />
                <em>human voice.</em>
              </b>
              <small>Quicksand / Poppins</small>
            </div>
            <div className="rt-color-card">
              <span>Color system</span>
              <div>
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <small>
                Midnight · Signal violet · Orchid · Insight blue · Success green
              </small>
            </div>
          </div>
        </section>

        <section className="rt-showcase">
          <div className="page-shell">
            <div className="rt-showcase-head">
              <div>
                <p className="rt-section-index">04 / The experience</p>
                <p className="rt-display">
                  One system.
                  <br />
                  <em>Six clear journeys.</em>
                </p>
              </div>
              <p>
                The home page introduces Rootree AI; product pages explain
                enterprise dashboards and rewards; service, partnership,
                editorial and contact pages support distinct business goals.
              </p>
            </div>
            <div className="rt-mockup-grid">
              {rootreeScreens.slice(1).map((screen, index) => (
                <article
                  className={index === 2 ? "rt-mockup-wide" : ""}
                  key={screen.src}
                >
                  <div>
                    <span>{screen.number}</span>
                    <b>{screen.label}</b>
                  </div>
                  <RootreeScreen
                    screen={screen}
                    onOpen={() => setActiveScreen(screen)}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rt-decisions page-shell" data-reveal>
          <p className="rt-section-index">05 / Key decisions</p>
          <div className="rt-decisions-grid">
            <p className="rt-display">
              Designed to move from <em>attention to understanding.</em>
            </p>
            <div>
              {[
                [
                  "Lead with the promise",
                  "“Give life to your data” creates a memorable entry point before the page explains how.",
                ],
                [
                  "Show the product early",
                  "The Rootree dashboard supports the AI analytics promise with tangible product evidence.",
                ],
                [
                  "Group the offer",
                  "Platform capabilities, professional services and partnership opportunities have distinct journeys.",
                ],
                [
                  "Repeat with purpose",
                  "Consultation, FAQ, newsletter and contact patterns create familiar conversion points.",
                ],
              ].map(([title, copy], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div>
                    <b>{title}</b>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rt-outcome">
          <div className="rt-glow rt-glow-three" />
          <div className="page-shell">
            <p className="rt-section-index">06 / Outcome & reflection</p>
            <p className="rt-outcome-title">
              A flexible foundation for a product that has <em>more to say.</em>
            </p>
            <div className="rt-outcome-grid">
              <article>
                <span>What it demonstrates</span>
                <p>
                  A connected website system spanning a product landing page,
                  enterprise solutions, services, partnerships, editorial
                  content and contact.
                </p>
              </article>
              <article>
                <span>Key learning</span>
                <p>
                  A broad B2B offer feels more credible when every page has one
                  job and real product imagery supports the message.
                </p>
              </article>
              <article>
                <span>Next step</span>
                <p>
                  Test whether first-time visitors can identify the right
                  Rootree offer and reach consultation or contact without
                  hesitation.
                </p>
              </article>
            </div>
            <div className="rt-reflection">
              The goal was never to make data look futuristic.
              <br />
              <em>It was to make its value feel obvious.</em>
            </div>
          </div>
        </section>

        <button className="next-project rt-next" onClick={onNext}>
          <span>Next case study</span>
          <b>Matiks</b>
          <i>→</i>
        </button>
      </main>

      {activeScreen && (
        <div
          className="rt-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeScreen.label} full-page design`}
        >
          <button
            onClick={() => setActiveScreen(null)}
            aria-label="Close full-page design"
          >
            Close ×
          </button>
          <div>
            <img
              src={activeScreen.src}
              alt={`${activeScreen.label} full-page interface`}
            />
          </div>
        </div>
      )}
    </div>
  )
}

type BiteScreenItem = {
  label: string
  caption: string
  component: ComponentType
}

const biteScreens: BiteScreenItem[] = [
  {
    label: "Location",
    caption: "Choose a delivery address before browsing.",
    component: BiteLocation,
  },
  {
    label: "Home",
    caption: "Lead with cravings, offers and quick category access.",
    component: BiteHome,
  },
  {
    label: "Profile",
    caption: "Keep account and order utilities one tap away.",
    component: BiteProfile,
  },
  {
    label: "Search",
    caption: "Turn an open-ended craving into a focused result.",
    component: BiteSearch,
  },
  {
    label: "Fast food",
    caption: "Scan familiar choices in a compact menu.",
    component: BiteFastFood,
  },
  {
    label: "Desserts",
    caption: "A category view built around visual appetite appeal.",
    component: BiteDesserts,
  },
  {
    label: "Burger detail",
    caption: "Make selection, price and quantity clear together.",
    component: BiteBurgerDetail,
  },
  {
    label: "Pizza detail",
    caption: "Use one repeatable detail pattern across dishes.",
    component: BitePizzaDetail,
  },
  {
    label: "Cart",
    caption: "Review the order without losing the path to checkout.",
    component: BiteCart,
  },
  {
    label: "Order confirmed",
    caption: "Close the journey with a calm, unmistakable state.",
    component: BiteSuccess,
  },
]

function BitePhone({
  screen,
  className = "",
  onOpen,
}: {
  screen: BiteScreenItem
  className?: string
  onOpen?: () => void
}) {
  const Screen = screen.component
  return (
    <div
      className={`bite-phone ${onOpen ? "bite-phone-action" : ""} ${className}`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (onOpen && (event.key === "Enter" || event.key === " ")) onOpen()
      }}
      role={onOpen ? "button" : "img"}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={`${onOpen ? "Open " : ""}${screen.label} screen`}
    >
      <div className="bite-phone-bezel">
        <div className="bite-screen-canvas" aria-hidden="true">
          <Screen />
        </div>
        <span className="bite-status-mask" />
        <span className="bite-dynamic-island" />
      </div>
    </div>
  )
}

function BiteBuzzCaseStudy({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: () => void
}) {
  const [activeScreen, setActiveScreen] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setActiveScreen(null)
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])

  const journey = [0, 1, 3, 4, 6, 8, 9]
  const gallery = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div className="bite-case case-enter">
      <header className="bite-nav">
        <button onClick={onBack}>← Back to work</button>
        <span>BiteBuzz / Mobile ordering</span>
        <b>YKS</b>
      </header>

      <main>
        <section className="bite-hero">
          <div className="bite-hero-copy">
            <p className="bite-kicker">Food delivery · Mobile app · 2023</p>
            <p className="bite-title" role="heading" aria-level={1}>
              Bite<span>Buzz</span>
            </p>
            <p className="bite-deck">
              From craving to confirmed order, with fewer decisions in the way.
            </p>
            <div className="bite-meta">
              <div>
                <span>Role</span>
                <b>UI/UX Designer</b>
              </div>
              <div>
                <span>Duration</span>
                <b>3 weeks</b>
              </div>
              <div>
                <span>Tools</span>
                <b>Figma · Prototyping</b>
              </div>
            </div>
          </div>
          <div className="bite-hero-phones">
            <BitePhone screen={biteScreens[3]} />
            <BitePhone screen={biteScreens[1]} />
            <BitePhone screen={biteScreens[6]} />
          </div>
        </section>

        <section className="bite-overview bite-shell">
          <p className="bite-index">01 / Overview</p>
          <div className="bite-overview-grid">
            <p className="bite-heading" role="heading" aria-level={2}>
              A direct route from <em>“I’m hungry”</em> to “it’s ordered.”
            </p>
            <div className="bite-copy">
              <p>
                BiteBuzz is a mobile food-ordering concept designed around the
                moments that create friction: deciding what to eat, narrowing a
                large menu, checking a dish, and reviewing the final cart.
              </p>
              <p>
                The interface uses appetising imagery, an energetic orange
                accent and familiar interaction patterns to keep each next step
                obvious.
              </p>
            </div>
          </div>
          <div className="bite-principles">
            <article>
              <span>01</span>
              <b>Make discovery visual</b>
              <p>
                Categories and food imagery do more work than long explanations.
              </p>
            </article>
            <article>
              <span>02</span>
              <b>Reduce decision weight</b>
              <p>
                Each view concentrates on one question and one primary action.
              </p>
            </article>
            <article>
              <span>03</span>
              <b>Preserve momentum</b>
              <p>
                Repeated controls make browsing, choosing and ordering feel
                continuous.
              </p>
            </article>
          </div>
        </section>

        <section className="bite-challenge">
          <div className="bite-shell">
            <p className="bite-index">02 / Design challenge</p>
            <div className="bite-challenge-grid">
              <p className="bite-heading" role="heading" aria-level={2}>
                Choice is useful.
                <br />
                Choice overload is not.
              </p>
              <div>
                <p>
                  Food delivery products have to support exploration without
                  making the user feel lost. BiteBuzz balances broad discovery
                  with category shortcuts, clear prices and a consistent way to
                  move from a menu card to an order.
                </p>
                <blockquote>
                  Design prompt: How might a food-ordering flow feel abundant,
                  but never overwhelming?
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="bite-journey bite-shell">
          <p className="bite-index">03 / Core journey</p>
          <p className="bite-heading" role="heading" aria-level={2}>
            Seven focused moments.
            <br />
            <em>One connected order.</em>
          </p>
          <div className="bite-journey-line" aria-hidden="true" />
          <div className="bite-journey-grid">
            {journey.map((screenIndex, index) => (
              <article key={biteScreens[screenIndex].label}>
                <span className="bite-step">0{index + 1}</span>
                <BitePhone
                  screen={biteScreens[screenIndex]}
                  onOpen={() => setActiveScreen(screenIndex)}
                />
                <b>{biteScreens[screenIndex].label}</b>
                <p>{biteScreens[screenIndex].caption}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bite-system">
          <div className="bite-shell">
            <p className="bite-index">04 / Visual system</p>
            <div className="bite-system-head">
              <p className="bite-heading" role="heading" aria-level={2}>
                Warm enough to invite.
                <br />
                Clear enough to act.
              </p>
              <p>
                The system pairs neutral surfaces and straightforward typography
                with one appetite-led accent. Rounded cards and controls soften
                a highly transactional experience.
              </p>
            </div>
            <div className="bite-system-grid">
              <div className="bite-colors">
                <span style={{ "--swatch": "#ff9431" } as CSSProperties}>
                  Buzz orange <b>#FF9431</b>
                </span>
                <span style={{ "--swatch": "#fff1e5" } as CSSProperties}>
                  Warm cream <b>#FFF1E5</b>
                </span>
                <span style={{ "--swatch": "#202020" } as CSSProperties}>
                  Ink <b>#202020</b>
                </span>
              </div>
              <div className="bite-type-specimen">
                <span>Typography / DM Sans + Inter</span>
                <b>Aa</b>
                <p>
                  Clear labels, compact prices and confident display moments.
                </p>
              </div>
              <div className="bite-ui-samples">
                <button>Order now</button>
                <span>− &nbsp; 1 &nbsp; +</span>
                <i>⌕</i>
              </div>
            </div>
          </div>
        </section>

        <section className="bite-decisions bite-shell">
          <p className="bite-index">05 / Interaction decisions</p>
          <div className="bite-decisions-grid">
            <article>
              <span>Search with context</span>
              <p>
                Large search affordances and category entry points let the user
                begin with either a known dish or an open-ended craving.
              </p>
            </article>
            <article>
              <span>Details before commitment</span>
              <p>
                Product screens keep the image, description, quantity and
                purchase action in one contained composition.
              </p>
            </article>
            <article>
              <span>A reassuring finish</span>
              <p>
                The confirmation screen removes navigation noise and focuses on
                the completed state.
              </p>
            </article>
          </div>
        </section>

        <section className="bite-gallery">
          <div className="bite-shell">
            <p className="bite-index">06 / Interface gallery</p>
            <p className="bite-heading" role="heading" aria-level={2}>
              The full menu of moments.
            </p>
            <p className="bite-gallery-hint">
              Select any screen to inspect the design.
            </p>
            <div className="bite-gallery-grid">
              {gallery.map((screenIndex) => (
                <article key={biteScreens[screenIndex].label}>
                  <BitePhone
                    screen={biteScreens[screenIndex]}
                    onOpen={() => setActiveScreen(screenIndex)}
                  />
                  <span>{biteScreens[screenIndex].label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bite-reflection bite-shell">
          <p className="bite-index">07 / Reflection</p>
          <div>
            <p className="bite-heading" role="heading" aria-level={2}>
              A cohesive flow is built through{" "}
              <em>repetition, not sameness.</em>
            </p>
            <p>
              BiteBuzz shows how a compact visual language can hold together
              very different tasks,from browsing images to checking a
              price,without losing personality.
            </p>
            <small>
              Next steps: validate category comprehension, test checkout
              completion, and add delivery tracking states. No unverified
              outcome metrics are claimed for this concept.
            </small>
          </div>
        </section>

        <button className="next-project bite-next" onClick={onNext}>
          <span>Next case study</span>
          <b>TummyTales</b>
          <i>→</i>
        </button>
      </main>

      {activeScreen !== null && (
        <div
          className="bite-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${biteScreens[activeScreen].label} screen preview`}
        >
          <button
            onClick={() => setActiveScreen(null)}
            aria-label="Close screen preview"
          >
            Close ×
          </button>
          <div>
            <BitePhone screen={biteScreens[activeScreen]} />
            <aside>
              <span>Screen / {String(activeScreen + 1).padStart(2, "0")}</span>
              <b>{biteScreens[activeScreen].label}</b>
              <p>{biteScreens[activeScreen].caption}</p>
            </aside>
          </div>
        </div>
      )}
    </div>
  )
}

function CaseStudy({
  project,
  onBack,
  onNext,
}: {
  project: Project
  onBack: () => void
  onNext: () => void
}) {
  const [zoomed, setZoomed] = useState(false)
  useEffect(() => {
    const escape = (event: KeyboardEvent) =>
      event.key === "Escape" && setZoomed(false)
    window.addEventListener("keydown", escape)
    window.scrollTo({ top: 0, behavior: "auto" })
    return () => window.removeEventListener("keydown", escape)
  }, [project.name])

  if (project.visual === "matiks") {
    return <MatiksCaseStudy onBack={onBack} onNext={onNext} />
  }
  if (project.visual === "tummytales") {
    return <TummyTalesCaseStudy onBack={onBack} onNext={onNext} />
  }
  if (project.visual === "gpay") {
    return <GPayExperience onBack={onBack} onNext={onNext} />
  }
  if (project.visual === "rootree") {
    return <RootreeCaseStudy onBack={onBack} onNext={onNext} />
  }
  if (project.visual === "bitebuzz") {
    return <BiteBuzzCaseStudy onBack={onBack} onNext={onNext} />
  }

  return (
    <div className={`case-study case-${project.visual} case-enter`}>
      <header className="case-nav">
        <button onClick={onBack} className="case-back">
          ← Back to work
        </button>
        <span>Case study / {project.number}</span>
        <b>YKS</b>
      </header>
      <main>
        <section className="case-hero page-shell">
          <div className="case-breadcrumb">
            {project.category} · {project.year}
          </div>
          <p className="case-title" role="heading" aria-level={1}>
            {project.name}
          </p>
          <p className="case-deck">{project.description}</p>
          <div className="case-facts">
            <div>
              <span>My role</span>
              <b>Product Designer</b>
            </div>
            <div>
              <span>Project type</span>
              <b>Independent design exploration</b>
            </div>
            <div>
              <span>Tools</span>
              <b>Figma · FigJam</b>
            </div>
          </div>
        </section>
        <section
          className="case-cover page-shell"
          data-cursor="OPEN"
          role="button"
          tabIndex={0}
          aria-label={`Expand ${project.name} interface preview`}
          onClick={() => setZoomed(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              setZoomed(true)
            }
          }}
        >
          <InterfaceVisual type={project.visual} />
          <span>
            Click to expand <Arrow />
          </span>
        </section>
        {project.visual === "matiks" && <MatiksStory />}
        <section className="case-overview page-shell" data-reveal>
          <p className="case-section-label">01 / Overview</p>
          <p className="case-editorial" role="heading" aria-level={2}>
            A product story built around <em>clarity before decoration.</em>
          </p>
          <div className="case-columns">
            <div>
              <span>Context</span>
              <p>{project.description}</p>
            </div>
            <div>
              <span>Challenge</span>
              <p>{project.challenge}</p>
            </div>
            <div>
              <span>Design response</span>
              <p>{project.response}</p>
            </div>
          </div>
        </section>
        <section className="case-problem">
          <div className="page-shell case-split" data-reveal>
            <div>
              <p className="case-section-label">02 / The problem</p>
              <p className="case-large-copy">
                What problem was worth solving, and why did it matter?
              </p>
            </div>
            <div className="case-narrative">
              <span>Design prompt</span>
              <p>{project.challenge}</p>
              <small>
                This is presented as an independent design exploration; no
                unverified outcome metrics are claimed.
              </small>
            </div>
          </div>
        </section>
        <section className="case-research page-shell" data-reveal>
          <p className="case-section-label">03 / Product reasoning</p>
          <div className="case-research-head">
            <p className="case-large-copy">Evidence before interface.</p>
            <p>
              The reasoning behind the direction,framed honestly as design
              hypotheses to validate, not as research findings that did not
              happen.
            </p>
          </div>
          <div className="research-grid">
            {[
              ["Product question", project.challenge],
              ["Design response", project.response],
              ["Core focus", project.tags.slice(0, 3).join(" · ")],
              ["What it demonstrates", project.proof],
            ].map(([label, copy], index) => (
              <article key={label}>
                <span>0{index + 1}</span>
                <p>{label}</p>
                <small className="reasoning-copy">{copy}</small>
              </article>
            ))}
          </div>
        </section>
        <section className="flow-section">
          <div className="page-shell" data-reveal>
            <p className="case-section-label">04 / User flow</p>
            <p className="case-large-copy">
              Turning intent into a clear journey.
            </p>
            <div className="user-flow">
              {["Entry", "Discover", "Evaluate", "Act", "Success"].map(
                (step, index) => (
                  <div key={step}>
                    <span>0{index + 1}</span>
                    <b>{step}</b>
                    {index < 4 && <i>→</i>}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
        <section className="wireframe-section" data-reveal>
          <div className="page-shell">
            <p className="case-section-label">05 / Wireframes</p>
            <p className="case-large-copy">Structure first. Polish later.</p>
          </div>
          <div className="wireframe-scroller">
            {[1, 2, 3, 4, 5].map((number) => (
              <Wireframe key={number} number={number} />
            ))}
          </div>
        </section>
        <section className="exploration-section page-shell" data-reveal>
          <p className="case-section-label">06 / Design exploration</p>
          <div className="exploration-heading">
            <p className="case-large-copy">Exploring the right visual voice.</p>
            <p>
              Three visual studies used to compare hierarchy, expression and the
              fit between product purpose and interface tone.
            </p>
          </div>
          <div className="directions">
            {["Direction A", "Direction B", "Direction C"].map(
              (direction, index) => (
                <article key={direction}>
                  <div className={`direction-art direction-${index}`}>
                    <i />
                    <i />
                    <b>Aa</b>
                  </div>
                  <span>{direction}</span>
                  <small>Visual system exploration</small>
                </article>
              ),
            )}
          </div>
        </section>
        <section className="final-ui-section">
          <div className="page-shell" data-reveal>
            <p className="case-section-label">07 / Final UI</p>
            <div className="final-heading">
              <p className="case-large-copy">
                The experience, brought to life.
              </p>
              <p>
                Large interface moments designed to make the product feel clear,
                coherent and intentional.
              </p>
            </div>
            <button
              className="final-main"
              onClick={() => setZoomed(true)}
              data-cursor="OPEN"
              aria-label="Enlarge final interface"
            >
              <InterfaceVisual type={project.visual} />
            </button>
            <div className="final-pair">
              <button onClick={() => setZoomed(true)} data-cursor="OPEN">
                <InterfaceVisual type={project.visual} />
                <span>Core experience</span>
              </button>
              <button onClick={() => setZoomed(true)} data-cursor="OPEN">
                <InterfaceVisual type={project.visual} />
                <span>Detail view</span>
              </button>
            </div>
          </div>
        </section>
        <section className="outcome-section page-shell" data-reveal>
          <p className="case-section-label">08 / Outcome & learnings</p>
          <div className="outcome-grid">
            <article>
              <p>What this demonstrates</p>
              <span>{project.proof}</span>
            </article>
            <article>
              <p>Key learning</p>
              <span>{project.learning}</span>
            </article>
            <article>
              <p>Next step</p>
              <span>
                Validate the main assumptions with target users, measure task
                success and iterate from observed behaviour.
              </span>
            </article>
          </div>
        </section>
        <button className="next-project" onClick={onNext}>
          <span>Next case study</span>
          <b>
            {projects[(projects.indexOf(project) + 1) % projects.length].name}
          </b>
          <i>→</i>
        </button>
      </main>
      {zoomed && (
        <div
          className="case-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded project screen"
        >
          <button
            onClick={() => setZoomed(false)}
            aria-label="Close expanded screen"
          >
            Close ×
          </button>
          <div>
            <InterfaceVisual type={project.visual} />
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  const onMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    event.currentTarget.style.setProperty("--spot-x", `${x * 100}%`)
    event.currentTarget.style.setProperty("--spot-y", `${y * 100}%`)
    event.currentTarget.style.setProperty(
      "--card-tilt-x",
      `${(0.5 - y) * 2.4}deg`,
    )
    event.currentTarget.style.setProperty(
      "--card-tilt-y",
      `${(x - 0.5) * 2.4}deg`,
    )
  }
  const reset = (event: ReactMouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--spot-x", "50%")
    event.currentTarget.style.setProperty("--spot-y", "50%")
    event.currentTarget.style.setProperty("--card-tilt-x", "0deg")
    event.currentTarget.style.setProperty("--card-tilt-y", "0deg")
  }
  return (
    <article
      className={`project-card project-${project.visual} ${
        project.featured ? "project-featured" : ""
      }`}
      data-cursor="EXPLORE PROJECT"
      data-reveal
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <button
        className="project-hit-area"
        onClick={onOpen}
        aria-label={`Open ${project.name} case study`}
      />
      <div className="project-info">
        <div className="project-index">
          <span>{project.number}</span>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <p className="project-name" role="heading" aria-level={3}>
          {project.name}
        </p>
        <p className="project-description">{project.description}</p>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <span className="text-link">
          {project.visual === "matiks" || project.visual === "gpay"
            ? "View case study"
            : "View project"}{" "}
          <Arrow />
        </span>
      </div>
      <InterfaceVisual type={project.visual} />
    </article>
  )
}

function Header({
  dark,
  onToggleTheme,
}: {
  dark: boolean
  onToggleTheme: () => void
}) {
  const [open, setOpen] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)
  const [secret, setSecret] = useState(false)
  const close = () => setOpen(false)
  const discoverSecret = () => {
    const next = logoClicks + 1
    setLogoClicks(next)
    if (next === 5) {
      setSecret(true)
      setLogoClicks(0)
      window.setTimeout(() => setSecret(false), 3500)
    }
  }
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link
          href="#top"
          className="brand"
          onClick={() => {
            close()
            discoverSecret()
          }}
        >
          <span className="brand-mark">Y</span>
          <span>Yogesh Kumar Singh</span>
        </Link>
        <div className={`nav-links ${open ? "nav-open" : ""}`}>
          <Link href="#about" onClick={close}>
            About
          </Link>
          <Link href="#work" onClick={close}>
            Work
          </Link>
          <Link href="#experience" onClick={close}>
            Experience
          </Link>
          <Link href="#contact" onClick={close}>
            Contact
          </Link>
        </div>
        <Link href="mailto:ys20050911@gmail.com" className="nav-cta">
          Let's talk <Arrow />
        </Link>
        <Link
          href={RESUME_PATH}
          download={RESUME_DOWNLOAD_NAME}
          className="nav-resume"
          label="Download resume PDF"
          onClick={close}
        >
          Resume <span aria-hidden="true">↓</span>
        </Link>
        <ThemeToggle dark={dark} onToggle={onToggleTheme} />
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
        <span className="nav-progress" aria-hidden="true">
          <i className="nav-progress-fill" />
        </span>
      </nav>
      <div
        className={`secret-note ${secret ? "secret-visible" : ""}`}
        role="status"
      >
        Okay, you found the secret. Curiosity is a design skill.
      </div>
    </header>
  )
}

function HeroVisual() {
  const visual = useRef<HTMLDivElement>(null)
  const dragTarget = useRef<HTMLDivElement>(null)
  const drag = useRef({ startX: 0, startY: 0, x: 0, y: 0 })
  const moods = [
    {
      id: "orange",
      label: "Bold",
      kicker: "PRODUCT / 01",
      title: (
        <>
          Build for clarity,
          <br />
          not complexity.
        </>
      ),
      principle: (
        <>
          Useful
          <br />
          over flashy.
        </>
      ),
    },
    {
      id: "acid",
      label: "Curious",
      kicker: "EXPERIMENT / 02",
      title: (
        <>
          Make room for
          <br />
          the unexpected.
        </>
      ),
      principle: (
        <>
          Playful
          <br />
          with purpose.
        </>
      ),
    },
    {
      id: "violet",
      label: "Focused",
      kicker: "SYSTEM / 03",
      title: (
        <>
          Give every detail
          <br />a reason.
        </>
      ),
      principle: (
        <>
          Clear
          <br />
          over clever.
        </>
      ),
    },
    {
      id: "ink",
      label: "Essential",
      kicker: "EDIT / 04",
      title: (
        <>
          Remove until
          <br />
          it feels obvious.
        </>
      ),
      principle: (
        <>
          Less noise.
          <br />
          More signal.
        </>
      ),
    },
  ]
  const [mood, setMood] = useState(moods[0])
  const onMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.width
      ? Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5))
      : 0
    const y = rect.height
      ? Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5))
      : 0
    visual.current?.style.setProperty("--mouse-x", String(x))
    visual.current?.style.setProperty("--mouse-y", String(y))
    visual.current?.style.setProperty("--tilt-x", `${x * 12}deg`)
    visual.current?.style.setProperty("--tilt-y", `${y * -12}deg`)
  }
  const reset = () => {
    visual.current?.style.setProperty("--mouse-x", "0")
    visual.current?.style.setProperty("--mouse-y", "0")
    visual.current?.style.setProperty("--tilt-x", "0deg")
    visual.current?.style.setProperty("--tilt-y", "0deg")
  }
  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current.startX = event.clientX - drag.current.x
    drag.current.startY = event.clientY - drag.current.y
  }
  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    drag.current.x = Math.max(
      -55,
      Math.min(55, event.clientX - drag.current.startX),
    )
    drag.current.y = Math.max(
      -45,
      Math.min(45, event.clientY - drag.current.startY),
    )
    dragTarget.current?.style.setProperty("--drag-x", `${drag.current.x}px`)
    dragTarget.current?.style.setProperty("--drag-y", `${drag.current.y}px`)
  }
  return (
    <div
      ref={visual}
      className="hero-visual"
      data-mood={mood.id}
      aria-label={`Abstract interface design composition. ${mood.label} mood selected.`}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <div className="hero-project-pins" aria-label="Featured case studies">
        <Link
          href="#work"
          className="hero-project-pin pin-matiks"
          label="Explore Matiks mobile UX case study"
        >
          <i aria-hidden="true" />
          <span>Matiks</span>
          <small>Mobile UX</small>
        </Link>
        <Link
          href="#work"
          className="hero-project-pin pin-gpay"
          label="Explore GPay fintech case study"
        >
          <i aria-hidden="true" />
          <span>GPay</span>
          <small>Fintech</small>
        </Link>
        <Link
          href="#work"
          className="hero-project-pin pin-rootree"
          label="Explore Rootree SaaS case study"
        >
          <i aria-hidden="true" />
          <span>Rootree</span>
          <small>SaaS</small>
        </Link>
      </div>
      <div className="grid-lines" />
      <div className="cursor cursor-one">
        <i />
        Move, drag, recolor
      </div>
      <div className="cursor cursor-two">
        <i />
        YK
      </div>
      <div className="floating-panel panel-main">
        <div className="panel-toolbar">
          <span />
          <span>New experience</span>
          <i>•••</i>
        </div>
        <div className="panel-canvas">
          <div className="canvas-copy" key={mood.id}>
            <small>{mood.kicker}</small>
            <b>{mood.title}</b>
            <span>Explore work →</span>
          </div>
          <div className="canvas-art">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div
        ref={dragTarget}
        className="floating-panel panel-small"
        data-cursor="DRAG"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
      >
        <span>Design principle</span>
        <b key={mood.id}>{mood.principle}</b>
        <i>01</i>
      </div>
      <div className="palette-wrap">
        <span className="palette-label">Mood / {mood.label}</span>
        <div className="palette" role="group" aria-label="Choose a visual mood">
          {moods.map((item) => (
            <button
              key={item.id}
              className={`palette-${item.id}`}
              onClick={() => setMood(item)}
              aria-label={`Use ${item.label.toLowerCase()} mood`}
              aria-pressed={mood.id === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const tickerItems = [
  "UX research",
  "User flows",
  "Prototyping",
  "Interaction design",
  "Design systems",
]

function CreativeTicker() {
  const items = tickerItems.map((item) => (
    <span key={item}>
      {item}
      <i aria-hidden="true">✳</i>
    </span>
  ))
  return (
    <div className="creative-ticker" aria-label={tickerItems.join(", ")}>
      <div className="ticker-track">
        <div>{items}</div>
        <div aria-hidden="true">{items}</div>
      </div>
    </div>
  )
}

function SystemsLab() {
  const sectionRef = useRef<HTMLElement>(null)
  const [typeSize, setTypeSize] = useState(54)
  const [accent, setAccent] = useState("orange")
  const [isVisible, setIsVisible] = useState(false)
  const colors = ["orange", "acid", "violet", "ink"]
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { threshold: 0.12 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])
  return (
    <section
      ref={sectionRef}
      className={`systems-lab lab-${accent} ${isVisible ? "is-visible" : ""}`}
    >
      <div className="page-shell">
        <SectionTitle
          eyebrow="05 / Systems lab"
          title="Design details that matter."
          intro="Typography, color, spacing and motion shape how clearly an interface communicates."
        />
        <div className="lab-grid">
          <article className="lab-type">
            <span>01 / Typography</span>
            <p style={{ "--type-size": `${typeSize}px` } as CSSProperties}>
              Clarity has a voice.
            </p>
            <input
              type="range"
              min="36"
              max="82"
              value={typeSize}
              onChange={(event) => setTypeSize(Number(event.target.value))}
              aria-label="Change typography size"
            />
            <small>{typeSize}px / responsive display scale</small>
          </article>
          <article className="lab-color">
            <span>02 / Color logic</span>
            <div className="lab-preview">
              <i />
              <b>Primary action</b>
              <small>              Use color to guide attention and signal actions.</small>
            </div>
            <div
              className="lab-swatches"
              role="group"
              aria-label="Change interface accent"
            >
              {colors.map((color) => (
                <button
                  key={color}
                  className={`swatch-${color}`}
                  onClick={() => setAccent(color)}
                  aria-label={`Use ${color}`}
                  aria-pressed={accent === color}
                />
              ))}
            </div>
          </article>
          <article className="lab-spacing">
            <span>03 / Spacing rhythm</span>
            <div>
              {[1, 2, 3, 4, 5].map((item) => (
                <i key={item} />
              ))}
            </div>
            <small>4 · 8 · 16 · 24 · 40</small>
          </article>
          <article className="lab-motion">
            <span>04 / Motion</span>
            <div>
              <i />
              <b>Hover to understand intent</b>
            </div>
            <small>Motion should clarify a change, not distract from it.</small>
          </article>
        </div>
      </div>
    </section>
  )
}

function QuickFacts() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [counts, setCounts] = useState([0, 0])
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.45 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced) {
      setCounts([2, 12])
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (time: number) => {
      const progress = Math.min((time - start) / 900, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCounts([Math.round(2 * eased), Math.round(12 * eased)])
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started])
  return (
    <section ref={ref} className="quick-facts" data-reveal>
      <div className="page-shell facts-grid">
        <article>
          <b>{counts[0]}+</b>
          <span>Years designing</span>
        </article>
        <article>
          <b>{counts[1]}+</b>
          <span>Projects designed</span>
        </article>
        <article>
          <b>3rd</b>
          <span>College UI/UX hackathon</span>
        </article>
        <article>
          <b>GDG</b>
          <span>Design Lead</span>
        </article>
      </div>
    </section>
  )
}

function ThemeToggle({
  dark,
  onToggle,
  className = "",
}: {
  dark: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={onToggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      aria-pressed={dark}
    >
      <span>{dark ? "Light" : "Dark"}</span>
      <i aria-hidden="true" />
    </button>
  )
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [dark, setDark] = useState(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme")
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const homeScroll = useRef(0)
  usePageInteractions()
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light"
    window.localStorage.setItem("portfolio-theme", dark ? "dark" : "light")
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#151613" : "#f6f5f0")
  }, [dark])
  useEffect(() => {
    document.documentElement.classList.add("loaded")
    return () => document.documentElement.classList.remove("loaded")
  }, [])

  const openProject = (project: Project) => {
    homeScroll.current = window.scrollY
    setSelectedProject(project)
  }
  const returnHome = () => {
    setSelectedProject(null)
    requestAnimationFrame(() =>
      window.scrollTo({ top: homeScroll.current, behavior: "auto" }),
    )
  }
  const nextProject = () => {
    if (!selectedProject) return
    setSelectedProject(
      projects[(projects.indexOf(selectedProject) + 1) % projects.length],
    )
  }

  if (selectedProject) {
    return (
      <>
        <CustomCursor />
        <ThemeToggle
          dark={dark}
          onToggle={() => setDark((value) => !value)}
          className="case-theme-toggle"
        />
        <div className="scroll-progress" aria-hidden="true" />
        <CaseStudy
          project={selectedProject}
          onBack={returnHome}
          onNext={nextProject}
        />
      </>
    )
  }

  return (
    <div id="top" className="app">
      <CustomCursor />
      <div className="scroll-progress" aria-hidden="true" />
      <Header dark={dark} onToggleTheme={() => setDark((value) => !value)} />
      <main className="home-enter">
        <section className="hero page-shell">
          <div className="hero-copy">
            <div className="availability">
              <i /> Open to UI/UX internships & junior product roles
            </div>
            <p className="hero-title" role="heading" aria-level={1}>
              Designing <span className="hero-word word-digital">digital</span>{" "}
              <span className="hero-word word-experiences">experiences</span>{" "}
              people <em className="hero-word word-actually">actually want</em>{" "}
              to <span className="hero-word word-use">use.</span>
            </p>
            <p className="hero-description">
              I'm Yogesh, a UI/UX designer in Bangalore. I turn user needs and
              product goals into clear flows, thoughtful interfaces and
              cohesive visual systems.
            </p>
            <div className="hero-actions">
              <Link href="#work" className="button button-dark">
                View case studies <span>↓</span>
              </Link>
              <Link href="#contact" className="button button-light">
                Discuss an opportunity <Arrow />
              </Link>
            </div>
          </div>
          <HeroVisual />
          <Link href="#work" className="scroll-indicator">
            <span>Scroll to explore</span>
            <i />
          </Link>
          <div className="hero-meta">
            <span>Based in Bangalore, India</span>
            <span>Product thinking · UX · Visual systems</span>
          </div>
        </section>

        <CreativeTicker />

        <section id="about" className="about-section page-shell">
          <SectionTitle eyebrow="02 / About" title="Hi, I'm Yogesh." />
          <div className="about-grid">
            <div className="portrait">
              <img
                className="portrait-photo"
                src="/yogesh-profile.jpg"
                alt="Yogesh Kumar Singh outdoors in the mountains"
              />
              <div className="portrait-label">
                <span>Yogesh Kumar Singh</span>
                <span>Bangalore · India</span>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-origin">
                Engineer by degree.{" "}
                <em>Designer by passion and a little obsession.</em>
              </p>
              <p className="about-lead">
                I connect user needs, clear interactions and visual craft to
                design <em>useful digital products.</em>
              </p>
              <p>
                From early user flows to polished interfaces, I focus on
                hierarchy, accessible patterns and details that make products
                easier to understand and use.
              </p>
              <div className="tool-stack">
                <span>Tools I think with</span>
                <div>
                  {["Figma", "Framer", "FigJam", "Jitter", "AI design tools"].map(
                    (tool) => (
                      <i key={tool}>{tool}</i>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="outside-pixels">
            <p className="eyebrow">Outside the pixels</p>
            <p className="outside-intro">
              A few things that keep me curious, moving and making.
            </p>
            <div className="outside-grid">
              {[
                ["Long cycling routes", "↗"],
                ["Pokémon worlds", "✦"],
                ["Collecting visual references", "◎"],
                ["Learning through making", "✳"],
              ].map(([interest, symbol], index) => (
                <article
                  className={`outside-card outside-card-${index + 1}`}
                  key={interest}
                >
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  <span aria-hidden="true">{symbol}</span>
                  <b>{interest}</b>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="work-section page-shell">
          <SectionTitle
            eyebrow="03 / Selected Work"
            title="Projects as product stories."
            intro="Explore how I move from a user need to clearer flows, thoughtful interfaces and cohesive visual systems."
          />
          <div className="project-list">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                onOpen={() => openProject(project)}
              />
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="experience-section page-shell"
          data-reveal
        >
          <div className="experience-header">
            <p className="eyebrow">04 / Experience</p>
            <p className="section-title" role="heading" aria-level={2}>
              Product design in practice.
            </p>
          </div>
          <div className="timeline">
            {[
              {
                id: "freelance-independent",
                year: "2025 to 2026",
                role: "Freelance UI/UX Designer",
                company: "Independent Projects",
              },
              {
                id: "renderverse-internship",
                year: "Mar 2025 to Apr 2025",
                role: "UI/UX Design Intern",
                company: "Renderverse",
              },
              {
                id: "verto-club-internship",
                year: "Sep 2024 to Dec 2024",
                role: "UI/UX Design Intern",
                company: "Verto Club",
              },
            ].map(({ id, year, role, company }) => (
              <article
                className="timeline-row"
                key={id}
                tabIndex={0}
                onClick={(event) => event.currentTarget.focus()}
              >
                <span>{year}</span>
                <p>
                  {role}
                  <b>
                    Designing digital experiences through clear user flows,
                    considered interfaces and collaborative iteration.
                  </b>
                </p>
                <small>{company}</small>
                <i>↗</i>
              </article>
            ))}
          </div>
          <div className="leadership">
            <span>Also leading</span>
            <p>Design Lead at Google Developer Group, NMIT</p>
            <p>UI/UX Lead at Design Club</p>
          </div>
        </section>

        <QuickFacts />
        <SystemsLab />

        <section id="contact" className="contact-section" data-reveal>
          <div className="page-shell contact-shell">
            <div className="contact-grid" aria-hidden="true" />
            <span className="contact-float contact-float-one">
              RESEARCH → UX → UI
            </span>
            <span className="contact-float contact-float-two">
              PRODUCT / 01
            </span>
            <div className="contact-status">
              <i /> Open to internships and junior product design roles
            </div>
            <p className="contact-title" role="heading" aria-level={2}>
              Have a product
              <br />
              challenge?
            </p>
            <p className="contact-copy">
              I'm open to UI/UX internships and junior product design roles.
              If you're building something useful, let's talk.
            </p>
            <div className="contact-actions">
              <Link
                href="mailto:ys20050911@gmail.com"
                className="button button-white"
              >
                Let's talk <Arrow />
              </Link>
              <Link
                href="https://www.linkedin.com/in/yogesh-kumar-singh-949353284/"
                className="button button-outline"
                label="Visit Yogesh on LinkedIn"
              >
                LinkedIn <Arrow />
              </Link>
              <Link
                href="tel:+916360246106"
                className="button button-outline"
                label="Call Yogesh at +91-6360246106"
              >
                +91-6360246106
              </Link>
              <Link
                href={RESUME_PATH}
                download={RESUME_DOWNLOAD_NAME}
                className="button button-outline"
                label="Download Yogesh Kumar Singh's resume"
              >
                Download resume ↓
              </Link>
            </div>
            <small className="contact-available">
              Available for design opportunities.
            </small>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="page-shell footer-top">
          <div>
            <b>Yogesh Kumar Singh</b>
            <span>UI/UX & Product Designer</span>
          </div>
          <div className="footer-links">
            <Link href="https://www.linkedin.com/in/yogesh-kumar-singh-949353284/">
              LinkedIn
            </Link>
            <Link href="mailto:ys20050911@gmail.com">Email</Link>
            <Link href="tel:+916360246106">+91-6360246106</Link>
          </div>
        </div>
        <div className="page-shell footer-bottom">
          <span>© 2026 Yogesh Kumar Singh</span>
          <span>Designed & built with curiosity.</span>
          <Link href="#top">Back to top ↑</Link>
        </div>
      </footer>
    </div>
  )
}

export default App
