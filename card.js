const sampleData = {
  skills: [
    { title: "Stack Overflow Sorcery", text: "Finds answers before the question is even asked." },
    { title: "Merge Ninja", text: "Merges 6 pull requests before their first coffee." },
    { title: "Dark Mode Mastery", text: "Only codes after sunset. Moon-powered productivity." },
    { title: "Docker Whisperer", text: "Can containerize emotions." },
    { title: "Gradle Guru", text: "Knows why the build takes 7 minutes… just won’t tell." },
    { title: "Regex Tamer", text: "Crafts regexes that only aliens understand." },
    { title: "Jira Magician", text: "Closes tickets with no actual work done. It’s art." },
    { title: "Git Rebase Whisperer", text: "Somehow keeps a clean history. At what cost?" },
    { title: "Android Emulator Summoner", text: "Boots emulator in under 2 minutes. It's dark magic." },
    { title: "Silent Keyboard Smasher", text: "Types furiously. Solves everything. Nobody hears them." }
  ],
  commits: [
    { name: "Fix Critical Bug", impact: "🔥🔥🔥", text: "Fixed it. No idea how. Don't ask." },
    { name: "Refactor Everything", impact: "🤯", text: "327 files changed. It works. Maybe." },
    { name: "Add Dark Mode", impact: "🌓", text: "Looks better than it works. But it's dark." },
    { name: "Typo in README", impact: "💤", text: "Four commits, two approvals. Totally worth it." },
    { name: "Improve Performance", impact: "🚀", text: "App now loads before you even tap." },
    { name: "Add Comments", impact: "📚", text: "Now with 3% more sarcasm in code." },
    { name: "Remove Dead Code", impact: "🧹", text: "Nobody knows how it got there in the first place." },
    { name: "Disable Linter", impact: "😈", text: "Was the only way forward." },
    { name: "Hotfix Friday 5PM", impact: "🕔🔥", text: "May the dev gods forgive us." },
    { name: "One-Line Change", impact: "💣", text: "Why did everything break?" }
  ],
  blockers: [
    "Meetings ×2",
    "Legacy Code ×3",
    "VPN Issues ×∞",
    "Merge Conflicts ×1M",
    "Coffee Machine Downtime ×2",
    "Slack Notifications ×999+",
    "Weird QA Feedback ×3",
    "Unclear Requirements ×2",
    "Outdated Documentation ×5",
    "App Crash on Fridays ×2"
  ],
  retreats: [
    "Standup Escape Route",
    "Slack Status: Do Not Disturb",
    "Random Sick Day",
    "Lost in Jira",
    "Lunch Break (Extended)",
    "Switched to Another Branch",
    "Team Sync (Optional)",
    "Stepped Out for Coffee",
    "Mic Muted 'By Mistake'",
    "On PTO (Pretending To Organize)"
  ]
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createPokemonCard({ name, image }) {
  const tpl = document.getElementById('pokemon-card-template');
  const clone = tpl.content.cloneNode(true);
  clone.querySelector('.name').textContent = name;
  clone.querySelector('.hp').textContent = `${Math.floor(Math.random() * 101) + 50} HP`;
  clone.querySelector('.image img').src = image;
  const skill = getRandom(sampleData.skills);
  const commit = getRandom(sampleData.commits);
  clone.querySelector('.power').innerHTML = `<strong>${skill.title}</strong><br>${skill.text}`;
  clone.querySelector('.attack').innerHTML = `<strong>${commit.name} – ${commit.impact}</strong><br>${commit.text}`;
  clone.querySelector('.weakness').textContent = `Blocker: ${getRandom(sampleData.blockers)}`;
  clone.querySelector('.retreat').textContent = `Escape: ${getRandom(sampleData.retreats)}`;
  return clone.querySelector('.card');
}
