btnSearch.addEventListener("click", onSearch)

async function onSearch(params) {
  const value = txtSearch.value;
  console.log("Searching: ", value)
  let instances = [];
  if(isYoutube(value)){
    instances = await fetchInvidious();
  }else if(isTwitter(value)){
    instances = await fetchNitter();
  }else if(isReddit(value)){
    instances = await fetchLibreddit();
  }

  const redirect = pick(instances);
  console.log(redirect)

  const url = new URL(value);
  let newUrl = `${redirect}${url.pathname}${url.search}`
  if(!redirect.includes("https")){
    newUrl = "//" + newUrl;
  }
  console.log(newUrl); 
  document.location.href = newUrl;
}

async function fetchInvidious() {
  const response = await fetch('https://api.invidious.io/instances.json');
  const instances = await response.json();
  console.log('yewtube all', instances)

  return instances.map(x => x[0]);
}

async function fetchNitter() {
  const response = await fetch('https://raw.githubusercontent.com/wiki/zedeus/nitter/Instances.md');
  const instancesTxt = await response.text();
  const regex = /(?:(?:\| \[(?:\S+\.)+[a-zA-Z]+\]\((https?:\/{2}(?:\S+\.)+[a-zA-Z]+)\/?\) (?:\((?:\S+ ?\S*)\) )? *\| [^❌]{1,3} +\|(?:(?:\n)|(?: (?:❌)|(?: ✅)|(?: ❓)|(?: \[)))))/g
  const instances = [... instancesTxt.matchAll(regex)]
  console.log('nitter all', instances)
  return instances.map(x => x[1]);
}
async function fetchLibreddit() {
  // const response = await fetch('https://raw.githubusercontent.com/spikecodes/libreddit/master/README.md');
  // const instancesTxt = await response.text();
  // const regex = /\| \[.*\]\(([-a-zA-Z0-9@:%_\+.~#?&//=]{2,}\.[a-z]{2,}\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)\)*\|*[A-Z]{0,}.*\|.*\|/g
  // const instances = [... instancesTxt.matchAll(regex)]
  // console.log('libreddit all', instances)
  // return instances.map(x => x[1]);
  return libredditInstances;
}

function pick(instances) {
  let normalInstances = instances.filter(x => !x.includes('onion'))
  const indx = getRandomInt(normalInstances.length);
  const url = normalInstances[indx];
  return url; 
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function isYoutube(url){
  const targets = [
    /^https?:\/{2}(www\.|music\.|m\.|)youtube\.com(\/.*|$)/,

    /^https?:\/{2}img\.youtube\.com\/vi\/.*\/..*/, // https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
    /^https?:\/{2}(i|s)\.ytimg\.com\/vi\/.*\/..*/,

    /^https?:\/{2}(www\.|music\.|)youtube\.com\/watch\?v\=..*/,

    /^https?:\/{2}youtu\.be\/..*/,

    /^https?:\/{2}(www\.|)(youtube|youtube-nocookie)\.com\/embed\/..*/,
  ]
  return targets.some(rx => rx.test(url));
}

function isTwitter(url){
	const targets = [/^https?:\/{2}(www\.|mobile\.|)twitter\.com/, /^https?:\/{2}(pbs\.|video\.|)twimg\.com/, /^https?:\/{2}platform\.twitter\.com\/embed/, /^https?:\/{2}t\.co/]	
  return targets.some(rx => rx.test(url));
}
function isReddit(url){
  const targets = [/^https?:\/{2}(www\.|old\.|np\.|new\.|amp\.|)reddit\.com/, /^https?:\/{2}(i\.|preview\.)redd\.it/]
  return targets.some(rx => rx.test(url));
}


const libredditInstances = [
  "https://libredd.it",
  "https://libreddit.spike.codes",
  "https://libreddit.kavin.rocks",
  "https://reddit.invak.id",
  "https://lr.riverside.rocks",
  "https://libreddit.strongthany.cc",
  "https://libreddit.privacy.com.de",
  "https://libreddit.domain.glass",
  "https://reddit.artemislena.eu",
  "https://r.nf",
  "https://lr.mint.lgbt",
  "https://reddit.stuehieyr.com",
  "https://libreddit.de",


  // "https://libreddit.drivet.xyz",
  // "https://lr.oversold.host",
  // "https://libreddit.pussthecat.org",
  // "https://libreddit.mutahar.rocks",
  // "https://libreddit.northboot.xyz",
  // "https://leddit.xyz",
  // "https://de.leddit.xyz",
  // "https://lr.cowfee.moe",
  // "https://libreddit.hu",
  // "https://libreddit.totaldarkness.net",
  // "https://libreddit.esmailelbob.xyz",
  // "https://lr.vern.cc",
  // "https://libreddit.nl",
  // "https://lr.stilic.ml",
  // "https://reddi.tk",
  // "https://libreddit.bus-hit.me",
  // "https://libreddit.datatunnel.xyz",
  // "https://libreddit.crewz.me",
  // "https://r.walkx.org",
  // "https://libreddit.kylrth.com",
  // "https://libreddit.yonalee.eu",
  // "https://libreddit.winscloud.net",
  // "https://libreddit.tiekoetter.com",
  // "https://reddit.rtrace.io",
  // "https://libreddit.lunar.icu",
  // "https://libreddit.privacydev.net",
  // "https://libreddit.notyourcomputer.net",
  // "https://r.ahwx.org",
  // "https://bob.fr.to",
  // "https://reddit.beparanoid.de",
  // "https://libreddit.dcs0.hu",
  // "https://reddit.dr460nf1r3.org",
  // "https://rd.jae.su",
  // "https://libreddit.mha.fi",
  // "https://libreddit.foss.wtf",
  // "https://libreddit.encrypted-data.xyz",
  // "https://libreddit.eu.org",
  // "https://l.opnxng.com"
];