const amulets = [
  "Ant Amulet",
  "King Beetle Amulet",
  "Moon Amulet",
  "Stick Bug Amulet",
  "Silver Star Amulet",
  "Gold Star Amulet",
  "Diamond Star Amulet",
  "Supreme Star Amulet",
  "Shell Amulet",
  "Supreme Shell Amulet",
  "Cog Amulet",
  "Snowflake Amulet"
];

const gear = [
  "Basic Boots",
  "Hiking Boots",
  "Beekeeper's Boots",
  "Beekeeper's Mask",
  "Mondo Belt Bag",
  "Porcelain Port-O-Hive",
  "Porcelain Dipper",
  "Honey Mask",
  "Bubble Mask",
  "Fire Mask",
  "Demon Mask",
  "Diamond Mask",
  "Propeller Hat",
  "Rake",
  "Magnet",
  "Vacuum",
  "Pollen Pallet",
  "Porcelain Backpack",
  "Honeycomb Belt",
  "Coconut Canister",
  "Coconut Clogs",
  "Petal Wand",
  "Petal Belt",
  "Comfy Shoulder Pad",
  "Powerful Shoulder Pad",
  "Elite Shoulder Pad",
  "Panda Shoulder Pad",
  "Diamond Shoulder Pad",
  "Blue Shoulder Pad",
  "Red Shoulder Pad",
  "White Shoulder Pad",
  "Bubble Shoulder Pad",
  "Dark Shoulder Pad",
  "Tide Popper",
  "Dark Scythe",
  "Gummyballer"
];

const bees = [
  "Basic","Bomber","Brave","Bumble","Cool","Hasty","Looker","Rad",
  "Rascal","Stubborn","Bucko","Commander","Demo","Exhausted","Fire",
  "Frosty","Honey","Rage","Riley","Shocked","Bubble","Carpenter",
  "Demon","Diamond","Music","Ninja","Shy","Lion","Baby","Cobalt",
  "Crimson","Gummy","Photon","Tabby","Vicious","Festive","Bear",
  "Digital","Windy","Fuzzy","Precise","Vector","Spicy","Tadpole",
  "Buoyant",

  "Gifted Basic","Gifted Bomber","Gifted Brave","Gifted Bumble",
  "Gifted Cool","Gifted Hasty","Gifted Looker","Gifted Rad",
  "Gifted Rascal","Gifted Stubborn","Gifted Bucko","Gifted Commander",
  "Gifted Demo","Gifted Exhausted","Gifted Fire","Gifted Frosty",
  "Gifted Honey","Gifted Rage","Gifted Riley","Gifted Shocked",
  "Gifted Bubble","Gifted Carpenter","Gifted Demon","Gifted Diamond",
  "Gifted Music","Gifted Ninja","Gifted Shy","Gifted Lion",
  "Gifted Baby","Gifted Cobalt","Gifted Crimson","Gifted Gummy",
  "Gifted Photon","Gifted Tabby","Gifted Vicious","Gifted Festive",
  "Gifted Bear","Gifted Digital","Gifted Windy","Gifted Fuzzy",
  "Gifted Precise","Gifted Vector","Gifted Spicy","Gifted Tadpole",
  "Gifted Buoyant"
];

const sel = {
  amulets: new Set(),
  gear: new Set(),
  bees: new Set()
};

function createChip(name, container, set, className = "chip") {
  const button = document.createElement("button");

  button.type = "button";
  button.className = className;
  button.textContent = name;

  button.addEventListener("click", () => {
    if (set.has(name)) {
      set.delete(name);
      button.classList.remove("active");
    } else {
      set.add(name);
      button.classList.add("active");
    }
  });

  container.appendChild(button);
}

function chips(arr, selector, set) {
  const container = document.querySelector(selector);
  container.innerHTML = "";

  arr.forEach(name => {
    createChip(name, container, set);
  });
}

function renderBeeButtons(filter = "") {
  const container = document.querySelector("#bees");

  container.innerHTML = "";

  const filtered = bees.filter(name =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(name => {
    createChip(name, container, sel.bees, "bee");

    const button = container.lastElementChild;

    if (sel.bees.has(name)) {
      button.classList.add("active");
    }
  });
}

function initializeButtons() {
  chips(amulets, "#amulets", sel.amulets);
  chips(gear, "#gear", sel.gear);
  renderBeeButtons();
}

function clearSelections() {
  // Clear all selected data
  sel.amulets.clear();
  sel.gear.clear();
  sel.bees.clear();

  // Clear visual active states
  document.querySelectorAll(".active").forEach(button => {
    button.classList.remove("active");
  });

  // Reset text/number inputs
  document.querySelector("#tickets").value = "";
  document.querySelector("#stingers").value = "";
  document.querySelector("#tabbyLove").value = "";
  document.querySelector("#polar").value = "";
  document.querySelector("#gifted").value = "";
  document.querySelector("#honey").value = "";

  // Reset default values
  document.querySelector("#slots").value = 25;
  document.querySelector("#level").value = 8;

  // Reset checkboxes
  document.querySelector("#p2w").checked = false;
  document.querySelector("#blackBear").checked = false;
  document.querySelector("#science").checked = false;

  // Clear bee search
  document.querySelector("#beeSearch").value = "";

  // Rebuild buttons completely
  chips(amulets, "#amulets", sel.amulets);
  chips(gear, "#gear", sel.gear);
  renderBeeButtons("");

  // Hide generated result
  document.querySelector("#result").classList.add("hidden");

  // Reset copy button
  document.querySelector("#copy").textContent = "Copy Guide";
}

const has = name =>
  sel.gear.has(name) ||
  sel.bees.has(name) ||
  sel.amulets.has(name);

const slotsEl = document.querySelector("#slots");

document.querySelector("#beeSearch").addEventListener("input", event => {
  renderBeeButtons(event.target.value);
});

document.querySelector("#clear").addEventListener("click", clearSelections);

document.querySelector("#generate").addEventListener("click", () => {
  const slots = Number(slotsEl.value) || 25;
  const level = Number(document.querySelector("#level").value) || 1;
  const tickets = Number(document.querySelector("#tickets").value) || 0;
  const stingers = Number(document.querySelector("#stingers").value) || 0;
  const tabby = Number(document.querySelector("#tabbyLove").value) || 0;
  const polar = Number(document.querySelector("#polar").value) || 0;
  const gifted = Number(document.querySelector("#gifted").value) || 0;

  const guide = [];

  if (slots < 30) {
    guide.push([
      "Hive slots",
      "HIGH",
      "Push toward 30 bees before focusing heavily on late-game upgrades."
    ]);
  } else if (slots < 40) {
    guide.push([
      "Hive slots",
      "HIGH",
      "Keep working toward 40 bees while saving for your next major gear milestone."
    ]);
  } else {
    guide.push([
      "Hive slots",
      "TIP",
      "Your hive is well developed; prioritize major gear, quests and hive quality."
    ]);
  }

  if (level < 10) {
    guide.push([
      "Bee levels",
      "HIGH",
      `Your average level is ${level}. Leveling your hive should be a major focus.`
    ]);
  }

  if (!has("Porcelain Dipper") && slots >= 20) {
    guide.push([
      "Collector",
      "HIGH",
      "Work toward the Porcelain Dipper if you do not have it."
    ]);
  }

  if (!has("Honey Mask") && slots >= 20) {
    guide.push([
      "Mask",
      "HIGH",
      "Honey Mask is a useful general progression target if you do not have it."
    ]);
  }

  if (has("Porcelain Dipper") && !has("Petal Wand")) {
    guide.push([
      "Petal progression",
      "HIGH",
      "Start planning toward your Petal progression."
    ]);
  }

  if (has("Petal Wand") && !has("Coconut Canister")) {
    guide.push([
      "Coconut gear",
      "HIGH",
      "Start preparing for Coconut-area progression."
    ]);
  }

  if (
    !sel.bees.has("Tabby") &&
    !sel.bees.has("Gifted Tabby")
  ) {
    guide.push([
      "Tabby Bee",
      "TIP",
      "Tabby Bee is a major long-term event-bee goal."
    ]);
  }

  if (!sel.bees.has("Vicious") && stingers < 250) {
    guide.push([
      "Stingers",
      "TIP",
      `You have ${stingers} stingers. Keep collecting them naturally while progressing.`
    ]);
  }

  if (sel.bees.has("Tabby") && tabby < 1000) {
    guide.push([
      "Tabby Love",
      "TIP",
      `Your Tabby Love is ${tabby}. Keep building it through normal progression.`
    ]);
  }

  if (polar < 30) {
    guide.push([
      "Polar Power",
      "TIP",
      `Your Polar Power is ${polar}. Continue Polar Bear progression.`
    ]);
  }

  if (gifted < 10) {
    guide.push([
      "Gifted bees",
      "TIP",
      `You entered ${gifted} gifted bees. Gradually expand your gifted collection.`
    ]);
  }

  if (tickets < 500) {
    guide.push([
      "Tickets",
      "TIP",
      `You entered ${tickets} tickets. Save tickets for high-value purchases.`
    ]);
  }

  if (!document.querySelector("#blackBear").checked) {
    guide.push([
      "Black Bear",
      "QUEST",
      "Black Bear's questline is not marked complete."
    ]);
  }

  if (!document.querySelector("#science").checked) {
    guide.push([
      "Scientific Advancement",
      "QUEST",
      "Scientific Advancement is not marked complete."
    ]);
  }

  guide.push([
    "Account route",
    "INFO",
    document.querySelector("#p2w").checked
      ? "P2W is enabled in your profile."
      : "Your profile is marked non-P2W."
  ]);

  document.querySelector("#guide").innerHTML = guide
    .map(
      (item, index) => `
        <div class="guide">
          <h3>
            ${index + 1}. ${item[0]}
            <span class="tag">${item[1]}</span>
          </h3>
          <p>${item[2]}</p>
        </div>
      `
    )
    .join("");

  document.querySelector("#result").classList.remove("hidden");
  document.querySelector("#result").scrollIntoView({
    behavior: "smooth"
  });
});

document.querySelector("#copy").addEventListener("click", async () => {
  const text =
    "🐝 zzmbeHive GUIDE\n\n" +
    [...document.querySelectorAll(".guide")]
      .map(element => element.innerText)
      .join("\n\n");

  await navigator.clipboard.writeText(text);

  document.querySelector("#copy").textContent = "Copied!";
});

// Initial setup
initializeButtons();
