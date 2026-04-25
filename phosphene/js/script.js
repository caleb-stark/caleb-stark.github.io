const phosphenes = document.getElementById("phosphenes")
const search = document.getElementById("search")
const source_filter = document.getElementById("source_filter")
const location_filter = document.getElementById("location_filter")

let weapons = []
let saved_progress = JSON.parse(localStorage.getItem("progress")) || {}
let search_value = ""
let selected_source = ""
let selected_location = ""

fetch("data/weapons.json")
  .then((res) => res.json())
  .then((data) => {
    weapons = data
    buildFilters()
    renderWeapons()
    updateProgress()
  })

search.addEventListener("input", (e) => {
  search_value = e.target.value.toLowerCase().trim()
  renderWeapons()
})

source_filter.addEventListener("change", (e) => {
  selected_source = e.target.value
  renderWeapons()
})

location_filter.addEventListener("change", (e) => {
  selected_location = e.target.value
  renderWeapons()
})

function buildFilters() {
  const phosphene_weapons = weapons.filter((w) => w.has_phosphene)

  const sources = [...new Set(
    phosphene_weapons.flatMap((w) => w.sources)
  )].sort()

  const locations = [...new Set(
    phosphene_weapons.flatMap((w) => w.locations)
  )].sort()

  source_filter.innerHTML += sources
    .map((source) => `<option value="${source}">${source}</option>`)
    .join("")

  location_filter.innerHTML += locations
    .map((location) => `<option value="${location}">${location}</option>`)
    .join("")
}

function renderWeapons() {
  phosphenes.innerHTML = weapons
    .filter((w) => w.has_phosphene)
    .filter((w) => {
      if (search_value === "") {
        return true
      }

      return w.name.includes(search_value)
    })
    .filter((w) => {
      if (selected_source === "") {
        return true
      }

      return w.sources.includes(selected_source)
    })
    .filter((w) => {
      if (selected_location === "") {
        return true
      }

      return w.locations.includes(selected_location)
    })
    .map((w) => {
      const checked = saved_progress[w.id] ? "checked" : ""

      return `
        <div class="card">
          <h4><a href="weapon.html?id=${w.id}">${w.name}</a></h4>
          <p>${w.manufacturer} · ${w.weapon_type}</p>
          <p>source: ${w.sources.join(", ") || "unknown"}</p>
          <p>
            location:
            ${w.locations.length
          ? w.locations.map((location) => `<a href="location.html?name=${encodeURIComponent(location)}">${location}</a>`).join(", ")
          : "unknown"}
          </p>
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