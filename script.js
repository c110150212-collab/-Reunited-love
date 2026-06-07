// 主要修改區：募資金額、行銷比例、回饋方案與文本互動都集中在這裡。
const SITE_CONFIG = {
  funding: {
    goal: 3200000,
    current: 1850000,
    note: "募資達標後將投入正式前期製作、演員排練、天橋場景美術、前導預告與互動式宣傳活動。"
  },
  budget: {
    total: 3200000,
    marketingRatio: 28,
    items: [
      { label: "拍攝製作", ratio: 42, color: "#7f9f91" },
      { label: "演員與排練", ratio: 14, color: "#d98f8a" },
      { label: "場景美術", ratio: 10, color: "#b9a77d" },
      { label: "後期聲音影像", ratio: 6, color: "#8aa7b5" },
      { label: "電影行銷", ratio: 28, color: "#a95f65" }
    ]
  },
  pledges: [
    {
      title: "雨夜同行",
      amount: 600,
      message: "你支持了一張電影票與一封電子感謝信，像在雨夜為這段重逢留下一盞燈。"
    },
    {
      title: "畫廊收藏",
      amount: 1600,
      message: "你支持了限定電子劇照、插畫桌布與片尾感謝名單，讓予安的畫被更多人看見。"
    },
    {
      title: "天橋首映",
      amount: 3600,
      message: "你支持了首映邀請、主創映後場與互動明信片，把這場重新選擇帶進現場。"
    }
  ],
  interaction: {
    sceneLabel: "雨夜畫廊",
    sceneText: "林予安看見周以辰站在自己的畫前。那幅畫是一座未完成的橋，橋的另一端消失在霧裡。你想替她說哪一句話？",
    choices: [
      {
        line: "「你想太多了。這只是作品。」",
        response: "周以辰沉默了一下，像終於明白自己沒有資格立刻靠近。雨聲替兩個人把空白補滿。",
        affinity: 22
      },
      {
        line: "「如果當年你有問我，也許我們不會走到這裡。」",
        response: "周以辰低下眼，第一次沒有替自己辯解。他說：『我現在才知道，那不是成全，是逃避。』",
        affinity: 46
      },
      {
        line: "「這一次，請你不要替我決定。」",
        response: "他輕輕點頭，把傘往她那邊移了一點。這不是復合的答案，只是重新學會尊重的開始。",
        affinity: 68
      }
    ]
  }
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0
  }).format(value);

function renderFunding() {
  const { goal, current, note } = SITE_CONFIG.funding;
  const percent = Math.min(Math.round((current / goal) * 100), 100);

  document.querySelector("#funding-current").textContent = formatCurrency(current);
  document.querySelector("#funding-goal").textContent = `目標 ${formatCurrency(goal)}`;
  document.querySelector("#funding-percent").textContent = `${percent}%`;
  document.querySelector("#funding-progress").style.width = `${percent}%`;
  document.querySelector("#funding-note").textContent = note;
}

function renderPledges() {
  const wrapper = document.querySelector("#pledge-options");
  const message = document.querySelector("#pledge-message");

  SITE_CONFIG.pledges.forEach((pledge, index) => {
    const button = document.createElement("button");
    button.className = "pledge-option";
    button.type = "button";
    button.innerHTML = `
      <strong>${pledge.title}｜${formatCurrency(pledge.amount)}</strong>
      <span>${pledge.message}</span>
    `;
    button.addEventListener("click", () => {
      document.querySelectorAll(".pledge-option").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      message.textContent = pledge.message;
    });
    wrapper.appendChild(button);

    if (index === 0) {
      button.click();
    }
  });
}

function renderInteraction() {
  const { sceneLabel, sceneText, choices } = SITE_CONFIG.interaction;
  const list = document.querySelector("#choice-list");
  const response = document.querySelector("#character-response");
  const affinityFill = document.querySelector("#affinity-fill");
  const affinityScore = document.querySelector("#affinity-score");

  document.querySelector("#scene-label").textContent = sceneLabel;
  document.querySelector("#scene-text").textContent = sceneText;

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.innerHTML = `
      <strong>${choice.line}</strong>
      <span>選擇這句台詞</span>
    `;
    button.addEventListener("click", () => {
      document.querySelectorAll(".choice-button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      response.textContent = choice.response;
      affinityFill.style.width = `${choice.affinity}%`;
      affinityScore.textContent = choice.affinity;
    });
    list.appendChild(button);
  });
}

function renderBudget() {
  const { total, marketingRatio, items } = SITE_CONFIG.budget;
  const list = document.querySelector("#budget-list");
  const marketingAmount = Math.round((total * marketingRatio) / 100);

  document.querySelector("#marketing-ratio").textContent = `${marketingRatio}%`;
  document.querySelector("#marketing-amount").textContent =
    `行銷預算：${formatCurrency(marketingAmount)}，占總募資目標 ${marketingRatio}%。`;

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "budget-item";
    article.innerHTML = `
      <div class="budget-item-header">
        <span>${item.label}</span>
        <span>${item.ratio}%</span>
      </div>
      <div class="mini-track">
        <div class="mini-fill" style="width: ${item.ratio}%; background: ${item.color};"></div>
      </div>
    `;
    list.appendChild(article);
  });
}

renderFunding();
renderPledges();
renderInteraction();
renderBudget();
