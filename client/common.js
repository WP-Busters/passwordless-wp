import $ from 'jquery';
import { preparePublicKeyCredentials, preparePublicKeyOptions } from './webauthn';

const { t, ajaxUrl, pluginUrl, hasCredentials, nonce, isSSL } = window.WP_TOUCH_LOGIN || {};

if (process.env.NODE_ENV === 'production') {
  __webpack_public_path__ = `${pluginUrl}/build/`;
}

export { t, ajaxUrl, hasCredentials, nonce, isSSL };

export const fetchEndpoint = async (action, data) => {
  const result = await $.ajax({
    url: ajaxUrl + `?action=${action}&nonce=${nonce}`,
    method: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json',
    redirect: 'error',
    xhrFields: {
      withCredentials: true,
    },
    crossDomain: false,
  });

  handleResponse(result);

  return result;
};

export const errorHook = () => {
  const $error = $('.wtl-error');

  $error.slideUp();

  return (message, error) => {
    if (error?.name === 'NotAllowedError') {
      message = t.errorNoCreds + '<br/><br/>' + message;
    }
    $error.html(message).slideDown();
  };
};

export const serverAction = (type) => async (data) => {
  let json = await fetchEndpoint(`plwp_${type}_options`, data);

  const publicKey = preparePublicKeyOptions(json.data);

  let credentials = false;

  if (type === 'register') {
    credentials = await navigator.credentials.create({ publicKey });
  } else if (type === 'login') {
    credentials = await navigator.credentials.get({ publicKey });
  }

  const publicKeyCredential = preparePublicKeyCredentials(credentials);

  json = await fetchEndpoint(`plwp_${type}`, publicKeyCredential);

  return json;
};

export const getBottomBlock = ({ text, image }) =>
  `<div class="wtl-form-bottom">
<div class="wtl-form-bottom-image wtl-form-bottom-image--${image}"></div>
<div class="wtl-form-bottom-text">${text}</div>
</div>`;

export const debug = (v) => {
  console.log(v);
};

export const isSupport = async () =>
  window.PublicKeyCredential !== undefined &&
  navigator.credentials.create !== undefined &&
  typeof navigator.credentials.create === 'function' &&
  (await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable());

export const addUserToLast = (user) => {
  if (user) {
    const wtl = JSON.parse(localStorage.getItem('wtl')) || {};

    wtl.users = wtl.users || {};
    wtl.users[user.name] = user;

    localStorage.setItem('wtl', JSON.stringify(wtl));
  }
};

export const handleResponse = ({ success, data }) => {
  if (!success) {
    if (data.redirect_to) {
      if (data.message) {
        if (confirm(data.message)) {
          location.href = data.redirect_to;
        }
      } else {
        location.href = data.redirect_to;
      }
    }

    throw new Error(data.message || 'Unknown Error');
  }
};
