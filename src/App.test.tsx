import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import App from "./App"

describe("portfolio experience", () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.dataset.theme = "light"
  })

  afterEach(() => {
    cleanup()
  })

  it("renders working section links and all featured project cards", () => {
    render(<App />)

    expect(screen.getAllByText("View case study")).toHaveLength(2)
    expect(screen.getAllByText("View project")).toHaveLength(3)

    expect(
      screen.getAllByRole("link", { name: /\+91-6360246106/i }),
    ).toHaveLength(2)
    expect(
      screen.getAllByRole("link", { name: /\+91-6360246106/i })[0],
    ).toHaveAttribute("href", "tel:+916360246106")

    const resumeLinks = screen.getAllByRole("link", {
      name: /resume/i,
    })
    expect(resumeLinks).toHaveLength(2)
    expect(
      screen.getByRole("link", { name: "Download resume PDF" }),
    ).toHaveClass("nav-resume")
    for (const link of resumeLinks) {
      expect(link).toHaveAttribute("href", "/Yogesh-Kumar-Singh-Resume.pdf")
      expect(link).toHaveAttribute("download", "Yogesh-Kumar-Singh-Resume.pdf")
    }

    expect(
      screen.getByRole("img", {
        name: "Yogesh Kumar Singh outdoors in the mountains",
      }),
    ).toHaveAttribute("src", "/yogesh-profile.jpg")
    expect(
      screen.getByText("Designer by passion and a little obsession."),
    ).toBeInTheDocument()
    expect(screen.getByText("Engineer by degree.")).toBeInTheDocument()
    expect(screen.getByText("Jitter")).toBeInTheDocument()

    const sectionIds = Array.from(
      document.querySelectorAll("main section[id]"),
    ).map((section) => section.id)
    expect(sectionIds.indexOf("about")).toBeLessThan(sectionIds.indexOf("work"))
    expect(screen.queryByText("Design philosophy")).not.toBeInTheDocument()
    expect(screen.queryByText("What I’m looking for")).not.toBeInTheDocument()

    for (const section of ["work", "about", "experience", "contact"]) {
      const link = screen.getByRole("link", {
        name: new RegExp(`^${section === "work" ? "Work" : section}$`, "i"),
      })
      expect(link).toHaveAttribute("href", `#${section}`)
      expect(document.getElementById(section)).toBeInTheDocument()
    }

    for (const project of [
      "Matiks",
      "GPay",
      "BiteBuzz Food App",
      "TummyTales",
      "Rootree",
    ]) {
      expect(
        screen.getByRole("button", { name: `Open ${project} case study` }),
      ).toBeInTheDocument()
    }

    for (const label of [
      "Explore Matiks mobile UX case study",
      "Explore GPay fintech case study",
      "Explore Rootree SaaS case study",
    ]) {
      expect(
        screen.getByRole("link", { name: label }),
      ).toHaveAttribute("href", "#work")
    }
  })

  it("changes and persists the selected theme", async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    )

    expect(document.documentElement).toHaveAttribute("data-theme", "dark")
    expect(window.localStorage.getItem("portfolio-theme")).toBe("dark")
    cleanup()
    render(<App />)

    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toHaveAttribute("aria-pressed", "true")
  })

  it("updates and resets the hero perspective safely", () => {
    const { container } = render(<App />)
    const stage = container.querySelector<HTMLElement>(".hero-visual")
    expect(stage).not.toBeNull()
    if (!stage) return
    vi.spyOn(stage, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 200,
      bottom: 100,
      width: 200,
      height: 100,
      toJSON: () => ({}),
    } as DOMRect)

    fireEvent.mouseMove(stage, { clientX: 175, clientY: 25 })
    expect(stage.style.getPropertyValue("--tilt-x")).toBe("4.5deg")
    expect(stage.style.getPropertyValue("--tilt-y")).toBe("3deg")

    fireEvent.mouseLeave(stage)
    expect(stage.style.getPropertyValue("--tilt-x")).toBe("0deg")
    expect(stage.style.getPropertyValue("--tilt-y")).toBe("0deg")
  })

  it("keeps the color lab visible when its accent changes", async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    const section = container.querySelector(".systems-lab")
    expect(section).toHaveClass("is-visible")

    await user.click(screen.getByRole("button", { name: "Use violet" }))
    expect(section).toHaveClass("lab-violet", "is-visible")

    await user.click(screen.getByRole("button", { name: "Use ink" }))
    expect(section).toHaveClass("lab-ink", "is-visible")
  })

  it.each(["Matiks", "GPay", "BiteBuzz Food App", "TummyTales", "Rootree"])(
    "opens the %s case study and returns to the portfolio",
    async (project) => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(
        screen.getByRole("button", { name: `Open ${project} case study` }),
      )
      expect(
        screen.getByRole("button", { name: /back to work/i }),
      ).toBeInTheDocument()

      await user.click(screen.getByRole("button", { name: /back to work/i }))

      expect(
        screen.getByRole("button", { name: `Open ${project} case study` }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).toBeInTheDocument()
    },
  )

  it("advances from one project case study to the next", async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole("button", { name: "Open Matiks case study" }),
    )
    await user.click(screen.getByRole("button", { name: /next case study/i }))

    expect(screen.getByText(/Understand the money/i)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /back to work/i }),
    ).toBeInTheDocument()
  })

  it("shows the redesigned five-destination Matiks bottom navigation", async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole("button", { name: "Open Matiks case study" }),
    )

    expect(
      screen.getByRole("img", {
        name: "Redesigned Matiks Arena bottom navigation with Arena, Snac, Compete, Quests and More",
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("img", {
        name: "Redesigned Matiks Arena bottom navigation with Arena, Snac, Compete, Quests and More",
      }).querySelector("img"),
    ).toHaveAttribute("src", "/matiks/arena-after-branded.png")
  })
})
