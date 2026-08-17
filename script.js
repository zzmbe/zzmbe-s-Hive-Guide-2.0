/* zzmbeHive - fixed selection + reset logic */

const AMULETS = [
  "Ant Amulet","King Beetle Amulet","Moon Amulet","Stick Bug Amulet",
  "Silver Star Amulet","Gold Star Amulet","Diamond Star Amulet",
  "Supreme Star Amulet","Shell Amulet","Supreme Shell Amulet",
  "Cog Amulet","Snowflake Amulet"
];

const GEAR = [
  "Basic Boots","Hiking Boots","Beekeeper's Boots","Beekeeper's Mask",
  "Mondo Belt Bag","Porcelain Port-O-Hive","Porcelain Dipper","Honey Mask",
  "Bubble Mask","Fire Mask","Demon Mask","Diamond Mask","Propeller Hat",
  "Rake","Magnet","Vacuum","Pollen Pallet","Porcelain Backpack",
  "Honeycomb Belt","Coconut Canister","Coconut Clogs","Petal Wand","Petal Belt",
  "Comfy Shoulder Pad","Powerful Shoulder Pad","Elite Shoulder Pad",
  "Panda Shoulder Pad","Diamond Shoulder Pad","Blue Shoulder Pad",
  "Red Shoulder Pad","White Shoulder Pad","Bubble Shoulder Pad",
  "Dark Shoulder Pad","Tide Popper","Dark Scythe","Gummyballer"
];

const BEES = [
  "Basic","Bomber","Brave","Bumble","Cool","Hasty","Looker","Rad","Rascal","Stubborn",
  "Bucko","Commander","Demo","Exhausted","Fire","Frosty","Honey","Rage","Riley","Shocked",
  "Bubble","Carpenter","Demon","Diamond","Music","Ninja","Shy","Lion","Baby",
  "Cobalt","Crimson","Gummy","Photon","Tabby","Vicious","Festive","Bear","Digital","Windy",
  "Fuzzy","Precise","Vector","Spicy","Tadpole","Buoyant",
  "Gifted Basic","Gifted Bomber","Gifted Brave","Gifted Bumble","Gifted Cool",
  "Gifted Hasty","Gifted Looker","Gifted Rad","Gifted Rascal","Gifted Stubborn",
  "Gifted Bucko","Gifted Commander","Gifted Demo","Gifted Exhausted","Gifted Fire",
  "Gifted Frosty","Gifted Honey","Gifted Rage","Gifted Riley","Gifted Shocked",
  "Gifted Bubble","Gifted Carpenter","Gifted Demon","Gifted Diamond","Gifted Music",
  "Gifted Ninja","Gifted Shy","Gifted Lion","Gifted Baby","Gifted Cobalt",
  "Gifted Crimson","Gifted Gummy","Gifted Photon","Gifted Tabby","Gifted Vicious",
  "Gifted Festive","Gifted Bear","Gifted Digital","Gifted Windy","Gifted Fuzzy",
  "Gifted Precise","Gifted Vector","Gifted Spicy","Gifted Tadpole","Gifted Buoyant"
];

const selected = {
  amulets: new Set(),
  gear: new Set(),
  bees: new Set()
};

function makeToggle(containerSelector, items, set, className) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = "";

  for (const name of items) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = name;
    button.dataset.value = name;
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => {
      if (set.has(name)) {
        set.delete(name);
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      } else {
        set.add(name);
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
      }
    });

    container.appendChild(button);
  }
}

function renderBees(search = "") {
  const container = document.querySelector("#bees");
  if (!container) return;

  const term = search.trim().toLowerCase();
  container.innerHTML = "";

  for (const name of BEES) {
    if (term && !name.toLowerCase().includes(term)) continue;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "bee";
    button.textContent = name;
    button.dataset.value = name;

    const active = selected.bees.has(name);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));

    button.addEventListener("click", () => {
      if (selected.bees.has(name)) {
        selected.bees.delete(name);
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      } else {
        selected.bees.add(name);
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
      }
    });

    container.appendChild(button);
  }
}

function hasItem(name) {
  return selected.gear.has(name) ||
         selected.bees.has(name) ||
         selected.amulets.has(name);
}

function val(id, fallback = 0) {
  const el = document.getElementById(id);
  if (!el) return fallback;
  const n = Number(el.value);
  return Number.isFinite(n) ? n : fallback;
}

function checked(id) {
  const el = document.getElementById(id);
  return !!el?.checked;
}

function generateGuide() {
  const slots = val("slots", 25);
  const level = val("level", 8);
  const tickets = val("tickets");
  const stingers = val("stingers");
  const tabbyLove = val("tabbyLove");
  const polarPower = val("polar");
  const gifted = val("gifted");

  const guide = [];

  if (slots < 30) {
    guide.push(["Hive slots", "HIGH",
      "Push toward 30 bees before focusing heavily on late-game upgrades."]);
  } else if (slots < 40) {
    guide.push(["Hive slots", "HIGH",
      "Keep working toward 40 bees while saving for major gear milestones."]);
  } else {
    guide.push(["Hive slots", "TIP",
      "Your hive is well developed; prioritize major gear, quests, and hive quality."]);
  }

  if (level < 10) {
    guide.push(["Bee levels", "HIGH",
      `Your average bee level is ${level}. Leveling your hive should be a major focus.`]);
  }

  if (!hasItem("Porcelain Dipper") && slots >= 20) {
    guide.push(["Collector", "HIGH",
      "Work toward the Porcelain Dipper if you do not have it."]);
  }

  if (!hasItem("Honey Mask") && slots >= 20) {
    guide.push(["Mask", "HIGH",
      "Honey Mask is a useful general progression target if you do not have it."]);
  }

  if (hasItem("Porcelain Dipper") && !hasItem("Petal Wand")) {
    guide.push(["Petal progression", "HIGH",
      "Start planning toward your Petal progression."]);
  }

  if (hasItem("Petal Wand") && !hasItem("Coconut Canister")) {
    guide.push(["Coconut gear", "HIGH",
      "Start preparing for Coconut-area progression."]);
  }

  if (!selected.bees.has("Tabby") && !selected.bees.has("Gifted Tabby")) {
    guide.push(["Tabby Bee", "TIP",
      "Tabby Bee is a major long-term event-bee goal."]);
  }

  if (!selected.bees.has("Vicious") && !selected.bees.has("Gifted Vicious") && stingers < 250) {
    guide.push(["Stingers", "TIP",
      `You have ${stingers} stingers. Keep collecting them naturally while progressing.`]);
  }

  if (selected.bees.has("Tabby") && tabbyLove < 1000) {
    guide.push(["Tabby Love", "TIP",
      `Your Tabby Love is ${tabbyLove}. Keep building it through normal progression.`]);
  }

  if (polarPower < 30) {
    guide.push(["Polar Power", "TIP",
      `Your Polar Power is ${polarPower}. Continue Polar Bear progression.`]);
  }

  if (gifted < 10) {
    guide.push(["Gifted bees", "TIP",
      `You entered ${gifted} gifted bees. Gradually expand your gifted collection.`]);
  }

  if (tickets < 500) {
    guide.push(["Tickets", "TIP",
      `You entered ${tickets} tickets. Save tickets for high-value purchases.`]);
  }

  if (!checked("blackBear")) {
    guide.push(["Black Bear", "QUEST",
      "Black Bear's questline is not marked complete."]);
  }

  if (!checked("science")) {
    guide.push(["Scientific Advancement", "QUEST",
      "Scientific Advancement is not marked complete."]);
  }

  guide.push(["Account route", "INFO",
    checked("p2w")
      ? "P2W / Robux purchases are enabled in your profile."
      : "Your profile is marked non-P2W."]);

  const guideEl = document.querySelector("#guide");
  const resultEl = document.querySelector("#result");

  guideEl.innerHTML = guide.map((item, i) =>
    `<div class="guide">
      <h3>${i + 1}. ${item[0]} <span class="tag">${item[1]}</span></h3>
      <p>${item[2]}</p>
    </div>`
  ).join("");

  resultEl.classList.remove("hidden");
  resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearAll() {
  // Clear the actual data model first.
  selected.amulets.clear();
  selected.gear.clear();
  selected.bees.clear();

  // Reset every input explicitly.
  document.querySelector("#slots").value = "25";
  document.querySelector("#level").value = "8";
  document.querySelector("#tickets").value = "";
  document.querySelector("#stingers").value = "";
  document.querySelector("#tabbyLove").value = "";
  document.querySelector("#polar").value = "";
  document.querySelector("#gifted").value = "";
  document.querySelector("#honey").value = "";

  document.querySelector("#p2w").checked = false;
  document.querySelector("#blackBear").checked = false;
  document.querySelector("#science").checked = false;

  document.querySelector("#beeSearch").value = "";

  // Re-render all button groups from the now-empty Sets.
  makeToggle("#amulets", AMULETS, selected.amulets, "chip");
  makeToggle("#gear", GEAR, selected.gear, "chip");
  renderBees("");

  // Hide old generated result.
  document.querySelector("#result").classList.add("hidden");
  document.querySelector("#guide").innerHTML = "";
}

// Initialize after the page has loaded.
document.addEventListener("DOMContentLoaded", () => {
  makeToggle("#amulets", AMULETS, selected.amulets, "chip");
  makeToggle("#gear", GEAR, selected.gear, "chip");
  renderBees();

  document.querySelector("#beeSearch").addEventListener("input", e => {
    renderBees(e.target.value);
  });

  document.querySelector("#generate").addEventListener("click", generateGuide);
  document.querySelector("#clear").addEventListener("click", clearAll);

  document.querySelector("#copy").addEventListener("click", async () => {
    const text =
      "🐝 zzmbeHive GUIDE\n\n" +
      [...document.querySelectorAll(".guide")]
        .map(el => el.innerText)
        .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      const button = document.querySelector("#copy");
      button.textContent = "Copied!";
      setTimeout(() => button.textContent = "Copy Guide", 1200);
    } catch {
      alert("Couldn't copy automatically. Select the guide text and copy it manually.");
    }
  });
});
