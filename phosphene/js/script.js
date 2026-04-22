const phosphenes = document.getElementById("phosphene")

let weapons = []
let saved_progress = JSON.parse(localStorage.getItem("progress")) || {}

fetch("data/weapons.json")
  .then((res) => res.json())
  .then((data) => {
    weapons = data
    renderWeapons()
    updateProgress()
  })

function renderWeapons() {
  const container = document.getElementById("phosphenes")

  container.innerHTML = weapons
    .filter((w) => w.has_phosphene)
    .map((w) => {
      const checked = saved_progress[w.id] ? "checked" : ""

      return `
        <div class="card">
          <h4>${w.name}</h4>
          <p>${w.manufacturer} · ${w.weapon_type}</p>
          <p>source: ${w.sources.join(", ") || "unknown"}</p>
          <p>location: ${w.locations.join(", ") || "unknown"}</p>

          <div class="checkbox">
            <input type="checkbox" data-id="${w.id}" ${checked}>
            <label>completed</label>
          </div>
        </div>
      `
    })
    .join("")

  addCheckboxEvents()
}

function addCheckboxEvents() {
  document.querySelectorAll("#phosphenes input[type='checkbox']").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const id = e.target.dataset.id

      if (e.target.checked) {
        saved_progress[id] = true
      } else {
        delete saved_progress[id]
      }

      localStorage.setItem("progress", JSON.stringify(saved_progress))
      updateProgress()
    })
  })
}

function updateProgress() {
  const phosphene_weapons = weapons.filter((w) => w.has_phosphene)
  const completed_count = phosphene_weapons.filter((w) => saved_progress[w.id]).length
  const total_count = phosphene_weapons.length
  const percent = total_count ? (completed_count / total_count) * 100 : 0

  document.getElementById("progress_fill").style.width = `${percent}%`
  document.getElementById("progress_text").textContent = `${completed_count} / ${total_count} completed`
}

function resetProgress() {
  localStorage.removeItem("phosphene_progress")
  saved_progress = {}
  renderWeapons()
}