const weapon_page = document.getElementById("weapon_page")

let weapons = []

fetch("data/weapons.json")
    .then((res) => res.json())
    .then((data) => {
        weapons = data
        renderWeapon()
    })

function renderWeapon() {
    const params = new URLSearchParams(window.location.search)
    const id = Number(params.get("id"))

    const weapon = weapons.find((w) => w.id === id)

    if (!weapon) {
        weapon_page.innerHTML = `
      <div class="card">
        <h2>weapon not found</h2>
      </div>
    `
        return
    }

    weapon_page.innerHTML = `
    <div class="card">
      <h2>${weapon.name}</h2>
      <p>manufacturer: ${weapon.manufacturer}</p>
      <p>weapon type: ${weapon.weapon_type}</p>
      <p>source: ${weapon.sources.join(", ") || "unknown"}</p>
      <p>
        locations:
        ${weapon.locations.length
            ? weapon.locations.map((location) => `<a href="location.html?name=${encodeURIComponent(location)}">${location}</a>`).join(", ")
            : "unknown"}
      </p>
      <p>has phosphene: ${weapon.has_phosphene ? "yes" : "no"}</p>
    </div>
  `
}