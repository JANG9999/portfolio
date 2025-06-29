let leftItems = document.querySelectorAll('.left-select li');
let rightItems = document.querySelectorAll('.right-select li');
let cards = document.querySelectorAll('.card');
let noResult = document.querySelector('.none'); // 검색결과 없을 때 쓸요소(없으면 생략 가능)
let selectedLeft = null; //왼쪽 메뉴와 오른쪽 메뉴를 저장할 변수
let selectedRight = null;
function filterCards() {
  let visibleCount = 0; //몇개의 카드를 보여졌는지 세는 변수
  cards.forEach(card => {
    let cardCategories = card.dataset.category.split(' ');
    let hasLeft = selectedLeft ? cardCategories.includes(selectedLeft) :true;
    let hasRight = selectedRight ? cardCategories.includes(selectedRight): true;
    if (hasLeft && hasRight) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  if (noResult) {
    noResult.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}
leftItems[0].classList.add('active');
leftItems.forEach(item => {
  item.addEventListener('click', () => {
    selectedLeft = item.dataset.category;
    leftItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    filterCards();
  });
});
rightItems[0].classList.add('active');
rightItems.forEach(item => {
  item.addEventListener('click', () => {
    selectedRight = item.dataset.category;
    rightItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    filterCards();
  });
});

/* modal */
let bg = document.querySelector('.modal-bg');
bg.style.height = document.documentElement.offsetHeight + 'px';

let open = document.querySelector('.view-more');
let close = document.querySelector('.close');
let modalAbout = document.querySelector('.about-modal')
close.addEventListener('click', function(){
  modalAbout.style.display = 'none';
  bg.style.display = 'none';
})
open.addEventListener('click', function(){
  modalAbout.style.display = 'block';
  bg.style.display = 'block';
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})

/* info-modal */
let projectInfo = document.querySelectorAll('.project-info');
let infoView = document.querySelectorAll('.info-view');

infoView.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    let modalID = btn.dataset.modal;
    let targetModal = document.getElementById(modalID);
    if(targetModal){
      targetModal.style.display = 'block';
      bg.style.display = 'block';
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

let modalClose = document.querySelectorAll('.info-close');
modalClose.forEach(btn => {
  btn.addEventListener('click', () => {
    let modal = btn.closest('.project-info');
    if (modal) {
      modal.style.display = 'none'; // 모달 숨기기
      bg.style.display = 'none';
    }
  });
});

let more = document.querySelectorAll('.more');
let hoverContent = document.querySelectorAll('.hover-content');

function setupMobileHover() {
  // 현재 뷰포트가 768px 이하인지 확인
  if (window.innerWidth <= 400) {
    more.forEach(function (m, idx) {
      m.addEventListener('click', function (e) {
        e.stopPropagation();
        hoverContent[idx].style.display = 'block';
      });
    });

    document.addEventListener('click', () => {
      hoverContent.forEach(hc => hc.style.display = 'none');
    });
  }
}

setupMobileHover();