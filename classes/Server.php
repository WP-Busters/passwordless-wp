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
    // $server = isset($_SERVER['HTTP_HOST']) && !empty($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : site_url();
    $server = site_url();
    $host = parse_url($server, PHP_URL_HOST);

    $rpEntity = new PublicKeyCredentialRpEntity(
      get_bloginfo('name'),
      $host,
    );

    parent::__construct($rpEntity, $publicKeyCredentialSourceRepository, null);

    if (plwp_is_localhost()) {
      $this->setSecuredRelyingPartyId([$host]);
    }
  }
}
