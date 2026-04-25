const location_page = document.getElementById("location_page")

let weapons = []

fetch("data/weapons.json")
    .then((res) => res.json())
    .then((data) => {
        weapons = data
        renderLocation()
    })

function renderLocation() {
    const params = new URLSearchParams(window.location.search)
    const name = params.get("name")

    if (!name) {
        location_page.innerHTML = `
      <div class="card">
        <h2>location not found</h2>
      </div>
    `
        return
    }

    const location_weapons = weapons.filter((w) => w.locations.includes(name))
    const bosses = [...new Set(location_weapons.flatMap((w) => w.sources))].sort()

    location_page.innerHTML = `
    <div class="card">
      <h2>${name}</h2>
      <p>bosses:</p>
      <ul>
        ${bosses.length
            ? bosses.map((boss) => `<li>${boss}</li>`).join("")
            : "<li>unknown</li>"}
      </ul>
    </div>
  `
}