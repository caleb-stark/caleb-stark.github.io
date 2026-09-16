import './App.css'

const projects = [
  {
    number: '01',
    title: 'nfl-predictor',
    note: 'prediction project',
    tags: ['Python', 'Data', 'ML'],
    link: 'https://github.com/caleb-stark/nfl-predictor',
    side: 'left',
  },
  {
    number: '02',
    title: 'music_finder',
    note: 'music discovery app',
    tags: ['App', 'API', 'Music'],
    link: 'https://github.com/caleb-stark/music_finder',
    side: 'right',
  },
]

function Arrow() {
  return <span aria-hidden="true">→</span>
}

function App() {
  return (
    <main>
      <section className="hero" id="home">
        <nav className="nav">
          <a className="brand" href="#home">caleb stark</a>
          <div className="nav-links">
            <a href="#work">work</a>
            <a href="#about">about</a>
            <a href="https://github.com/caleb-stark" target="_blank" rel="noreferrer">github</a>
          </div>
        </nav>

        <div className="hero-copy">
          <p className="eyebrow">computer science student</p>
          <h1>
            I build things
            <span>with code.</span>
          </h1>
          <p className="intro">software, data, experiments, and whatever I want to learn next.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">see my work <Arrow /></a>
            <a className="text-link" href="https://github.com/caleb-stark" target="_blank" rel="noreferrer">github <Arrow /></a>
          </div>
        </div>

        <div className="hero-doodle" aria-hidden="true">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="dot"></div>
          <p>build<br />learn<br />repeat</p>
        </div>

        <div className="scroll-note" aria-hidden="true">scroll for projects ↓</div>
      </section>

      <section className="work" id="work">
        <div className="section-heading">
          <span>selected work</span>
          <div></div>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className={`project project-${project.side}`} key={project.title}>
              <div className="project-card">
                <div className="project-topline">
                  <span>{project.number}</span>
                  <span>{project.note}</span>
                </div>
                <div className="project-preview">
                  <span>project screenshot</span>
                </div>
                <div className="project-bottom">
                  <div>
                    <h2>{project.title}</h2>
                    <div className="tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer">view project <Arrow /></a>
                </div>
              </div>
              <p className="project-note">add a short note here</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-copy">
          <p className="eyebrow">a little about me</p>
          <h2>student. developer. always building.</h2>
          <p>Short intro about you goes here. Keep it personal and simple.</p>
        </div>
        <div className="about-links">
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">linkedin <Arrow /></a>
          <a href="https://github.com/caleb-stark" target="_blank" rel="noreferrer">github <Arrow /></a>
          <span>resume later</span>
        </div>
      </section>

      <footer>
        <span>Caleb Stark</span>
        <span>built by me</span>
      </footer>
    </main>
  )
}

export default App
