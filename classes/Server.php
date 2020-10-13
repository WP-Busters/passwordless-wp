<?php


namespace PasswordlessWP;


if (!defined('ABSPATH')) {
  die;
}

use Webauthn\PublicKeyCredentialRpEntity;
use Webauthn\Server as WebauthnServer;
use Webauthn\PublicKeyCredentialSourceRepository;

class Server extends WebauthnServer
{

  function __construct(PublicKeyCredentialSourceRepository $publicKeyCredentialSourceRepository)
  {
    $server = isset($_SERVER['HTTP_HOST']) && !empty($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : home_url();
    $urlparts = parse_url($server);

    $rpEntity = new PublicKeyCredentialRpEntity(
      get_bloginfo('name'),
      $urlparts['host'],
    );

    parent::__construct($rpEntity, $publicKeyCredentialSourceRepository, null);
  }
}
