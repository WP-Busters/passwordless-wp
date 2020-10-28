<?php


if (!defined('ABSPATH')) {
  die;
}

use Webauthn\PublicKeyCredentialCreationOptions;
use Webauthn\PublicKeyCredentialSource;
use PasswordlessWP\PublicKeyCredentialSourceRepository;
use Webauthn\AuthenticatorSelectionCriteria;
use PasswordlessWP\Server;
use Webauthn\PublicKeyCredentialRequestOptions;

function plwp_register_options()
{
  plwp_verify_none('register');

  if (!is_user_logged_in()) {
    wp_send_json_error(array(
      'message' => 'Not Logged'
    ));
    exit;
  }

  $user = wp_get_current_user();

  $credentialSourceRepository = new PublicKeyCredentialSourceRepository($user->ID);
  $server = new Server($credentialSourceRepository);

  $userEntity = plwp_create_user_entity($user);

  // $credentialSources = $credentialSourceRepository->findAllForUserEntity($userEntity);
  // $excludeCredentials = array_map(function (PublicKeyCredentialSource $credential) {
  //   return $credential->getPublicKeyCredentialDescriptor();
  // }, $credentialSources);
  /** End of optional part**/

  $authenticatorSelectionCriteria = new AuthenticatorSelectionCriteria(
    AuthenticatorSelectionCriteria::AUTHENTICATOR_ATTACHMENT_PLATFORM,     // Platform authenticator
    true,                                                                  // Resident key required
    AuthenticatorSelectionCriteria::USER_VERIFICATION_REQUIREMENT_REQUIRED // User verification required

  );


  $publicKeyCredentialCreationOptions = $server->generatePublicKeyCredentialCreationOptions(
    $userEntity,                                                                // The user entity
    PublicKeyCredentialCreationOptions::ATTESTATION_CONVEYANCE_PREFERENCE_NONE, // We will see this option later
    [], //$excludeCredentials,                                                         // Excluded authenticators
    //   Set [] if new user,
    $authenticatorSelectionCriteria
  );

  plwp_session_set('register', $publicKeyCredentialCreationOptions);

  wp_send_json_success($publicKeyCredentialCreationOptions);
}

function plwp_register()
{
  plwp_verify_none('register');

  $credentialSourceRepository = new PublicKeyCredentialSourceRepository(get_current_user_id());
  $server = new Server($credentialSourceRepository);

  try {
    $response_body = file_get_contents('php://input');

    $publicKeyCredentialCreationOptions = plwp_session_get('register');

    $publicKeyCredentialSource = $server->loadAndCheckAttestationResponse(
      $response_body,
      $publicKeyCredentialCreationOptions,
      plwp_create_server_request()
    );

    $credentialSourceRepository->saveCredentialSource($publicKeyCredentialSource);


    $userEntity = $publicKeyCredentialCreationOptions->getUser();

    update_option('plwp_has_credentials', true, false);

    if ($userEntity) {
      wp_send_json_success(array(
        'redirect_to' => apply_filters('plwp_register_success_redirect_to', plwp_get_url_attach_touch_success()),
        'user' => plwp_user_entity_to_array($userEntity)
      ));
    }
  } catch (\Throwable $exception) {
    plwp_session_delete();

    wp_send_json_error(array(
      'message' => $exception->getMessage()
    ));
  }
}

function plwp_login()
{
  plwp_verify_none('login');

  try {
    $response_body = file_get_contents('php://input');
    $response = json_decode($response_body);

    $userId = (int) base64_decode($response->response->userHandle);

    if (!$userId) {
      wp_send_json_error(array(
        'message' => 'User handle not found.'
      ));
    }

    $user = get_user_by('ID', $userId);

    if (!$user) {
      wp_send_json_error(array(
        'message' => 'User not found.'
      ));
    }

    $credentialSourceRepository = new PublicKeyCredentialSourceRepository($user->ID);
    $server = new Server($credentialSourceRepository);

    $userEntity = plwp_create_user_entity($user);

    $publicKeyCredentialRequestOptions = plwp_session_get('login');

    $publicKeyCredentialSource = $server->loadAndCheckAssertionResponse(
      $response_body,
      $publicKeyCredentialRequestOptions,
      $userEntity,
      plwp_create_server_request()
    );

    $userId = $publicKeyCredentialSource->getUserHandle();
    $user =  get_user_by('ID', $userId);

    if ($user->ID) {
      wp_set_current_user($userId, $user->user_login);
      wp_set_auth_cookie($user->ID, false, is_ssl());
      do_action('wp_login', $user->user_login, $user);
    }
  } catch (\Throwable $exception) {
    plwp_session_delete();

    wp_send_json_error(array(
      'message' => $exception->getMessage()
    ));
  }

  $redirect_to = apply_filters('login_redirect', admin_url(), '', $user);

  wp_send_json_success(array(
    'redirect_to' => $redirect_to,
    'user' => plwp_user_entity_to_array(plwp_create_user_entity($user))
  ));
}

function plwp_login_options()
{
  plwp_verify_none('login');

  $response_body = json_decode(file_get_contents('php://input'));
  $userId = (int) $response_body->id;

  $allowedCredentials = array();

  $server = new Server(new PublicKeyCredentialSourceRepository(0));

  if ($userId > 0) {
    $user = get_user_by('ID', $userId);

    $credentialSourceRepository = new PublicKeyCredentialSourceRepository($user->ID);
    $server = new Server($credentialSourceRepository);

    $userEntity = plwp_create_user_entity($user);

    // Get the list of authenticators associated to the user
    $credentialSources = $credentialSourceRepository->findAllForUserEntity($userEntity);

    // Convert the Credential Sources into Public Key Credential Descriptors
    $allowedCredentials = array_map(function (PublicKeyCredentialSource $credential) {
      return $credential->getPublicKeyCredentialDescriptor();
    }, $credentialSources);
  }

  $publicKeyCredentialRequestOptions = $server->generatePublicKeyCredentialRequestOptions(
    PublicKeyCredentialRequestOptions::USER_VERIFICATION_REQUIREMENT_REQUIRED,
    $allowedCredentials
  );

  plwp_session_set('login', $publicKeyCredentialRequestOptions);

  wp_send_json_success($publicKeyCredentialRequestOptions);
}

add_action('wp_ajax_plwp_register_options', 'plwp_register_options');
add_action('wp_ajax_nopriv_plwp_login_options', 'plwp_login_options');
add_action('wp_ajax_plwp_login_options', 'plwp_login_options');
add_action('wp_ajax_nopriv_plwp_login', 'plwp_login');
add_action('wp_ajax_plwp_login', 'plwp_login');
add_action('wp_ajax_plwp_register', 'plwp_register');
add_action('wp_login', 'plwp_session_delete');
add_action('wp_logout', 'plwp_session_delete');
