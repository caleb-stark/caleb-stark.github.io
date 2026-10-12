import './App.css'

const projects = [
  { number: '01', title: 'nfl-predictor', description: 'A data project exploring how machine learning can be used to predict NFL outcomes.', tags: ['Python', 'API', 'ML'], link: 'https://github.com/caleb-stark/nfl-predictor' },
  { number: '03', title: 'blueline', description: 'A more in depth data project to display information about hockey around the league', tags: ['React', 'JS', 'API', ], link: 'https://github.com/caleb-stark' },
  { number: '02', title: 'music_finder', description: 'A music discovery app built around finding something new to listen to.', tags: ['HTML', 'API', 'SQL'], link: 'https://github.com/caleb-stark/music_finder' },
]

function Arrow() { return <span aria-hidden="true">↗</span> }

function App() {
  return (
    <main>
      <section className="hero" id="home">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#home">caleb stark<span>.</span></a>
          <div className="nav-links">
            <a href="#projects">projects</a><a href="#about">about</a><a href="/resume.pdf" target="_blank" rel="noreferrer">resume</a>
          </div>
        </nav>
        <div className="hero-copy">
          <p className="eyebrow">computer science student</p>
          <h1 className='head-brand'>caleb stark<span>.</span></h1>
          <p className="intro">software engineer with experience in java, cpp, and python</p>
          <div className="hero-actions"><a className="primary-button" href="#projects">view projects <Arrow /></a><a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer">view resume <Arrow /></a></div>
        </div>
        <div className="scroll-note" aria-hidden="true">scroll to explore ↓</div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-heading"><span>01 / selected work</span><div /></div>
        <div className="section-intro"><h2>selected projects</h2><a className="project-index-link" href="https://github.com/caleb-stark" target="_blank" rel="noreferrer">all projects <Arrow /></a></div>
        {/* Keep project data above the component so adding a fourth project stays simple. */}
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${index + 1}`} key={project.title}>
              <div className="project-number">{project.number}</div>
              <div className="project-content"><p className="project-kicker">{index === 2 ? 'coming soon' : 'project'}</p><h3>{project.title}</h3><p>{project.description}</p>
                <div className="project-footer"><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.title}`}>view <Arrow /></a></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section" id="about">
        <div className="section-heading"><span>02 / about</span><div /></div>
        <div className="about-layout"><div className="about-copy"><h2>about me</h2><p>I am a computer science student at CSUMB, currently enrolled in the CSin3 program. I enjoy to play video games and hang out with my friends. Always trying to explore new opportunities to expand my experience, and help catapult my career foward</p></div>
          <div className="about-links"><p>Find me elsewhere</p><a href="https://www.linkedin.com/in/caleb-stark" target="_blank" rel="noreferrer">linkedin <Arrow /></a><a href="https://github.com/caleb-stark" target="_blank" rel="noreferrer">github <Arrow /></a><a href="/resume.pdf" target="_blank" rel="noreferrer">resume <Arrow /></a></div>
        </div>
      </section>
      <footer><span>caleb Stark</span><span>© 2026</span></footer>
    </main>
  )
}

export default App
