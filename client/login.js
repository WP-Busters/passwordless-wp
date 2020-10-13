import $ from 'jquery';
import './assets/less/login.less';
import {
  addUserToLast,
  errorHook,
  getBottomBlock,
  hasCredentials,
  isSSL,
  isSupport,
  serverAction,
  t,
} from './common';

const doLogin = (id = null) => async () => {
  const error = errorHook();

  try {
    const { data, success } = await serverAction('login')({ id });

    if (!success) {
    } else {
      if (data.user) {
        addUserToLast(data.user);
      }
      if (data.redirect_to) {
        location.href = data.redirect_to;
      }
    }
  } catch (e) {
    error(e.message);
  }
};

const doForm = () =>
  $(`
  <div class="wtl-login-form">
    <h1>Passwordless Login</h1>
    
    <div class="wtl-login-form__items"></div>
    <div class="wtl-error"></div>
    <div class="wtl-login-form__desc">${t.loginDesc}</div>
  </div>
`);

const doUserLine = ({ displayName, id }) =>
  $(`
  <div class="wtl-login-form__user">
    <div class="wtl-login-form__user-name">
      ${displayName}
    </div>
    <span class="dashicons dashicons-arrow-right-alt"></span>
  </div>
`).click(doLogin(id));

const showForm = () => {
  const $loginForm = $('#loginform');

  const $form = doForm().hide();
  $loginForm.before($form);

  const wtl = JSON.parse(localStorage.getItem('wtl')) || {};
  wtl.users = wtl.users || {};

  const $items = $('.wtl-login-form__items');

  for (const u in wtl.users) {
    const user = wtl.users[u];
    $items.append(doUserLine({ displayName: user.displayName, id: user.id }));
  }

  $items.append(doUserLine({ displayName: t.anotherUser, id: undefined }));

  $form.slideDown('fast');
};

(async () => {
  const isSupported = await isSupport();

  const $loginForm = $('#loginform');

  if (isSupported) {
    if (hasCredentials) {
      showForm();
    }

    $loginForm.addClass('wtl-bottom-block').append(
      getBottomBlock({
        image: 'sentiment',
        text: t.suportedText,
      }),
    );

    $loginForm.append(`<input name="plwp_supported" value="1" type="hidden" />`);
  } else {
    let text = t.useCorrectBrowserOrLogin + '<br/>' + t.unsuportedText;

    if (!isSSL) {
      text = '<strong>' + t.requiredSSL + '</strong><br/><br/>' + text;
    }

    $loginForm.addClass('wtl-bottom-block').append(
      getBottomBlock({
        image: 'noted',
        text,
      }),
    );
  }
})();
