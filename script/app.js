//
const learnSection = document.getElementById('leran-section');
const faqSection = document.getElementById('faq-section');
const banner = document.getElementById('banner');
const bannerBtn = document.getElementById('get-start');
const inputNmae = document.getElementById('name');
const passworad = document.getElementById('password');
// Assuming your buttons have the class 'button-sp'
const buttons = document.querySelectorAll('.button-sp');

bannerBtn.addEventListener('click', function () {
  if (passworad.value === '123456' && inputNmae.value !== '') {
    banner.style.display = 'none';
    learnSection.style.display = 'block';
    faqSection.style.display = 'block';
    window.alert('Logged in successfull');
  } else {
    window.alert("Password doesn't matching! Please try again later");
  }
});

function lodeAllBtn() {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => {
      displayAllBtn(data.data);
    });
}

function displayAllBtn(display) {
  const VocabulariesBtnContainer = document.getElementById(
    'Vocabularies-btn-container'
  );
  for (let btn of display) {
    const createBtn = document.createElement('button');
    console.log(btn.id);
    createBtn.innerHTML = `
     <button id="btn-${btn.id}" onclick="lodeCategoryCard(${btn.level_no})" class="btn mr-3 hover:bg-blue-700 hover:text-white button-sp focus:bg-blue-700"><img class =""src="./assets/fa-book-open.png" alt="">${btn.lessonName}</button>
    `;
    VocabulariesBtnContainer.append(createBtn);
  }
}
lodeAllBtn();

// lode&display card
function lodeAllCard() {
  fetch('https://openapi.programming-hero.com/api/level/5')
    .then(res => res.json())
    .then(data => displayCard(data.data));
}

function displayCard(displayCard) {
  const cardContiner = document.getElementById('card-continer');
  cardContiner.innerHTML = '';
  if (displayCard.length == 0) {
    cardContiner.innerHTML = `
      <div class="w-10/12 mx-auto bg-[#F8F8F8] p-4 rounded-xl mt-10 col-span-full">

        <div class=" p-6 text-center space-y-5">
          <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <p class="text-4xl font-semibold">নেক্সট Lesson এ যান</p>
        </div>


      </div>
    `;
  }

  for (let card of displayCard) {
    const createDiv = document.createElement('div');

    createDiv.innerHTML = `
    <div class="bg-white p-6 text-center space-y-2 font-bold rounded-xl">
            <h4 class="text-2xl">${card.word}</h4>
            <p>Meaning /Pronounciation</p>
            <p>${card.meaning ?? 'অর্থ পাওয়া যায়নি'} / ${
      card.pronunciation
    }</p>
            <div class="flex justify-around mt-10 text-xl">
              <i onclick="lodeCardDeatils('${
                card.id
              }')" class="p-3 bg-[#1A91FF10] rounded-xl  cursor-pointer fa-solid fa-circle-info"></i>
              <i class="p-3 bg-[#1A91FF10] rounded-xl  cursor-pointer fa-solid fa-volume-high"></i>
            </div>
          </div>
    `;
    cardContiner.append(createDiv);
  }
}

const lodeCardDeatils = videoID => {
  const url = `
  https://openapi.programming-hero.com/api/word/${videoID}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayCardDetils(data.data));
};

const displayCardDetils = cardDtls => {
  document.getElementById('card_detils').showModal();
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = `
   <h2 class="text-2xl font-semibold">${cardDtls.word} (<i class="fa-solid fa-microphone"></i> : ${cardDtls.pronunciation})</h2>
    <p >Meaning</p>
    <span>${cardDtls.meaning}</span>
    <p>Example</p>
    <span class="mb-8">${cardDtls.sentence}</span>
    <div class="mt-8" >
    <p class="">সমার্থক শব্দ গুলো</p>
    <div " id="word-container"> 
     
    </div>
    </div>
  `;
  const getwordBtn = cardDtls.synonyms;
  const wBtnContainer = document.getElementById('word-container');
  for (let Wbtn of getwordBtn) {
    const createWbtn = document.createElement('button');
    createWbtn.innerHTML = `
    <button class="mr-5 btn hover:bg-blue-700 hover:text-white">${Wbtn}</button> 
    `;
    wBtnContainer.append(createWbtn);
  }
};

// lode categoryCard
const lodeCategoryCard = cardID => {
  const url = `https://openapi.programming-hero.com/api/level/${cardID}`;
  const cardContainer = document.getElementById('card-continer');

  // Show loading spinner
  cardContainer.innerHTML = `
  <div class="flex flex-col col-span-3 justify-center items-center w-full">
  <span class="loading loading-spinner loading-md loader"></span>
  </div>
  `;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayCard(data.data);
    });
};

// scroll section
function scrollToFAQ() {
  const faqSection = document.getElementById('faq-section');
  window.scrollTo({
    top: faqSection.offsetTop,
    behavior: 'smooth', // Smooth scroll
  });
}
function scrollToLearn() {
  const faqSection = document.getElementById('leran-section');
  window.scrollTo({
    top: faqSection.offsetTop,
    behavior: 'smooth', // Smooth scroll
  });
}
