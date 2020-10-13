<?php

use PasswordlessWP\AssetResolver;
use PasswordlessWP\PublicKeyCredentialSourceRepository;

if (!defined('ABSPATH')) {
  die;
}

function wpl_login_enqueue_scripts()
{
  global $action;

  //$is_debug = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG;

  $t = array(
    'tokenAdded' => __('Your token was registered, now you can use it to login.', 'passwordless-wp'),
    'loginDesc' => __("Use Face ID or Touch ID to login in your account.", 'passwordless-wp'),
    'requiredSSL' => __("HTTPS and SSL are required.", 'passwordless-wp'),
    'anotherUser' => __("Choose user", 'passwordless-wp'),
    'suportedText' => __("Attach your Face ID or Touch ID credentials on the next step for fast authentication.", 'passwordless-wp'),
    'useCorrectBrowserOrLogin' => __("<strong>Try supported browser or use your Username and Password to log in.</strong>", 'passwordless-wp'),
    'unsuportedText' => __("Your browser does not support passwordless authentication using Touch or Face IDs or your system does not have device.", 'passwordless-wp'),
  );


  if ($action === 'login') {
    AssetResolver::resolveAll(WTL_SLUG, 'login', true, array(
      'WP_TOUCH_LOGIN' => array(
        'nonce' => wp_create_nonce('plwp_login'),
        'isSSL' => is_ssl(),
        'hasCredentials' => get_option('wpl_has_credentials', false),
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'pluginUrl' => WTL_URL,
        't' => $t
      )
    ));
  } else if ($action === 'attach_touch') {
    AssetResolver::resolveAll(WTL_SLUG, 'attach', true, array(
      'WP_TOUCH_LOGIN' => array(
        'nonce' => wp_create_nonce('plwp_register'),
        'isSSL' => is_ssl(),
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'pluginUrl' => WTL_URL,
        't' => $t
      )
    ));
  }
}

function wpl_login_form_login()
{
  if (isset($_REQUEST['plwp_supported']) && !empty($_REQUEST['plwp_supported'])) {
    add_filter('login_redirect', 'wpl_login_form_login_redirect', 1000, 3);
  }
}

function wpl_get_url_attach_touch()
{
  $url = wp_login_url();
  $url = add_query_arg('action', 'attach_touch', $url);
  return $url;
}

function wpl_login_form_login_redirect($redirect_to, $requested_redirect_to, $user)
{
  if (!$user || is_wp_error($user) || !is_ssl()) {
    return $redirect_to;
  }

  if ($user) {
    $credentialSourceRepository = new PublicKeyCredentialSourceRepository($user->ID);
    if ($credentialSourceRepository->hasCredentials()) {
      return $redirect_to;
    }
  }

  $url = wpl_get_url_attach_touch();
  $url = add_query_arg('redirect_to', $redirect_to, $url);
  return  $url;
}

function wpl_wp_login_errors($errors, $redirect_to)
{
  if (isset($_REQUEST['plwp_redirected'])) {
    $reason = $_REQUEST['plwp_redirected'];

    if ($reason == 'not_logged') {
      $errors->add('loggedout', __('Please log in to attach your passwordless credentials.', 'passwordless-wp'), 'message');
    } else if ($reason == 'no_ssl') {
      $errors->add('loggedout', __('PasswordlessWP supports only HTTPS.', 'passwordless-wp'), 'message');
    }
  }

  return $errors;
}

function wpl_login_form_attach_touch()
{
  $error = false;

  if (!is_user_logged_in()) {
    $error = 'not_logged';
  } elseif (!is_ssl()) {
    $error = 'no_ssl';
  }

  if ($error !== false) {
    $url = wp_login_url();
    $url = add_query_arg('plwp_redirected', $error, $url);
    $url = add_query_arg('redirect_url', wpl_get_url_attach_touch(), $url);
    wp_safe_redirect($url);
    exit;
  }

  login_header(__('Attaching your Passwordless credentials', 'passwordless-wp'));

  $redirect_to = isset($_REQUEST['redirect_to']) ? $_REQUEST['redirect_to'] : admin_url('profile.php');

  $current_user = wp_get_current_user();
?>
  <form id="attachform" class="admin-attach" onSubmit="return false;">
    <h1 class="admin-email__heading"><?php _e("Passwordless credentials adding", 'passwordless-wp'); ?></h1>
    <div class="admin-attach__body">
      <div class="admin-attach__body-left">
        <p class="admin-email__details">
          <?php _e("Generate token for passwordless login, touch your fingerprint device or use you camera if your device use that method.", 'passwordless-wp'); ?> <a href="javascript: void(0)" rel="noopener noreferrer" target="_blank"><?php _e("Which devices are supported?", 'passwordless-wp'); ?></a> </p>
        <p class="admin-email__details">
          <?php _e("Username:", 'passwordless-wp'); ?> <strong><?php esc_html_e($current_user->user_login); ?></strong> </p>

        <div class="admin-email__actions">
          <div class="wtl-error"></div>

          <div class="admin-email__actions-primary">
            <a id="attach-btn" class="button button-primary button-large" style="margin: 0;"><?php _e("Register Token", 'passwordless-wp'); ?></a>
          </div>
          <div class="admin-email__actions-secondary" style="margin-top: 20px;">
            <a href="<?php esc_attr_e($redirect_to); ?>" rel="noopener noreferrer"><?php _e("Skip", 'passwordless-wp'); ?></a>
          </div>
        </div>
      </div>
      <div class="admin-attach__body-image">
      </div>
    </div>
  </form>
<?php

  login_footer();
  exit;
}

add_action('login_enqueue_scripts', 'wpl_login_enqueue_scripts', 10);
add_action('login_form_login', 'wpl_login_form_login');
add_filter('wp_login_errors', 'wpl_wp_login_errors', 100, 2);

add_action('login_form_attach_touch', 'wpl_login_form_attach_touch');
