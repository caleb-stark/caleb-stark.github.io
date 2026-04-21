const phosphenes = document.getElementById("phosphene");

let weapons = [];

fetch("weapons.json")
  .then((res) => res.json())
  .then((data) => {
    weapons = data;
    renderWeapons();
  });

function renderWeapons() {
  const container = document.getElementById("phosphene-list");

  container.innerHTML = weapons
    .filter((w) => w.has_phosphene)
    .map((w) => {
      return `
          <div class="card">
            <h4>${w.name}</h4>
            <p>${w.manufacturer} · ${w.weapon_type}</p>
            <p>source: ${w.sources.join(", ") || "unknown"}</p>
            <p>location: ${w.locations.join(", ") || "unknown"}</p>
  
            <div class="checkbox">
              <input type="checkbox" data-id="${w.id}" ${w.completed ? "checked" : ""}>
              <label>completed</label>
            </div>
          </div>
        `;
    })
    .join("");
}

document.querySelectorAll("input[type='checkbox']").forEach((cb) => {
  cb.addEventListener("change", (e) => {
    const id = Number(e.target.dataset.id);
    const value = e.target.checked;

    const weapon = weapons.find((w) => w.id === id);
    if (weapon) {
      weapon.completed = value;
      localStorage.setItem("progress", JSON.stringify(weapons));
    }
  });
});
