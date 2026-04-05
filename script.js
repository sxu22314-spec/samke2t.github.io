/* /cpt208_b4_english/scripts.js */

const questionsByPair = {
  grandparent: [
    "What was a small everyday thing that made you happy when you were my age?",
    "Which family habit would you like to pass down to the next generation?",
    "What place from your childhood do you still remember very clearly?",
    "What is one story about our family that should never be forgotten?"
  ],
  parent: [
    "What kind of support did you need most when you were my age?",
    "What is something we do differently, but both care about for the same reason?",
    "What is one memory from home that still feels important to you?",
    "If we made a family ritual together, what would it look like?"
  ]
};

const appState = {
  pair: 'grandparent',
  trigger: 'Old photos',
  emotion: 'Curious',
  question: 'Waiting for a drawn card…'
};

function $(selector, context = document) {
  return context.querySelector(selector);
}

function $all(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

function setupMenu() {
  const toggle = $('.menu-toggle');
  const nav = $('.site-nav');
  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  $all('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function pickRandomQuestion(pair) {
  const questions = questionsByPair[pair];
  const current = appState.question;
  const available = questions.filter((question) => question !== current);
  const pool = available.length ? available : questions;
  return pool[Math.floor(Math.random() * pool.length)];
}

function updateCapsule() {
  const pairText = appState.pair === 'grandparent' ? 'Grandparent × Child' : 'Parent × Child';
  const pairLabelNode = $('#pair-label');
  const capsulePair = $('#capsule-pair');
  const capsuleQuestion = $('#capsule-question');
  const capsuleTrigger = $('#capsule-trigger');
  const capsuleEmotion = $('#capsule-emotion');
  const microStory = $('#micro-story');

  if (!pairLabelNode || !capsulePair || !capsuleQuestion || !capsuleTrigger || !capsuleEmotion || !microStory) {
    return;
  }

  pairLabelNode.textContent = pairText;
  capsulePair.textContent = pairText;
  capsuleQuestion.textContent = appState.question;
  capsuleTrigger.textContent = appState.trigger;
  capsuleEmotion.textContent = appState.emotion;
  microStory.textContent = `Today’s capsule invites one older family member and one younger family member to start with ${appState.trigger.toLowerCase()}, respond with ${appState.emotion.toLowerCase()}, and record one small story they want to keep together.`;
}

function setupPrototype() {
  const drawButton = $('#draw-question');
  if (!drawButton) {
    return;
  }

  const questionCard = $('#question-card h3');

  $all('[data-pair]').forEach((button) => {
    button.addEventListener('click', () => {
      $all('[data-pair]').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      appState.pair = button.dataset.pair;
      appState.question = 'Waiting for a drawn card…';
      if (questionCard) {
        questionCard.textContent = appState.question;
      }
      updateCapsule();
    });
  });

  drawButton.addEventListener('click', () => {
    appState.question = pickRandomQuestion(appState.pair);
    if (questionCard) {
      questionCard.textContent = appState.question;
    }
    updateCapsule();
  });

  $all('#memory-triggers [data-trigger]').forEach((button) => {
    button.addEventListener('click', () => {
      $all('#memory-triggers [data-trigger]').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      appState.trigger = button.dataset.trigger;
      updateCapsule();
    });
  });

  $all('#emotion-choices [data-emotion]').forEach((button) => {
    button.addEventListener('click', () => {
      $all('#emotion-choices [data-emotion]').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      appState.emotion = button.dataset.emotion;
      updateCapsule();
    });
  });

  updateCapsule();
}

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupPrototype();
});
