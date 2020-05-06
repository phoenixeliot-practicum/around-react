const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Темплейты
const cardTemplate = document.querySelector('#card-template')
  .content.querySelector('.places__item');

// Врапперы
const placesWrap = document.querySelector('.places__list');
const editFormModalWindow = document.querySelector('.popup_type_edit');
const cardFormModalWindow = document.querySelector('.popup_type_new-card');
const imageModalWindow = document.querySelector('.popup_type_image');
// С submit ребята еще плохо работают.

// Кнопки и прочие дом узлы
const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');
const closeEditFormButton = editFormModalWindow.querySelector('.popup__close');
const closeCardFormButton = cardFormModalWindow.querySelector('.popup__close');
const closeImageModalButton = imageModalWindow.querySelector('.popup__close');
// Студенты не знают про кастомные дата атрибуты
// Студенты не смогут собирать это все в массив и перебрать его.
// Как следствие - не смогут нормальным способом связать кнопки и относящиеся к ним элементы, поэтому собираем
// элементы вручную.

// DOM узлы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Данные форм и элементы форм
const titleInputValue = editFormModalWindow.querySelector('.popup__input_type_name');
const descriptionInputValue = editFormModalWindow.querySelector('.popup__input_type_description');
const cardNameInputValue = cardFormModalWindow.querySelector('.popup__input_type_card-name');
const cardLinkInputValue = cardFormModalWindow.querySelector('.popup__input_type_url');
const imageElement = imageModalWindow.querySelector('.popup__image');
const imageCaption = imageModalWindow.querySelector('.popup__caption');
// решение на минималках. Конечно, студент может корректно обобрать велью инпутов в форме.

const getCardElement = (data) => {
  // Студенты в этом спринте узнают про стрелочные функции
  // И про function expression. Но это альтернатива. Function declaration тоже ок.
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  // Можно лучше: переменная imageElement объявлена выше
  cardImage.style.backgroundImage = `url(${data.link})`; 
  // Нужно исправить: Поиск одного и того же DOM-элемента не должен происходить дважды.
  // Можно лучше: использовать интерполяцию строк из ES6
  cardElement.querySelector('.card__title').textContent = data.name;

  likeButton.addEventListener('click', handleLikeIcon);
  deleteButton.addEventListener('click', handleDeleteCard);
  cardImage.addEventListener('click', () => handlePreviewPicture(data));
  // До вставки в разметку добавляем слушатели событий.
  return cardElement;
};

const toggleModalWindow = (modalWindow) => {
  // Нужно исправить - Функция выполняет только одну задачу
  modalWindow.classList.toggle('popup_is-opened');
};

const formSubmitHandler = (evt) => {
  // Я бы это переименовал в handleProfileFormSubmit. Но в брифе по-другому
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  toggleModalWindow(editFormModalWindow);
};

const handleLikeIcon = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
  // Про evt.target студенты знают.
};

const handleDeleteCard = (evt) => {
  // Студенты не знают про evt.stopPropagation();
  evt.target.closest('.card').remove();
};

const handlePreviewPicture = (data) => {
  imageElement.src = data.link;
  imageElement.alt = `Изображение ${data.name}`;
  // Можно лучше: использовать интерполяцию строк из ES6
  // Сделано исключительно для г-на Семена Муравьева. От студентов этого не требуем.
  imageCaption.textContent = data.name;
  toggleModalWindow(imageModalWindow);
};

const cardFormSubmitHandler = (evt) => {
  // Аналогично кнопке выше.
  evt.preventDefault();
  // Можно лучше - не давать добавлять с пустыми полями карточку. (Не js валидация!)
  renderCard({
    name: cardNameInputValue.value,
    link: cardLinkInputValue.value
  }, placesWrap);
  toggleModalWindow(cardFormModalWindow);
  // Можно лучше - очищать форму после добавления новой карточки
};

const renderCard = (data, wrap) => {
  // Если студент в эту функцию вкладывает .forEach, то это не ок
  // Функция renderCard должна переиспользовать при работе с формой сабмита новой карточки.
  wrap.prepend(getCardElement(data));
  // Препенд по условию задачи. Про это свойство студенты знают.
};
// Альтернативная конструкция:

/*
// Нужно исправить - имена коллекций NodeList — существительные во множественном числе
const cardElements = initialCards.map((data) => getCardElement(data));
placesWrap.prepend(...cardElements);
*/

// Это выглядит изящнее, конечно.
// Про спрэд оператор студенты знают. Но это размазывает роль функции рендера.


// EventListeners
editFormModalWindow.addEventListener('submit', formSubmitHandler);
cardFormModalWindow.addEventListener('submit', cardFormSubmitHandler);

openEditFormButton.addEventListener('click', () => {
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileDescription.textContent;
  toggleModalWindow(editFormModalWindow);
});

closeEditFormButton.addEventListener('click', () => {
  toggleModalWindow(editFormModalWindow);
});

openCardFormButton.addEventListener('click', () => {
  toggleModalWindow(cardFormModalWindow);
});

closeCardFormButton.addEventListener('click', () => {
  toggleModalWindow(cardFormModalWindow);
});

closeImageModalButton.addEventListener('click', () => {
  toggleModalWindow(imageModalWindow);
});

// Render
initialCards.forEach((data) => {
  renderCard(data, placesWrap)
});


/* Саммари:
* По верстке добавлено:
* 1. Две новые модалки, добавлены новые модификаторы для модалок.
* 2. Темплейт карточки, сама разметка карточек была удалена.
* 3. Сверстаны недостающие кнопки, добавлены активные состояния для них.
* 4. Изменены стили попапа и некоторых вложенных элементов, добавлена плавность появления.
* Саммари по верстке:
* Обращайте внимание на БЭМ. Начинают появляться модификаторы, не имеющие проперти,
* но использующиеся в JS. Для них можно не создавать элементы в БЭМ.
* Отмечайте баги по верстке: изображения некорректно отображаются, искажаются.
* Появляется скролл с открытыми попапами на разных разрешениях.
*
* Саммари по JS:
* Студенты не владеют классными навыками по работе с формами. Это у них будет в следующем спринте.
* Я постарался максимально отразить их возможности: все поля вынесены в константы в аппер скоупе.
* Аналогично и с элементами открытия/закрытия элементов. Все элементы вынесены в константы.
* Тут важно обратить внимание студента не на объявление коллекций, а на возможность одной функции
* покрыть потребность открытия/закрытия попапа.
*
* Будьте внимательны к студентам и не требуется от них сверх программы, господа.
* Но как можно лучше иногда советуйте:)
* */
