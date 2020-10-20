import $ from 'jquery';
import './assets/less/attach.less';
import {
  addUserToLast,
  errorHook,
  getBottomBlock,
  handleResponse,
  isSupport,
  serverAction,
  t,
} from './common';

const getRequestParam = (name) => {
  if ((name = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)').exec(location.search)))
    return decodeURIComponent(name[1]);
};

const onAttach = async () => {
  const error = errorHook();

  try {
    const { data, success } = await serverAction('register')();

    handleResponse({ data, success });

    if (success) {
      if (data.user) {
        addUserToLast(data.user);
      }

      if (data.redirect_to) {
        location.href = data.redirect_to;
      } else {
        location.href = getRequestParam('redirect_to') || '/';
      }
    }
  } catch (e) {
    error(e.message);
  }
};

(async () => {
  const isSupported = await isSupport();

  // debug({ isSupported });

  // const $form = $('#attachform');

  if (!isSupported) {
    $('.admin-email__actions-primary').html(
      getBottomBlock({
        image: 'noted',
        text: t.unsuportedText,
      }),
    );
  } else {
    const $btn = $('#attach-btn');
    $btn.click(async (e) => {
      if ($btn.hasClass('disabled')) {
        return;
      }
      $btn.addClass('disabled');

      await onAttach();

      $btn.removeClass('disabled');
    });
  }
})();
