const gearItems = [
  "Vicious Bee","Tabby Bee","Photon Bee","Gummy Bee","Cobalt Bee","Crimson Bee",
  "Porcelain Dipper","Porcelain Port-O-Hive","Honey Mask","Honeycomb Belt",
  "Petal Wand","Petal Belt","Coconut Canister","Coconut Clogs",
  "Diamond Mask","Demon Mask","Bubble Mask","Fire Mask"
];

const beeItems = [
  "Basic","Bomber","Brave","Bumble","Cool","Hasty","Looker","Rad","Rascal","Stubborn",
  "Bucko","Commander","Demo","Exhausted","Fire","Frosty","Honey","Rage","Riley","Shocked",
  "Bubble","Bucko Gifted","Carpenter","Demon","Diamond","Music","Ninja","Shy","Lion",
  "Baby","Cobalt","Crimson","Gummy","Photon","Tabby","Vicious","Festive","Bear","Digital",
  "Fuzzy","Precise","Vector","Spicy","Tadpole","Buoyant","Windy"
];

const gearEl=document.querySelector("#gear"), beesEl=document.querySelector("#bees");
const selectedGear=new Set(), selectedBees=new Set();

gearItems.forEach(x=>{
  const b=document.createElement("button"); b.className="chip"; b.textContent=x;
  b.onclick=()=>{selectedGear.has(x)?selectedGear.delete(x):selectedGear.add(x);b.classList.toggle("active")};
  gearEl.appendChild(b);
});

function renderBees(filter=""){
  beesEl.innerHTML="";
  beeItems.filter(x=>x.toLowerCase().includes(filter.toLowerCase())).forEach(x=>{
    const b=document.createElement("button");b.className="bee";b.textContent=x;
    if(selectedBees.has(x))b.classList.add("active");
    b.onclick=()=>{selectedBees.has(x)?selectedBees.delete(x):selectedBees.add(x);b.classList.toggle("active")};
    beesEl.appendChild(b);
  });
}
renderBees();
document.querySelector("#beeSearch").oninput=e=>renderBees(e.target.value);

function has(x){return selectedGear.has(x)||selectedBees.has(x)}
function generate(){
  const slots=Number(document.querySelector("#slots").value)||25;
  const guide=[];
  if(slots<30) guide.push(["Next hive milestone","Your first priority is expanding your hive toward 30 bees. More hive slots give you room for stronger abilities and more event bees."]);
  else if(slots<40) guide.push(["Next hive milestone","Keep pushing toward 40 bees while saving for your next major gear milestone."]);
  else guide.push(["Hive direction","You're in the later progression range. Focus on your major gear upgrades and a coherent hive direction rather than constantly replacing bees."]);

  if(!has("Porcelain Dipper") && slots>=20)
    guide.push(["Gear priority","Work toward the Porcelain Dipper if you don't have it yet. Avoid spending your savings on unnecessary small upgrades."]);
  if(!has("Honey Mask") && slots>=20)
    guide.push(["Gear priority","The Honey Mask is a useful progression target if you don't already have it."]);
  if(has("Porcelain Dipper") && !has("Petal Wand"))
    guide.push(["Major milestone","With the Porcelain Dipper done, start planning around your next major progression goals, including Petal-related upgrades."]);
  if(has("Petal Wand") && !has("Coconut Canister"))
    guide.push(["Late progression","Start working toward Coconut-area upgrades and the materials needed for them."]);
  if(!has("Tabby Bee")) guide.push(["Event bee","Tabby Bee is an important long-term event-bee goal. Plan for it when you have access to the required resources."]);
  if(!has("Vicious Bee")) guide.push(["Event bee","Vicious Bee is a strong long-term target. Work toward it naturally rather than rushing it at the expense of core progression."]);

  const red=selectedBees.has("Spicy")||selectedBees.has("Riley");
  const blue=selectedBees.has("Tadpole")||selectedBees.has("Bucko");
  if(red&&blue) guide.push(["Hive balance","You have signs of both red and blue specialization. For now, keep useful bees and avoid forcing a full color hive until your progression supports it."]);
  else if(red) guide.push(["Hive direction","You have some red-oriented bees. Keep your useful support bees and consider a red direction later when your gear and hive are ready."]);
  else if(blue) guide.push(["Hive direction","You have some blue-oriented bees. Keep useful support bees and consider a blue direction later when your gear and hive are ready."]);
  else guide.push(["Hive advice","Keep your hive flexible while progressing. Prioritize gifted/event/support bees and don't chase a specialized hive too early."]);

  guide.push(["Farming","Use boosts strategically: stack field boosts, ability tokens, and matching pollen bonuses when you're ready for a serious honey-making session."]);
  guide.push(["Important","This is a rule-based starter guide. As the site grows, more detailed bee counts, amulets, quest progress, and exact inventory checks can be added."]);

  const out=document.querySelector("#guide");
  out.innerHTML=guide.map((g,i)=>`<div class="guide-block"><h3>${i+1}. ${g[0]} <span class="priority">${i<2?"HIGH":"TIP"}</span></h3><p>${g[1]}</p></div>`).join("");
  document.querySelector("#result").classList.remove("hidden");
  document.querySelector("#result").scrollIntoView({behavior:"smooth",block:"start"});
}
document.querySelector("#generate").onclick=generate;

document.querySelector("#copy").onclick=()=>{
  const text=[...document.querySelectorAll(".guide-block")].map(x=>x.innerText).join("\n\n");
  navigator.clipboard.writeText("🐝 MY BEE SWARM GUIDE\n\n"+text).then(()=>{
    document.querySelector("#copy").textContent="Copied!";
    setTimeout(()=>document.querySelector("#copy").textContent="Copy Guide",1200);
  });
};

document.querySelector("#clear").onclick=()=>{
  selectedGear.clear();selectedBees.clear();
  document.querySelectorAll(".active").forEach(x=>x.classList.remove("active"));
  document.querySelector("#slots").value=25;document.querySelector("#honey").value="";
  document.querySelector("#result").classList.add("hidden");
};
