<?php

use Nyholm\Psr7\Factory\Psr17Factory;
use Nyholm\Psr7Server\ServerRequestCreator;
use Webauthn\PublicKeyCredentialUserEntity;

if (!defined('ABSPATH')) {
  die;
}


if (!function_exists('plwp_create_server_request')) {

  function plwp_create_server_request()
  {
    $psr17Factory = new Psr17Factory();
    $creator = new ServerRequestCreator(
      $psr17Factory,
      $psr17Factory,
      $psr17Factory,
      $psr17Factory
    );

    $serverRequest = $creator->fromGlobals();

    return $serverRequest;
  }
}
if (!function_exists('plwp_session_id')) {
  function plwp_session_id()
  {
    $uuid = null;
    if (!is_user_logged_in()) {
      if (isset($_COOKIE['plwps']) && !empty($_COOKIE['plwps'])) {
        $uuid = $_COOKIE['plwps'];
      } else {
        $uuid = wp_generate_uuid4();
        setcookie("plwps", $uuid, time() + MINUTE_IN_SECONDS * 5, COOKIEPATH, COOKIE_DOMAIN);
      }
    } else {
      $uuid = get_current_user_id();
    }

    return 'plwp_data_' . $uuid;
  }
}
if (!function_exists('plwp_session_delete')) {
  function plwp_session_delete()
  {
    $uuid = plwp_session_id();
    delete_transient($uuid . '_login');
    delete_transient($uuid . '_register');

    unset($_COOKIE['plwps']);
    setcookie('plwps', '', time() - (15 * 60));
  }
}
if (!function_exists('plwp_session_set')) {
  function plwp_session_set($key, $value)
  {
    set_transient(plwp_session_id() . '_' . $key, base64_encode(serialize($value)), MINUTE_IN_SECONDS * 5);
  }
}

if (!function_exists('plwp_session_get')) {
  function plwp_session_get($key)
  {
    return unserialize(base64_decode(get_transient(plwp_session_id() . '_' . $key)));
  }
}

if (!function_exists('plwp_starts_with')) {
  function plwp_starts_with($haystack, $needle)
  {
    $length = strlen($needle);

    return (substr($haystack, 0, $length) === $needle);
  }
}

if (!function_exists('plwp_ends_with')) {
  function plwp_ends_with($haystack, $needle)
  {
    $length = strlen($needle);
    $start  = $length * -1; // negative

    return (substr($haystack, $start) === $needle);
  }
}

if (!function_exists('plwp_is_localhost')) {
  function plwp_is_localhost()
  {
    return plwp_is_localhost_by_address(site_url());
  }
}
if (!function_exists('plwp_is_localhost_by_address')) {
  function plwp_is_localhost_by_address($url)
  {
    if (
      false !== strpos($url, '127.0.0.1') ||
      false !== strpos($url, 'localhost')
    ) {
      return true;
    }

    return false;
  }
}

if (!function_exists('plwp_cant_work')) {
  function plwp_cant_work()
  {

    if (!is_ssl()) {
      if (plwp_is_localhost()) {
        return false;
      }

      return 'no_ssl';
    }

    return false;
  }
}

if (!function_exists('plwp_verify_none')) {
  function plwp_verify_none($key)
  {
    if (!wp_verify_nonce($_GET['nonce'], 'plwp_' . $key)) {
      wp_send_json_error(array(
        'redirect_to' => wp_login_url(),
        'message' => __("Bad Nonce, page will be reloaded", 'passwordless-wp')
      ));
      exit;
    }
  }
}

if (!function_exists('plwp_user_entity_to_array')) {
  function plwp_user_entity_to_array($userEntity)
  {
    return array(
      'id' => $userEntity->getId(),
      'displayName' => $userEntity->getDisplayName(),
      'name' => $userEntity->getName(),
      'icon' => $userEntity->getIcon()
    );
  }
}
if (!function_exists('plwp_create_user_entity')) {
  function plwp_create_user_entity($user)
  {
    $name = $user->user_firstname ? (ucfirst($user->user_firstname) . ' ' . ucfirst($user->user_lastname)) : ucfirst($user->user_nicename);

    $userEntity = new PublicKeyCredentialUserEntity(
      $user->user_login,
      $user->ID,
      $name
    );

    return $userEntity;
  }
}
