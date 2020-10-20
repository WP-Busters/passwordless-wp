<?php

use PasswordlessWP\PublicKeyCredentialSourceRepository;

if (!defined('ABSPATH')) {
  die;
}
function plwp_table_names()
{
  global $wpdb;

  return (object) array(
    'creds' => $wpdb->prefix . 'passwordlesswp_registered_creds'
  );
}

if (!function_exists('plwp_create_tables')) {
  function plwp_create_tables()
  {
    global $wpdb;

    $charset_collate = $wpdb->get_charset_collate();

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    $tables = plwp_table_names();

    $sql = "CREATE TABLE {$tables->creds} (
         id mediumint(9) NOT NULL AUTO_INCREMENT,
         user_id mediumint(9) NULL,
         cred_id text NULL,
         data longtext NULL,
         create_date datetime DEFAULT NULL,
         last_login_date datetime DEFAULT NULL,
         UNIQUE KEY id (id),
         KEY user_id (user_id)
     ) $charset_collate;";

    dbDelta($sql);
  }
}

if (!function_exists('plwp_drop_data')) {
  function plwp_drop_data()
  {
    global $wpdb;

    $tables = plwp_table_names();

    $wpdb->query("DROP TABLE IF EXISTS {$tables->creds};");

    delete_option('plwp_has_credentials');
    plwp_session_delete();
  }
}

// plwp_create_tables();

function plwp_delete_user_data($user_id)
{
  PublicKeyCredentialSourceRepository::RemoveUserAll($user_id);
}

add_action('deleted_user', 'plwp_delete_user_data', 10, 1);
